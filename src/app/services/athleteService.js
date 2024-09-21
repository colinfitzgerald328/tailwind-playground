import api from "../utils/api";

export const getAthleteById = async (id) => {
  try {
    const response = await api.get(`/athletes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching athlete:", error);
    throw error;
  }
};
