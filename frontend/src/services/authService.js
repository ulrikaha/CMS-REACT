class AuthService {
    constructor() {
        this.authenticated = false;
    }

    async login() {
    this.authenticated = true;
    
    setTimeout(() => {
        return this.authenticated;
    }, 1000);
}
    async logout() {
    this.authenticated = false;

    setTimeout(() => {  
    return this.authenticated;
    } , 100);
}
    isAutenticated() {
        return this.authenticated;
    }
}

export default new AuthService();