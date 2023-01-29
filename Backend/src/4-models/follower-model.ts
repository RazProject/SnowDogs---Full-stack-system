import Joi from "joi";

class FollowModel {

    public userId: number;
    public vacationId: number;


    public constructor(follow: FollowModel) {
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().required().integer(),
        vacationId: Joi.number().required().integer()
    });

    public validate(): string {
        const result = FollowModel.validationSchema.validate(this);
        return result.error?.message
    }
}

export default FollowModel;
