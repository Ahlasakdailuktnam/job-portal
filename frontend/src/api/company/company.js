import api from "../axios";

export const getMyCompany = async () => {
  const res = await api.get("/my-company");
  return res.data;
};
export const createCompany = async (data) => {
  const res = await api.post("/companies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getCompany = async (id) => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};

export const updateCompany = async (id, data) => {
  const res = await api.post(`/companies/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await api.delete(`/companies/${id}`);
  return res.data;
};
