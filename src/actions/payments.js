import axios from "axios";
import config from "../config";

export const createCheckoutSession = async (line_items) => {
  console.log(line_items);
  let response = await axios.post(`${config.endpoint}/session_id`, {
    line_items,
  });

  if (response.status !== 200) {
    throw "createCheckoutSession failed with error code " + response.status;
  }

  return response.data;
};
