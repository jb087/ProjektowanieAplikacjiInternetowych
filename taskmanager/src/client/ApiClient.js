const host = "http://localhost:9000/";
const apiPath = host + "api/";
const checkUserPath = apiPath + "check-user/";
const userExistsPath = apiPath + "user-exists/";
const registerUserPath = apiPath + "register-user/";

class ApiClient {

    static async checkUser(data) {
        return fetch(checkUserPath, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(json => json.response);
    }

    static async userExists(data) {
        return fetch(userExistsPath, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(json => json.response);
    }

    static async registerUser(data) {
        return fetch(registerUserPath, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        })
            .then(response => response.json())
            .then(json => json.response);
    }
}

export default ApiClient;
