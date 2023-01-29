import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ContactModel from "../../../Models/ContactModel";
import ResortModel from "../../../Models/ResortModel";
import vacationsService from "../../../Services/VacationsService";
import "./InsertContact.css";

function InsertContact(): JSX.Element {

    const navigate = useNavigate();

    const [resorts, setResorts] = useState<ResortModel[]>([]);

    const { register, handleSubmit} = useForm<ContactModel>();
    

    useEffect(() => {
        vacationsService.getAllResorts()
            .then(r => setResorts(r))
            .catch(err => alert(err.message));
    }, []);

    async function send(contact: ContactModel) {
        try {
            await vacationsService.sendContact(contact);
            alert("The request was received!");
            navigate("/Home");
        }
        catch(err: any) {
            alert(err.message);
        }
    }



    return (
        <div className="InsertContact">

            <form onSubmit={handleSubmit(send)}>

                <label>סגנון טיול </label>
                <select defaultValue="" {...register("resortId")} >
                    <option disabled value="">בחר סוג טיול</option>
                    {resorts.map(r =>
                        <option key={r.resortId} value={r.resortId}>
                            {r.resortName}
                        </option>
                    )}
                </select>

                <label>הודעה:</label>
                <textarea {...register("text")} />

                <label>תאריך המראה: </label>
                <input type="date" {...register("departureDate")}required min={new Date().getDate()} />

                <label>תאריך נחיתה: </label>
                <input type="date" {...register("arrivalDate")}required  />

                <label>טלפון: </label>
                <input type="string" {...register("phoneNumber")}required min={9} max={10} />

                <button>שלח</button>

            </form>

        </div>
    );
}


export default InsertContact;


