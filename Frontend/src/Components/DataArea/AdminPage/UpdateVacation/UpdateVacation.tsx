import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ResortModel from "../../../../Models/ResortModel";
import VacationModel from "../../../../Models/VacationModel";
import notifyService from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./UpdateVacation.css";

function UpdateVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    const [resorts, setResorts] = useState<ResortModel[]>([]);

    useEffect(() => {
        vacationsService.getAllResorts()
            .then(r => setResorts(r))
            .catch(err => alert(err.message));
    }, []);




    useEffect(() => {
        const id = +params.id;
        vacationsService.getOneVacation(id)
            .then(vacation => {
                
                setValue("vacationId", vacation.vacationId);
                setValue("resortId", vacation.resortId);
                setValue("description", vacation.description);
                setValue("price", vacation.price);
                setValue("departureDate", vacation.departureDate.split('T')[0]);
                setValue("arrivalDate", vacation.arrivalDate.split('T')[0]);
            })
            .catch(err => alert(err.message));
    }, [params.id, setValue]);

    async function send(vacation: VacationModel) {
        try {

            await vacationsService.updateVacation(vacation);
            notifyService.success("Product has been successfully updated");
            navigate("/list");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    

    return (
        <div className="UpdateVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Update Vacation</h2>


                <label>Description: </label>
                <input type="text" defaultValue={""} {...register("description", VacationModel.descriptionValidation)} required />
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Resort</label>
                <select defaultValue={0} className="resortId" {...register("resortId", VacationModel.resortIdValidation)}  >
                    <option defaultValue={0}>Resorts...</option>
                    {resorts.map(r =>
                        <option key={r.resortId} value={r.resortId}>
                            {r.resortName}
                        </option>
                    )}
                </select>

                <label>תאריך המראה: </label>
                <input type="datetime-date" defaultValue={null}
                    {...register("departureDate", VacationModel.departureDateValidation)}   required />



                <label>תאריך נחיתה: </label>
                <input type="datetime-date" {...register("arrivalDate", VacationModel.arrivalDateValidation)} defaultValue={null} required />
                <span className="Error">{formState.errors.price?.message}</span>


                <label>Price: </label>
                <input type="number" {...register("price", VacationModel.priceValidation)} defaultValue={0} required />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} required />

                <button>Update</button>

            </form>

        </div>
    );
}

export default UpdateVacation;


