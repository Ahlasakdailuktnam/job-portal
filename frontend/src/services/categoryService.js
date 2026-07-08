import * as categoryApi from "../api/job/jobcategory";

export const fetchCategories =
  async () => {
    const res =
      await categoryApi.getCategories();

    return res.data.data;
  };