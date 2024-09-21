import axios from "axios";

const api = axios.create({
  baseURL: "https://athletics-hub-engine-production.up.railway.app",
});

export default api;
