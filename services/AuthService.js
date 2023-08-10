import PersonService from "@/ldavis/domain/services/PersonService";

class AuthService {
    static async authenticate(username, password) {
        try{
            return await PersonService.getPerson(username,password)
        } catch (error){
            return error;
        }
    }
}

export default AuthService;
