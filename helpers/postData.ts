import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3001";

export const postData = async (endpoint: string, data: any) => {
  try {
    const token = localStorage.getItem("token");

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${API_URL}/${endpoint}`, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};
