import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";
// import crypto from "crypto";


// Create secret key ==> a string for our REST API
const secretKey = "MakeThingsGoRight";

function getNewToken(user: UserModel): string {

    // Create a container for the user object:
    const container = { user };

    // Create expiration time:
    const options = { expiresIn: "3h" };

    // Generate token:
    const token = jwt.sign(container, secretKey, options);

    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => { // To Promisify

        try {

            // Token format inside a header named authorization: 
            // "Bearer the-token"
            //  01234567

            // Extract header: 
            const header = request.header("authorization");

            // If no such header: 
            if (!header) {
                resolve(false);
                return;
            }

            // Extract token from header: 
            const token = header.substring(7);

            // If there is no token: 
            if (!token) {
                resolve(false);
                return;
            }

            // Verify token:
            jwt.verify(token, secretKey, err => {

                // If token is illegal:
                if (err) {
                    resolve(false);
                    return;
                }

                // Here token must be legal:
                resolve(true);

            });

        }
        catch (err: any) {
            reject(err);
        }

    });
}

async function verifyAdmin(request: Request): Promise<boolean> {

    // First check if user logged in:
    const isLoggedIn = await verifyToken(request);

    // If not logged in:
    if(!isLoggedIn) return false;

    // Extract token: 
    const header = request.header("authorization");
    const token = header.substring(7);

    // Extract container from token:
    const container: any = jwt.decode(token);
    
    // Extract user: 
    const user: UserModel = container.user;

    // Return true if user is admin, otherwise return false:
    return user.role === RoleModel.Admin;
}

const crypto = require('crypto');
const salt = crypto.randomBytes(64).toString('hex');
const iterations = 100000;
const keyLen = 64;
const digest = 'sha512';

function hash(plainText: string): string {
    if(!plainText) return null;

    // Hash the plain text password with the salt
    const hashedText = crypto.pbkdf2Sync(plainText, salt, iterations, keyLen, digest).toString('hex');
    return hashedText;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hash
};
