import { ChangeEvent, useEffect, useState } from "react";
import ResortModel from "../../../Models/ResortModel";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
// import { vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import "./List.css";

function List(): JSX.Element {

    const [resorts, setResorts] = useState<ResortModel[]>([]);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [user, setUser] = useState<UserModel>();
    const [currentPage, setCurrentPage] = useState(1);
    const [args, setArgs] = useState(5);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vacations.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {

        const user = authStore.getState().user;
        setUser(user);

        vacationsService.getAllResorts()
            .then(r => setResorts(r))
            .catch(err => alert(err.message));

        if(args === 5){
        
        vacationsService.getVacationsByUserId(user.userId)
            .then(vacations => setVacations(vacations.filter(v => v.isFollowing === 1)))
            .catch(err => alert(err.message));
        }
        if(args > 0 && args < 5){
        vacationsService.getVacationsByUserId(user.userId)
            .then(vacations => setVacations(vacations.filter(v => v.resortId === args)))
            .catch(err => alert(err.message));
        }

        // setVacations(vacationsStore.getState().vacations);
        // const unsubscribe = vacationsStore.subscribe(() => {
        //     setVacations(vacationsStore.getState().vacations);
            
        // });

        // return () => unsubscribe();

    }, [args]);

    const reportDeletefunction = async function reportDelete(vacationId: number) {

        try {
            await vacationsService.deleteVacation(vacationId);
            notifyService.success("Vacation has been deleted");
            const index = vacations.findIndex(v => v.vacationId === vacationId);
            let vacationsAfterDelete = [...vacations];
            vacationsAfterDelete.splice(index, 1);
            setVacations(vacationsAfterDelete);
        }
        catch (err: any) {
            notifyService.error(err.message);
        }

    }


    // HTMLSelectElement --> element raising the event
    async function showVacations(args: ChangeEvent<HTMLSelectElement>) {

        setCurrentPage(1);
        const resortIdFromArgs = +args.target.value;
        setArgs(resortIdFromArgs);

        if (resortIdFromArgs > 0 && resortIdFromArgs !== 5) {
            await vacationsService.getVacationsByResortId(resortIdFromArgs)
                .then(vacations => setVacations(vacations))
                .catch(err => alert(err.message));

        }
        if (resortIdFromArgs === 5) {
            await vacationsService.getVacationsByUserId(user.userId)
                .then(vacations => setVacations(vacations.filter(v => v.isFollowing === 1)))
                .catch(err => alert(err.message));
        }

    }

    return (
        <div className="List">

            <h2>Snowdogs vacations ❄❄❄</h2>

            <label> SnowDog Search  </label>
            <select onChange={showVacations} className={"form-control"}>
                <option disabled >Snow Dogs Vacations ⬇️</option>
                {resorts.map(r =>
                    <option key={"resort" + r.resortId} value={r.resortId}>
                        {r.resortName}
                    </option>
                )}
                <option value={5}>My vacations</option>

            </select>

            <hr />

            <div className="ProductList">
                {currentItems.map(v => <VacationCard key={"vacationCard" + v.vacationId} vacation={v} reportDelete={reportDeletefunction} />)}            </div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(vacations.length / itemsPerPage)}>Next</button>
            <p>Page {currentPage} of {Math.ceil(vacations.length / itemsPerPage)}</p>

        </div>

    );
}

export default List;
