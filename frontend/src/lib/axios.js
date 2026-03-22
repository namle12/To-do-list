import axios from "axios";

const BASE_url =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASE_url,
});
export default api;
