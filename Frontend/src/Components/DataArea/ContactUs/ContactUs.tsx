import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ContactModel from "../../../Models/ContactModel";
import ResortModel from "../../../Models/ResortModel";
import vacationsService from "../../../Services/VacationsService";
import "./ContactUs.css";

function ContactUs(): JSX.Element {
    
    const navigate = useNavigate();

    const [resorts, setResorts] = useState<ResortModel[]>([]);

    const { register, handleSubmit } = useForm<ContactModel>();
    

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
        <div className="ContactUs">

            <form onSubmit={handleSubmit(send)}>

                <label>Resort:</label>
                <select defaultValue="" {...register("resortId")} >
                    <option disabled value="">⬇️</option>
                    {resorts.map(r =>
                        <option key={r.resortId} value={r.resortId}>
                            {r.resortName}
                        </option>
                    )}
                </select>

                <label>message:</label>
                <textarea {...register("text")} />

                <label>Departure Date: </label>
                <input type="date" {...register("departureDate")}required />

                <label>Arrival Date</label>
                <input type="date" {...register("arrivalDate")}required  />

                <label>Phone number</label>
                <input type="string" {...register("phoneNumber")}required min={9} max={10} />

                <button>שלח</button>

            </form>

        </div>
    );
}


export default ContactUs;


