import api from "../axios";


export const getCategories = () =>
  api.get("/job-categories");

export const getCategory = async (id) => {
  const res = await api.get(`/job-categories/${id}`);
  return res.data;
};

export const createCategory = async (data) => {
  const res = await api.post(
    "/job-categories",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
export const getCategoryById = async (id) => {
  const res = await api.get(`/job-categories/${id}`);
  return res.data;
};
export const updateCategory = async (id, data) => {
  const res = await api.post(
    `/job-categories/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await api.delete(`/job-categories/${id}`);
  return res.data;
};