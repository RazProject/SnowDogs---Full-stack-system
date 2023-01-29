import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// Custom Hook

function useVerifyAdmin() {

    const navigate = useNavigate();

    useEffect(() => {

        // If we don't heave a token:
        if(authStore.getState().user.role === "User") {
            notifyService.error("You are not Admin!");
            navigate("/login");
        }
        

    });
    //, [] ? למעלה

}

export default useVerifyAdmin;