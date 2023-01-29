import "./Header.css";
import SnowDogsLogo2 from "../../../Assets/Images/SnowDogsLogo2.jpeg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";


function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <img src={ SnowDogsLogo2 } alt="HomePagePhoto..."/>
        </div>
    );
}

export default Header;
