import axios from "axios";
import { Config } from "../util/config";

const api = axios.create({
  baseURL: Config.base_url,
  headers: {
    Accept: "application/json",
  },
});

// Request interceptor — attach Bearer token from persisted auth store
api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");

    if (authStorage) {
      const token = JSON.parse(authStorage)?.state?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // Ignore malformed localStorage data
  }

  return config;
});

// Response interceptor — handle 401 Unauthenticated from Laravel Sanctum
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear persisted auth state
      localStorage.removeItem("auth-storage");

      // Redirect to login if not already there
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;