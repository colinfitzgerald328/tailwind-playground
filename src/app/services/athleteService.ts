import api from "../utils/api";
import { QueriedAthlete } from "./types";

export const getAthleteById = async (id: number) => {
  try {
    const response = await api.get(`/athletes/${id}`);
    return response.data as QueriedAthlete;
  } catch (error) {
    console.error("Error fetching athlete:", error);
    throw error;
  }
};
