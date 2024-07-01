import axios from "axios";
import { format, subDays, startOfDay } from "date-fns";

const BASE_URL = "https://api.nasa.gov";
const API_KEY = process.env.REACT_APP_NASA_API_KEY;

export const getNasaMedia = async () => {
  const today = startOfDay(new Date());
  const startFetchDate = subDays(today, 30);
  try {
    const response = await axios.get(
      `${BASE_URL}/planetary/apod?api_key=${API_KEY}&start_date=${format(
        startFetchDate,
        "yyyy-MM-dd"
      )}&end_date=${format(today, "yyyy-MM-dd")}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while fetching APOD:", error);
    throw error;
  }
};
