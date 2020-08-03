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

export const uploadItem = async (user, newItem) => {
  createFolderForNewItem(user, newItem.folderName);

  newItem.images.forEach((image) => {
    uploadImage(user, image, newItem.folderName);
  });

  const response = await axios.post(
    `${config.endpoint}/items?username=` +
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

const uploadImage = async (user, image, folderName) => {
  const data = new FormData();
  data.append("file", image.file);

  const response = await axios.post(
    `${config.endpoint}/upload?username=` +
      user.username +
      "&password=" +
      user.password +
      "&folderName=" +
      folderName,
    data
  );

  if (response.status !== 200) {
    throw (
      "uploadImage failed with error code " +
      response.status +
      ": " +
      response.data.message
    );
  }

  return response.data;
};

const createFolderForNewItem = async (user, folderName) => {
  const response = await axios.post(
    `${config.endpoint}/create-folder?username=` +
      user.username +
      "&password=" +
      user.password,
    { folderName }
  );

  if (response.status !== 200) {
    throw (
      "createFolderForNewItem failed with error code " +
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
    `${config.endpoint}/items/${id + params}`
  );

  if (response.status !== 200) {
    throw "deleteItemByID failed with error code " + response.status;
  }

  return { message: "Item " + id + " deleted" };
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
