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
  newItem.images.forEach((image) => {
    uploadImage(user, image);
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

export const uploadImage = async (user, image) => {
  const data = new FormData();
  data.append("file", image.file);

  const response = await axios.post(
    `${config.endpoint}/upload?username=` +
      user.username +
      "&password=" +
      user.password,
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
