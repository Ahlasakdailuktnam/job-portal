import axios from "axios";
import { Config } from "../util/config";

const api = axios.create({
  baseURL: Config.base_url,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");

  if (authStorage) {
    const token = JSON.parse(authStorage)?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;