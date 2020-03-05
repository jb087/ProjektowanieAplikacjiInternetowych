class User {

    constructor(id, login, password) {
        this.id = id;
        this.login = login;
        this.password = password;
    }

    static withoutId(login, password) {
        return new User("", login, password);
    }
}

module.exports = User;
