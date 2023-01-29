import AddVacation from "./AddVacation/AddVacation";
import "./AdminPage.css";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import FollowersGraph from "./followersGraph/followersGraph";
import ContactTable from "./ContactTable/ContactTable";

function AdminPage(): JSX.Element {

    useVerifyAdmin();

    return (
        <div className="AdminPage">

            <AddVacation />
            <hr />
            <FollowersGraph />
            <hr />
            <ContactTable />
            
        </div>
    );
}

export default AdminPage;

