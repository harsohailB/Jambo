import axios from "axios";
import config from "../config";

export const createCheckoutSession = async (line_items, countryCode) => {
  let response = await axios.post(
    `${config.endpoint}/session_id?country=${countryCode}`,
    {
      line_items,
    }
  );

  if (response.status !== 200) {
    throw "createCheckoutSession failed with error code " + response.status;
  }

  return response.data;
};
