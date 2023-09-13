import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3001";

export const putData = async (endpoint: string, data: any, id: number) => {
  try {
    const token = localStorage.getItem("token");

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(
      `${API_URL}/${endpoint}/${id}`,
      data,
      config
    );
    return response;
  } catch (error) {
    throw error;
  }
};
