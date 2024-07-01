// axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
  withCredentials: true, // Ensure cookies are sent with requests
});

export default axiosInstance;
