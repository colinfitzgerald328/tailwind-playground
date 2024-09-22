import api from "../utils/api";
import { QueriedAthlete, AthleteListResult, VectorSearchResult } from "./types";

export const getAthleteById = async (id: number) => {
  try {
    const response = await api.get(`/athletes/${id}`);
    return response.data as QueriedAthlete;
  } catch (error) {
    console.error("Error fetching athlete:", error);
    throw error;
  }
};

export const getAthletesList = async (page: number) => {
  try {
    const response = await api.get(`/athletes/page/${page}`);
    return response.data as AthleteListResult[];
  } catch (error) {
    console.error("Error fetching athletes list:", error);
    throw error;
  }
};

export const searchForAthlete = async (searchQuery: string) => {
  try {
    const response = await api.get<VectorSearchResult[]>("/athlete/search", {
      params: {
        search_query: searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching for athletes:", error);
    throw error;
  }
};
