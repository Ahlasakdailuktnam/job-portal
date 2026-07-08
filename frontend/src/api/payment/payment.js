import api from "../axios";

export const createPayment = async (data) => {
  const res = await api.post("/payments", data);
  return res.data;
};

export const checkPayment = async (id) => {
  const res = await api.post(`/payments/check/${id}`);
  return res.data;
};
export const getPayment = async (id) => {
  const res = await api.get(`/payments/${id}`);
  return res.data;
};
