class ContactModel {
    
    public contactId: number;
    public text: string;
    public departureDate: Date;
    public arrivalDate: Date;
    public resortId: number;
    public resortLocation: string;
    public phoneNumber: string;

    public constructor(message: ContactModel){
        this.text=message.text;
        this.departureDate = message.departureDate;
        this.arrivalDate = message.arrivalDate;
        this.resortId = message.resortId;
        this.resortLocation = message.resortLocation;
        this.phoneNumber = message.phoneNumber;
        this.contactId = message.contactId;
    }

}

export default ContactModel;
