import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  Headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status == 401) {
        window.location.href = "/login";
      } else if (error.response.status == 500) {
        console.error("server error. please try again later");
      }
    } else if (error.code == "ECONNABORATED") {
      console.error("Request timout, please try again ");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
