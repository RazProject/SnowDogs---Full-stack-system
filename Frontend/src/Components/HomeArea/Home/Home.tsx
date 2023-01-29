import "./Home.css";
import SnowDogsTeam from "../../../Assets/Images/SnowDogsTeam.jpg";
import Mayerofen2014 from "../../../Assets/Images/Mayerofen2014.jpg";








function Home(): JSX.Element {
    return (
        <div className="Home">

            <h2>SnowDogs Tours</h2>
            < br/>
            <div className="description">
             < br/>< br/>
            <img src={ SnowDogsTeam } alt="HomePagePhoto..." className="homePagePhotos"/>
            </div>

            <hr />

            <div className="description">
             < br/>< br/>
            <img src={ Mayerofen2014 } alt="Mayerofen2014..." className="homePagePhotos"/>
            </div>

            <hr />

        </div>

        
    );
}

export default Home;
