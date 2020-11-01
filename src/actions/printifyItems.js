import axios from "axios";
import config from "../config";

export const getPrintifyItemById = async (user, id) => {
  try {
    var response = await axios.get(
      `${config.endpoint}/printify/items/${id}?username=` +
        user.username +
        "&password=" +
        user.password
    );
  } catch (error) {
    console.log(error);
    response = { status: 404 };
  }
  console.log(response);
  if (response.status !== 200 || response.data.status) {
    throw "getPrintifyItemsById failed with error code " + response.status;
  }

  return response.data;
};
