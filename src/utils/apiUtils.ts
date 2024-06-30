import axios from "axios";

const BASE_URL = "https://api.nasa.gov";
const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export const fetchPicture = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/planetary/apod?api_key=${API_KEY}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching APOD:", error);
    throw error;
  }
};
