import axios from "axios";
import config from "../config";

export const getItems = async () => {
    let response = await axios.get(`${config.endpoint}/items`);

    if (response.status !== 200) {
        throw "getItems failed with error code " + response.status;
    }

    return response.data;
}

export const getItemById = async (id) => {
    let response = await axios.get(`${config.endpoint}/items/${id}`);

    if (response.status !== 200) {
        throw "getItemsById failed with error code " + response.status;
    }

    return response.data; 
}