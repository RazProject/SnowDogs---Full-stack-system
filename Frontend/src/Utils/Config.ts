class Config {
    public vacationsUrl = "http://localhost:3001/api/vacations/";
    public resortsUrl = "http://localhost:3001/api/resorts/";
    public contactsUrl = "http://localhost:3001/api/contacts/";
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public vacationImagesUrl = "http://localhost:3001/api/vacations/images/";
    public followUrl = "http://localhost:3001/api/followers/";
    public userVacationUrl = "http://localhost:3001/api/userVacations/";
    public vacationByIdUrl = "http://localhost:3001/api/vacation-by-id/";
}

const appConfig = new Config(); // Singleton

export default appConfig;
