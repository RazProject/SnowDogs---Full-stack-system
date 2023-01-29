import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import ContactModel from "../4-models/contact-Model";
import ResortModel from "../4-models/resort-model";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";



async function getAllVacations(): Promise<VacationModel[]> {

    const sql = `
    SELECT VacationId AS vacationId,
    Description AS description, 
    ResortId AS resortId, 
    ImageName AS imageName, 
    DepartureDate AS departureDate, 
    ArrivalDate AS arrivalDate, 
    Price AS price
    FROM vacations;
    `;
    const vacations = await dal.execute(sql);
    return vacations;
}

async function getAllResorts(): Promise<ResortModel[]> {

    const sql = `
    SELECT ResortId AS resortId, ResortName AS resortName FROM resorts
    `;
    const resorts = await dal.execute(sql);
    return resorts;
}

async function getAllContacts(): Promise<ResortModel[]> {

    const sql = `
    SELECT  
        contactId,
        text, 
        departureDate, 
        arrivalDate, 
        resortId, 
        phoneNumber
    FROM 
        contacts
`;
    const resorts = await dal.execute(sql);
    return resorts;
}


async function getVacationsByResortId(vacationId: number): Promise<VacationModel[]> {

    const sql = `
    SELECT VacationId AS vacationId,
    Description AS description, 
    vacations.ResortId AS resortId, 
    vacations.ImageName AS imageName, 
    DepartureDate AS departureDate, 
    ArrivalDate AS arrivalDate, 
    Price AS price, 
    resorts.ResortName AS resortName
    FROM vacations INNER JOIN Resorts
    ON vacations.ResortId = resorts.ResortId
    WHERE vacations.ResortId = ?; 
    `;

    const vacations = await dal.execute(sql, [vacationId]);

    return vacations;
}

async function getVacationByVacationId(vacationId: number): Promise<VacationModel> {

    const sql = `
    SELECT VacationId AS vacationId,
    Description AS description, 
    vacations.ResortId AS resortId, 
    vacations.ImageName AS imageName, 
    DepartureDate AS departureDate, 
    ArrivalDate AS arrivalDate, 
    Price AS price, 
    resorts.ResortName AS resortName
    FROM vacations INNER JOIN Resorts
    ON vacations.ResortId = resorts.ResortId
    WHERE vacations.VacationId = ? ; 
    `;

    const vacations = await dal.execute(sql, [vacationId]);
    const vacation = vacations[0];

    return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    if (vacation.image) {

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;

        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }
    const sql = `
    INSERT INTO vacations
    (vacationId, Description, vacations.ResortId, DepartureDate, ArrivalDate, Price, ImageName) 
    VALUES ( DEFAULT, ?, ?, ?, ?, ?, ? )`;

    const info: OkPacket = await dal.execute(sql,[vacation.description, vacation.resortId, vacation.departureDate, vacation.arrivalDate,vacation.price,vacation.imageName]);

    vacation.vacationId = info.insertId;

    return vacation;
}


async function saveContact(contactRequest: ContactModel): Promise<ContactModel> {
    const sql = `
            INSERT INTO contacts 
            VALUES(
                DEFAULT, ?, ?, ?, ?, ?' )`;

    const info: OkPacket = await dal.execute(sql, [contactRequest.text, contactRequest.departureDate, contactRequest.arrivalDate, contactRequest.resortId, contactRequest.phoneNumber]);

    contactRequest.contactId = info.insertId;

    return contactRequest;
}

async function getVacationsForUser(userId: number) {

    const sql = `
    SELECT 
    V.VacationId as vacationId,
    V.Description as description,
    V.ResortId as resortId,
    V.DepartureDate as departureDate,
    V.ArrivalDate as arrivalDate,
    V.Price as price,
    V.ImageName as imageName,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
    COUNT(F.userId) AS followersCount
    FROM vacations AS V 
    LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY DepartureDate DESC 
`

    const vacations = await dal.execute(sql, [userId]);
    return vacations;
}





async function deleteVacation(vacationId: number): Promise<void> {


    const sql = `
                DELETE FROM vacations
                WHERE vacationId = ?
                `;

    await dal.execute(sql, [vacationId]);

}

async function updateVacation(vacation: VacationModel): Promise<void> {

    if (vacation.image) {

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;

        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }


    const sql = `
                    UPDATE vacations 
                    SET vacationId= ?,
                    Description= ?,
                    ResortId= ?,
                    DepartureDate= ?,
                    ArrivalDate= ?,
                    Price= ?,
                    ImageName= ? 
                    WHERE vacationId = ?  
                    `;


    await dal.execute(sql, [vacation.vacationId, vacation.description, vacation.resortId, vacation.departureDate, vacation.arrivalDate, vacation.price, vacation.imageName, vacation.vacationId]);

}

async function deleteContact(contactId: number): Promise<void> {


    const sql = `
                DELETE FROM contacts
                WHERE contactId = ?
                `;

    await dal.execute(sql, [contactId]);

}


export default {
    getAllVacations,
    getVacationsByResortId,
    addVacation,
    getAllResorts,
    saveContact,
    getVacationsForUser,
    getAllContacts,
    deleteVacation,
    updateVacation,
    getVacationByVacationId,
    deleteContact

};
