class VacationModel {

    public vacationId: number;
    public description: string;
    public resortId: number;
    public imageName: string;
    public departureDate: String;
    public arrivalDate: String;
    public price: number;
    public image: FileList;
    public resortName: string;
    public isFollowing: number;
    public followersCount: number;

    public static descriptionValidation = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 3, message: "description too short" },
        maxLength: { value: 100, message: "description too long" }
    }

    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 0, message: "Price can't be negative" },
        max: { value: 10000, message: "Price can't over 10000" }
    }

    public static resortIdValidation = {
        required: { value: true, message: "Missing resortId" },
        min: { value: 0, message: "resortId can't be negative" },
        max: { value: 4, message: "resortId can't over 4" }
    }

    public static departureDateValidation = {
        required: { value: true, message: "Missing departure date" },
    }

    public static arrivalDateValidation = {
        required: { value: true, message: "Missing arrival date" },
    }


}

export default VacationModel;

