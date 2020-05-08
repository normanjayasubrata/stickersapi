class Account {
    constructor({username, email, password} = {}) {
        this.username = username || "";
        this.email = email || "";
        this.password = password || "";
    }

    validate() {
        const hasusername = this.username.trim() !== "";
        const hasemail = this.email.trim() !== "";
        const haspassword = this.password.trim() !== "";

        return hasusername && hasemail && haspassword
    }

    login() {
        const hasemail = this.email.trim() !== "";
        const haspassword = this.password.trim() !== "";
        return hasemail && haspassword
    }
}

module.exports = Account