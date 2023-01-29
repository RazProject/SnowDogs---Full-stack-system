import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();


    useEffect(() => {


        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });


        return () => unsubscribe();

    }, [user]);

    return (
        <div className="Menu">

            <NavLink to="/home" className="links">SnowDogs</NavLink>
            <span>  </span>
            <NavLink to="/list" className="links">Vacations</NavLink>
            <span>  </span>
            {user?.role === 'User' && <NavLink to="/contactUs" className="links">Contact-us</NavLink>}
            <span>  </span>
            <NavLink to="/about" className="links" >About</NavLink>
            <span>  </span>
            {user?.role === 'Admin' && <NavLink to="/adminPage" className="links">Admin Page</NavLink>}
            <span>  </span>

        </div>
    );
}

export default Menu;