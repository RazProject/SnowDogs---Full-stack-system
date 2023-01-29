import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css";
import appConfig from "../../../Utils/Config";
import vacationsService from "../../../Services/VacationsService";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";



interface VacationCardProps {
    vacation: VacationModel;
    reportDelete: (id: number) => void;
}


function VacationCard(props: VacationCardProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
    const [followers, setFollowers] = useState(props.vacation.followersCount);
    const [vacationId, setVacationId] = useState(props.vacation.vacationId);
    const [user, setUser] = useState<UserModel>();

    function deleteVacation(): void {
        props.reportDelete(props.vacation.vacationId);
    }

    useEffect(() => {
        setVacationId(props.vacation.vacationId);
        setUser(authStore.getState().user);
    }, [props.vacation.vacationId]);


    const handleUnfollow = () => {

        vacationsService.unfollowVacation(vacationId).then(() => {
        setIsFollowing(0);
        const followersFromState = followers;
        setFollowers(followersFromState - 1);
        notifyService.success("Vacation unfollowed");
    });

    };

    const handleFollow = () => {

        vacationsService.followVacation(vacationId).then(() => {
            
            setIsFollowing(1);
            const followersFromState = followers;
            setFollowers(followersFromState + 1);

            notifyService.success("Vacation follow!");
        });

    };



    return (
        <div className="VacationCard" >
            <div className="Container">

                {isFollowing > 0 ?
                    (
                        user?.role === "User" && <button className="unfollowButton" onClick={handleUnfollow}>F</button>

                    ) : (
                        user?.role === "User" && <button className="followButton" onClick={handleFollow}>F</button>

                    )}
                {user?.role === "Admin" && <NavLink to={"/updateVacation/" + vacationId}>📝</NavLink>}
                {user?.role === "Admin" && <button className="deleteButton"  onClick={ () => deleteVacation() }>✖️</button>}


                <br />
                <span>{props.vacation.description}</span>
                <br />
                <span>{props.vacation.price}$</span>
                <br />
                <span>{props.vacation.departureDate.slice(0,10)}🛫</span>
                <br />
                <span>{props.vacation.arrivalDate.slice(0,10)}🛬</span>
                <br />
                <span>Vacation number: {vacationId}</span>
                <br />
                {user?.role === "User" &&<span>{isFollowing > 0 ?
                    (
                        <span>You are following this vacation!</span>
                    ) : (
                        <span>Add follow if you like</span>
                    )}</span> }
                <br />
                <span>Total followers: {followers}</span>
                <br />
                <img src={appConfig.vacationImagesUrl + props.vacation.imageName} alt="iimage..." />

            </div>
        </div>
    );
}

export default VacationCard;
