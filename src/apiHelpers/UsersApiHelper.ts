import ApiHelperBase from "./ApiHelperBase";
import UsersResponse from "../classes/UserResponse";

export default class UsersApiHelper extends ApiHelperBase {
    getContacts(page: number) {
        return super.fetch<UsersResponse>('/users', {page: page}, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}