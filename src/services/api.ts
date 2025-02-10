import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com/api", // Change this to your backend URL
});

export default api;
