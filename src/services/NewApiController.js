import axios from "axios";
import { API_CONSTANTS } from "../assets/config/constants";
const NewApiController = async (endpoint, body, method, token) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url: API_CONSTANTS.BASE_URL+endpoint,
      method: method || "GET",
      data: body,
      headers,
      responseType: "json",
    });
    
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
export default NewApiController;

export const NewApiControllerFile = async (endpoint, body, method, token) => {
  let headers = {
    Accept: "application/json",
    "Content-Type":"multipart/form-data",
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios({
      url: API_CONSTANTS.BASE_URL+endpoint,
      method: method || "GET",
      data: body,
      headers,
      responseType: "json",
    });
    
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
