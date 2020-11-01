import axios from "axios";
import config from "../config";

export const getItems = async () => {
  let response = await axios.get(`${config.endpoint}/fauna/items`);

  if (response.status !== 200) {
    throw "getItems failed with error code " + response.status;
  }

  return response.data;
};

export const getItemById = async (id) => {
  try {
    var response = await axios.get(`${config.endpoint}/fauna/items/${id}`);
  } catch (error) {
    console.log(error);
    response = { status: 404 };
  }

  if (response.status !== 200) {
    throw "getItemsById failed with error code " + response.status;
  }

  return response.data;
};

export const uploadItem = async (user, newItem) => {
  const response = await axios.post(
    `${config.endpoint}/fauna/items?username=` +
      user.username +
      "&password=" +
      user.password,
    newItem
  );

  if (response.status !== 200) {
    throw (
      "uploadItem failed with error code " +
      response.status +
      ": " +
      response.data.message
    );
  }

  return response.data;
};

export const deleteItemById = async (user, id) => {
  const params = "?username=" + user.username + "&password=" + user.password;

  const response = await axios.delete(
    `${config.endpoint}/fauna/items/${id + params}`
  );

  if (response.status !== 200) {
    throw "deleteItemByID failed with error code " + response.status;
  }

  return { message: "Item " + id + " deleted" };
};

export const updateItemById = async (user, updatedItem) => {
  const params = "?username=" + user.username + "&password=" + user.password;
  const response = await axios.put(
    `${config.endpoint}/fauna/items/${updatedItem.id + params}`,
    updatedItem
  );

  if (response.status !== 200) {
    throw "editItemByID failed with error code " + response.status;
  }

  return { message: "Item " + updatedItem.id + " edited" };
};
