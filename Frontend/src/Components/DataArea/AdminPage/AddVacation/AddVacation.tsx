import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ResortModel from "../../../../Models/ResortModel";
import VacationModel from "../../../../Models/VacationModel";
import notifyService from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./AddVacation.css";


function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [resorts, setResorts] = useState<ResortModel[]>([]);

    useEffect(() => {
        vacationsService.getAllResorts()
            .then(r => setResorts(r))
            .catch(err => alert(err.message));
    }, []);

    async function addVacation(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/list");
        } catch (err) {
            notifyService.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(addVacation)}>
            <h2>Add Vacation</h2>
            <label>Description: </label>
            <input type="text" {...register("description", VacationModel.descriptionValidation)} />
            <span className="Error">{formState.errors.description?.message}</span>

            <label>Resort</label>
            <select defaultValue="" {...register("resortId")} >
                <option disabled value="">Resorts...</option>
                {resorts.map(r =>
                    <option key={r.resortId} value={r.resortId}>
                        {r.resortName}
                    </option>
                )}
            </select>

            <label>Departure Date: </label>
            <input type="date" {...register("departureDate", VacationModel.departureDateValidation)} />
            <span className="Error">{formState.errors.departureDate?.message}</span>

            <label>Arrival Date: </label>
            <input type="date" {...register("arrivalDate", VacationModel.arrivalDateValidation)} />
            <span className="Error">{formState.errors.arrivalDate?.message}</span>

            <label>Price: </label>
            <input type="number" {...register("price", VacationModel.priceValidation)} />
            <span className="Error">{formState.errors.price?.message}</span>

            <label>Image: </label>
            <input type="file" accept="image/*" {...register("image")} />

            <button>Add</button>
        </form>
    );
}

export default AddVacation;
