import { logout } from "../api/Auth/authApi";
import useAuthStore from "../store/authStore";

export const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.log(error);
  } finally {
    useAuthStore.getState().logout();
    window.location.href = "/login";
  }
};