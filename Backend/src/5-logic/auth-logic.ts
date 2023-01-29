import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

const crypto = require('crypto');




async function register(user: UserModel): Promise<string> {

    // Validation:
    const error = user.validate();
    if (error) throw new ValidationErrorModel(error);

    // Hash password:
    user.password = cyber.hash(user.password);

    user = await addUser(user);

    // Hash password:
    user.password = undefined;

    // Generate token:
    const token = cyber.getNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validation:
    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);

    const sql = `
            SELECT UserId AS userId, FirstName AS firstName, LastName AS lastName, 
            Username AS username, Role AS role, Password as password FROM users
            WHERE Username = ?;
            `;
    const user = await dal.execute(sql, [credentials.username]);

    // If user not exists: 
    if (!user[0]) throw new UnauthorizedErrorModel("Incorrect username or password");

    // user.password = null;
    user[0].password = undefined;
    // Generate token:
    const token = cyber.getNewToken(user[0]);

    return token;
}

async function addUser(user: UserModel): Promise<UserModel> {

    user.role = RoleModel.User;
    const sql = `
            INSERT INTO users 
            VALUES( DEFAULT, ?, ?, ?, ?, ? )`;

    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.role]);

    user.userId = info.insertId;

    return user;
}

async function getUserByCredentials(credentials: CredentialsModel): Promise<UserModel> {



    const username = credentials.username;
    const password = cyber.hash(credentials.password);
    const sql = `
            SELECT UserId AS userId, FirstName AS firstName, LastName AS lastName, 
            Username AS username, Role AS role FROM users
            WHERE Username = ? && Password = ?;
            `;
    const user = await dal.execute(sql, [username, password]);

    return user;
}

export default {
    register,
    login
}