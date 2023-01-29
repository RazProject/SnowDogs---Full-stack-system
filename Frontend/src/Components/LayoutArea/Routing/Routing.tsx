import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import About from "../../DataArea/About.tsx/About";
import AdminPage from "../../DataArea/AdminPage/AdminPage";
import UpdateVacation from "../../DataArea/AdminPage/UpdateVacation/UpdateVacation";
import ContactUsPage from "../../DataArea/ContactUsPage/ContactUsPage";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/adminPage" element={ <AdminPage />} />
                <Route path="/updateVacation/:id" element={<UpdateVacation />} />
                <Route path="/contactUs" element={<ContactUsPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
