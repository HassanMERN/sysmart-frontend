import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3001";

export const deleteData = async (endpoint: string, id: number) => {
  try {
    const token = localStorage.getItem("token");

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      `${API_URL}/${endpoint}/${id}`,

      config
    );
    return response;
  } catch (error) {
    throw error;
  }
};
