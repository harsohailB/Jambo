import { LOGIN_USER, LOGOUT_USER } from "./types";

export const loginUser = (username, password) => {
    if(username === "admin" && password === "password"){
        return { type: LOGIN_USER, user: true }
    }else{
        throw "Login failed";
    }
}