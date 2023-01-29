import appConfig from "../Utils/Config";
import axios from "axios";
import ContactModel from "../Models/ContactModel";
axios.defaults.headers.common = { 'Authorization': `bearer ${sessionStorage.getItem('token')}` }


class ContactService {


    public async getAllContacts(): Promise<ContactModel[]> {

        const response = await axios.get<ContactModel[]>(appConfig.contactsUrl);
        const contacts = response.data;
        return contacts;
    }


    public async deleteContact(contactId: number): Promise<void> {
        await axios.delete<void>(appConfig.contactsUrl + contactId);
    }

}






const contactService = new ContactService();

export default contactService;