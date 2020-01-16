import User from "./User";

export default class UserResponse {
    public page: number;
    public per_page: number;
    public total: number;
    public total_pages: number;
    public data: Array<User>;
    constructor(page: number,
        per_page: number,
        total: number,
        total_pages: number,
        data: Array<User>) {
        this.page = page;
        this.per_page = per_page;
        this.total = total;
        this.total_pages = total_pages;
        this.data = data;
    }
}