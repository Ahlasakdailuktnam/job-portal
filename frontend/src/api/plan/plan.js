import api from "../axios";

export const getplan = async () => {
  const res = await api.get("/plans");
  return res.data;
};
export const makePlan = async (data)=> {
  const res = await api.post("/plans",data);
  return res.data;
}
export const getPlanById = async (id) => {
  const res = await api.get(`/plans/${id}`);
  return res.data;
};
export const updatePlan = async (id, data) => {
  const res = await api.post(
    `/plans/${id}?_method=PUT`,
    data,
    
  );

  return res.data;
};
export const deletePlan = async (id) => {
  const res = await api.delete(`/plans/${id}`);
  return res.data;
};