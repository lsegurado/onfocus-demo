import ApiHelperBase from "./ApiHelperBase";
import LoginResponse from "../classes/LoginResponse";

export default class LoginApiHelper extends ApiHelperBase {
    login(email: string, password: string) {
        return super.fetch<LoginResponse>('/login', null,
         {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}