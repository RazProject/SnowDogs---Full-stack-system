import ContactUs from "../ContactUs/ContactUs";
import "./ContactUsPage.css";

function ContactUsPage(): JSX.Element {
    return (
        <div className="ContactUsPage">
            <h1>Leave a message and we will get back to you with the perfect vacation for you</h1>
            <ContactUs />
			
        </div>
    );
}

export default ContactUsPage;
