import express, { Request, Response, NextFunction } from "express";
import path from "path";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import ContactModel from "../4-models/contact-model";
import CredentialsModel from "../4-models/credentials-model";
import FollowModel from "../4-models/follower-model";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";
import authLogic from "../5-logic/auth-logic";
import followLogic from "../5-logic/follow-logic";
import logic from "../5-logic/logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logic.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations
router.get("/resorts", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logic.getAllResorts();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api//vacations/:vacationId
router.get("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacations = await logic.getVacationsByResortId(vacationId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api//vacations/:vacationId
router.get("/vacation-by-id/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await logic.getVacationByVacationId(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/userVacations/:userId
router.get("/userVacations/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId;
        
        const vacations = await logic.getVacationsForUser(userId);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.put("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        await logic.updateVacation(vacation);
        response.status(204).send();
    } catch (err) {
        next(err);
    }
    
});

// POST http://localhost:3001/api/followers
router.post("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        const follower = new FollowModel(request.body);
        const addedFollower = await followLogic.followVacation(follower);
        response.status(201).json(addedFollower);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/followers/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await followLogic.deleteFollower(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:3001/api/vacations/:vacationId
router.delete("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const deletedVacation = await logic.deleteVacation(vacationId);
        response.status(201).json({});
    }
    catch (err: any) {
        next(err);
    }
});


// GET http://localhost:3001/api/contacts
router.get("/contacts", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const contacts = await logic.getAllContacts();
        response.json(contacts);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://localhost:3001/api/contacts/:contactId
router.delete("/contacts/:contactId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const contactId = +request.params.contactId;
        await logic.deleteContact(contactId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/contacts
router.post("/contacts", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const contact = new ContactModel(request.body);
        const savedContact = await logic.saveContact(contact);
        response.status(201).json(savedContact);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // __dirname contains the full path to our current folder - controllers folder
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err); // Catch-all middleware
    }
});



export default router;