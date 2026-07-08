import api from "../axios";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const verifyOtp = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};
export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
export const getuser = async ()=> {
    const res = await api.get("/auth/getuser");
    return res.data;
}
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};