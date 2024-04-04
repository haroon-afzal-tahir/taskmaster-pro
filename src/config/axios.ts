import { CookieHelper } from "@/utils/cookie";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL;
console.log(baseURL);

const API = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


API.interceptors.request.use((config) => {
  const token = CookieHelper.getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export { API };
