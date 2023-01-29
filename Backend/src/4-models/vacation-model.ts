import { UploadedFile } from "express-fileupload";

class VacationModel {
    
    public vacationId: number;
    public description: string;
    public resortId: number;
    public departureDate: Date;
    public arrivalDate: Date;
    public price: number;
    public imageName: string;
    public isFollowing: number;
    public followersCount: number;
    public resortName: string;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {

        this.vacationId = vacation.vacationId;
        this.description = vacation.description;
        this.resortId = vacation.resortId;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.departureDate = vacation.departureDate;
        this.arrivalDate = vacation.arrivalDate ;
        this.price = vacation.price ;
        this.isFollowing = vacation.isFollowing;
        this.followersCount = vacation.followersCount;
        this.resortName = vacation.resortName;

    }

    
    public static descriptionValidation = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 2, message: "description too short" },
        maxLength: { value: 300, message: "description too long" }
    }

    // required, min --> 0, max --> 1000
    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" },
        max: { value: 1000, message: "Price can't exceed 1000" }
    }
    
    // // required, min --> 0, max --> 10000
    // public static stockValidation = {
    //     required: { value: true, message: "Missing stock" },
    //     min: { value: 0, message: "Stock can't be negative" },
    //     max: { value: 10000, message: "Stock can't exceed 10000" }
    // }

}


export default VacationModel;
