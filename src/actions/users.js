import { LOGIN_USER } from "./types";

export const loginUser = (username, password) => {
  // TODO use env file for storing username and password
  if (username === "admin" && password === "password") {
    return {
      type: LOGIN_USER,
      user: {
        username: username,
        password: password,
      },
    };
  } else {
    throw "Login failed";
  }
};
