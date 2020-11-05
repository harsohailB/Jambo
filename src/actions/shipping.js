import axios from "axios";
import config from "../config";

export const getShipping = async (details) => {
  try {
    var response = await axios.post(`${config.endpoint}/shipping`, details);
  } catch (error) {
    console.log(error);
    response = { status: 404 };
  }

  if (response.status !== 200 || response.data.status) {
    throw "getShipping failed with error code " + response.status;
  }

  return response.data;
};
