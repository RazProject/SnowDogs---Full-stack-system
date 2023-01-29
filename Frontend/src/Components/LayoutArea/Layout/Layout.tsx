import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import Login from "../../AuthArea/Login/Login";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        
        
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        
        
        return () => unsubscribe();
        
    }, [user]);
    if(user)
    return (
        <div className="Layout">
			<Menu />
            <Header />
            <Routing />
        </div>
    );
    if(!user)
    return (
        <div className="Layout">
			<Login />
        </div>
    );
}

export default Layout;
