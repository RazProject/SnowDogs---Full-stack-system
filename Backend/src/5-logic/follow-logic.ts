import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import FollowModel from "../4-models/follower-model";
import FollowerModel from "../4-models/follower-model";


// Delete exist follower:
async function deleteFollower(vacationId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM followers WHERE vacationId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);

}


// Add new follower: 
async function addFollower(follower: FollowerModel): Promise<void> {

    //Validation:
    const error = follower.validate();
    if (error) throw new ValidationErrorModel(error);

    // Query:
    const sql = `INSERT INTO followers VALUES(?, ?)`;

    await dal.execute(sql, [follower.userId, follower.vacationId]);

}

async function followVacation(follow: FollowModel): Promise<void> {
    //Validation:
    const error = follow.validate();
    if (error) throw new ValidationErrorModel(error);

    const sql = `
        INSERT INTO followers(vacationId, userId)
        VALUES(?, ?)`;   

    await dal.execute(sql, [follow.vacationId, follow.userId]);
    

    }



export default {
    addFollower,
    deleteFollower,
    followVacation
};
