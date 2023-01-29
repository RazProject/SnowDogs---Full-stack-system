import ContactModel from "../Models/ContactModel";
import FollowModel from "../Models/FollowModel";
import ResortModel from "../Models/ResortModel";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";
import axios from "axios";
import { authStore } from "../Redux/AuthState";
axios.defaults.headers.common = { 'Authorization': `bearer ${sessionStorage.getItem('token')}` }


class VacationsService {

    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            // AJAX Request: 
            const response = await axios.get<VacationModel[]>(appConfig.userVacationUrl + authStore.getState().user.userId);

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }
        return vacations;
    }

    public async getVacationsByUserId(userId: number): Promise<VacationModel[]> {

            // AJAX Request: 
            const response = await axios.get<VacationModel[]>(appConfig.userVacationUrl + userId);

            // Extract vacations: 
            const vacations = response.data;

            // Save vacations to global state: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
            
        return vacations;
    }


    public async getVacationsByResortId(resortId: number): Promise<VacationModel[]> {
        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {

            // AJAX Request: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + resortId);

            // Extract vacations: 
            const vacations = response.data;

            // Save vacations to global state: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        return vacations.filter(vacation => vacation.resortId === resortId);

    }

    public async getAllResorts(): Promise<ResortModel[]> {

        const response = await axios.get<ResortModel[]>(appConfig.resortsUrl);
        const resorts = response.data;
        return resorts;
    }

    public async getVacationByVacationId(vacationId: number): Promise<VacationModel[]> {
        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;
        if (vacations.length === 0) {
            // AJAX Request: 
            const response = await axios.get<VacationModel[]>(appConfig.vacationByIdUrl + vacationId);

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state: 
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        return vacations;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
        await axios.delete<VacationModel[]>(appConfig.vacationsUrl + vacationId);
    }

    public async addVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData();
        myFormData.append("description", vacation.description);
        myFormData.append("resortId", vacation.resortId.toString());
        myFormData.append("departureDate", vacation.departureDate.toString());
        myFormData.append("arrivalDate", vacation.arrivalDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData); // Sending object without files.

        const addedVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData();
        myFormData.append("vacationId", vacation.vacationId.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("resortId", vacation.resortId.toString());
        myFormData.append("departureDate", vacation.departureDate.toString());
        myFormData.append("arrivalDate", vacation.arrivalDate.toString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]);

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl, myFormData); // Sending object without files.

        const updatedVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    public async sendContact(contact: ContactModel): Promise<void> {
        await axios.post<ContactModel>(appConfig.contactsUrl, contact);
    }

    public async followVacation(vacationId: number): Promise<void> {

        const follow = new FollowModel();
        follow.userId = authStore.getState().user.userId;
        follow.vacationId = vacationId;

        const followedVacation = await this.getOneVacation(vacationId);
        followedVacation.isFollowing = 1;
        followedVacation.followersCount += 1;
        vacationsStore.dispatch({ type : VacationsActionType.UpdateVacation, payload: followedVacation } );
        await axios.post<void>(appConfig.followUrl, follow);
    }

    public async unfollowVacation(vacationId: number): Promise<void> {
        let unfollowedVacation = await this.getOneVacation(vacationId);
        unfollowedVacation.isFollowing = 0;
        unfollowedVacation.followersCount += -1;

        vacationsStore.dispatch({ type : VacationsActionType.UpdateVacation, payload: unfollowedVacation } );
        await axios.delete<void>(appConfig.followUrl + vacationId);
    }  


    // Get one vacation:
    public async getOneVacation(id: number): Promise<VacationModel> {

        // Take products from global store:
        let vacations = vacationsStore.getState().vacations;

        // Find required product:
        let vacation = vacations.find(v => v.vacationId === id);

        // If we don't have that product in global state:
        if (vacation) {

            // AJAX Request: 
            const response = await axios.get<VacationModel>(appConfig.vacationByIdUrl + id);

            // Extract product: 
            vacation = response.data;
        }

        // Return product: 
        return vacation;
    }

}






const vacationsService = new VacationsService();

export default vacationsService;