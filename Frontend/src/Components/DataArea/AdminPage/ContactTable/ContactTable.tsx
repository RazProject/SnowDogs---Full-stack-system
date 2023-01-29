import { useEffect, useState } from "react";
import ContactModel from "../../../../Models/ContactModel";
import ContactsService from "../../../../Services/ContactsService";
import notifyService from "../../../../Services/NotifyService";
import "./ContactTable.css";


function ContactTable(): JSX.Element {

    const [contacts, setContacts] = useState<ContactModel[]>([]);

    useEffect(() => {
        ContactsService.getAllContacts()
            .then(c => setContacts(c))
            .catch(err => alert(err.message));
    }, []);

    async function deleteContact(contactId: number) {
        try {
            const ok = window.confirm("are you sure?");
            if(!ok) return;

            const index = contacts.findIndex(c => c.contactId === contactId);
            contacts.splice(index, 1);
            const duplicatedStores = [...contacts];
            setContacts(duplicatedStores);

            await ContactsService.deleteContact(contactId);
            notifyService.success("Contact has been deleted");
        } catch (err) {
            notifyService.error(err);
        }
    }            

    return (
        <div className="ContactTable">

                       <h2>List of Contact</h2>

<table>
    <thead>
        <tr>
            <th>Text</th>
            <th>Dates</th>
            <th>ContactId</th>
            <th>Phone number</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {contacts.map(c =>
            <tr key={c.contactId}>
                <td>{c.text}</td>
                <td>Departue: {c.departureDate.split('T')[0]}<br/> Arrival: {c.arrivalDate.split('T')[0]}</td>
                <td>Id: {c.contactId}</td>
                <td>{c.phoneNumber}</td>
                <td>
                    <button onClick={() => deleteContact(c.contactId)}>x</button>
                </td>
            </tr>
        )}
    </tbody>
</table>
        </div>
    );
}

export default ContactTable;
