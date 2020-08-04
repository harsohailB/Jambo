import axios from "axios";
import config from "../config";

export const getEmails = async () => {
  let response = await axios.get(`${config.endpoint}/emails`);

  if (response.status !== 200) {
    throw "getEmails failed with error code " + response.status;
  }

  return response.data;
};

export const addEmail = async (email) => {
  const response = await axios.post(`${config.endpoint}/emails`, email);

  if (response.status !== 200) {
    throw "addEmail failed with error code " + response.status;
  }

  return { message: "Email: " + email + " subscribed!" };
};
