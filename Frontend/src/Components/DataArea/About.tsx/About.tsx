import "./About.css";
import razPhoto from "../../../Assets/Images/razImageForContacts.jpeg";
import chenPhoto from "../../../Assets/Images/chenImageForContact.jpeg"
import contactPhoto from "../../../Assets/Images/SnowDogsContactCard.jpg";


function About(): JSX.Element {

    const header = `About us`;
    const whoAreWe = `Snowdogs is a tourism company specializing in skiing and snowboarding vacations as well as cruise trips, culture tours and surfing`
    const details = `We are first and foremost people lovers and want to help everyone go on adventures`;

    const photoName1 = chenPhoto;
    const name1 = `Chen Popper`;
    const role1 = `Manager & Owner`;
    const description1 = `Popper leading SnowDogs since 2012, Manager of ski and snowboard school in the Hermon 
  and owner of Yam the great dog`;
    const facebookLink1 = `chen@snowdogs.co.il`;



    const photoName2 = razPhoto;
    const name2 = `Raz Deshen`;
    const role2 = `Full-stack Developer & Snowboard Instructor`;
    const description2 = `Raz is one of our instructors team since 2017 - owner of Kala the lady wolf`;
    const facebookLink2 = `razdeshen@gmail.com`;




    return (
        <div className="About">
            <div className="about-section">
                <h1>{header}</h1>
                <p>{whoAreWe}</p>
                <p>{details}</p>
            </div>


            <div className="row">

                <div className="column">
                    <div className="card">
                        <img src={photoName1} alt="HomePagePhoto..." className={"contactsPersonsPhoto"} />
                        <div className="container">
                            <h2>{name1}</h2>
                            <p className="title">{role1}</p>
                            <p>{description1}</p>
                            <p>{facebookLink1}</p>

                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src={photoName2} alt="HomePagePhoto..." className={"contactsPersonsPhoto"} />
                        <div className="container">
                            <h2>{name2}</h2>
                            <p className="title">{role2}</p>
                            <p>{description2}</p>
                            <p>{facebookLink2}</p>
                        </div>
                    </div>
                </div>


            </div>
            <br/>
            <br/>
            <img src={contactPhoto} alt="ContactPhoto..." />
        </div>
    );
    
}

export default About;
