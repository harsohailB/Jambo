import axios from "axios";
import config from "../config";
import { LOGIN_USER } from "./types";

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

export const loginUser = async (username, password) => {
  let hashedPassword = bcrypt.hashSync(password, salt);

  const params = "?username=" + username + "&password=" + hashedPassword;

  const response = await axios.get(`${config.endpoint}/login/${params}`);

  if (response.status === 200 || response.status === 304) {
    return {
      type: LOGIN_USER,
      user: {
        username: username,
        password: hashedPassword,
      },
    };
  } else if (response.status === 401) {
    throw "Login Failed with wrong credentials";
  } else {
    throw "loginUser failed with error code " + response.status;
  }
};
