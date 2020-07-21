import axios from "axios";
import config from "../config";

export const getItems = async () => {
  let response = await axios.get(`${config.endpoint}/items`);

  if (response.status !== 200) {
    throw "getItems failed with error code " + response.status;
  }

  return response.data;
};

export const getItemById = async (id) => {
  let response = await axios.get(`${config.endpoint}/items/${id}`);

  if (response.status !== 200) {
    throw "getItemsById failed with error code " + response.status;
  }

  return response.data;
};

export const updateItemById = async (user, updatedItem) => {
  const params = "?username=" + user.username + "&password=" + user.password;
  const response = await axios.put(
    `${config.endpoint}/items/${updatedItem.id + params}`,
    updatedItem
  );

  if (response.status !== 200) {
    throw "editItemByID failed with error code " + response.status;
  }

  return { message: "Item " + updatedItem.id + " edited" };
};
