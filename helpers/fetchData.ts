import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchData = async (endpoint: string) => {
  const token = localStorage.getItem("token");

  try {
    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Add the token to the Authorization header
      },
    };

    const response = await axios.get(`${API_URL}/${endpoint}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
