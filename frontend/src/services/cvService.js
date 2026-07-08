import { cvApi, educationApi, experienceApi, skillApi } from '../api';

const cvFields = [
  'title',
  'phone',
  'address',
  'linkedin',
  'telegram',
  'summary',
  'template',
  'profile_image',
  'cv_file',
  'source',
];

const isPersistedId = (id) => Number.isInteger(Number(id)) && String(id).length < 12;

const pickCvPayload = (data) => {
  const payload = {};

  cvFields.forEach((field) => {
    if (data[field] !== undefined && data[field] !== null) {
      payload[field] = data[field];
    }
  });

  return payload;
};

const syncCollection = async ({ current = [], next = [], create, update, remove }) => {
  const nextPersistedIds = next
    .filter((item) => isPersistedId(item.id))
    .map((item) => Number(item.id));

  await Promise.all(
    current
      .filter((item) => isPersistedId(item.id) && !nextPersistedIds.includes(Number(item.id)))
      .map((item) => remove(item.id))
  );

  await Promise.all(
    next.map((item) => {
      const { id, cv_id, created_at, updated_at, ...payload } = item;
      return isPersistedId(id) ? update(id, payload) : create(payload);
    })
  );
};

export const cvService = {
  getAll: async () => {
    const response = await cvApi.getAll();
    return response.data;
  },

  getById: async (id) => {
    const response = await cvApi.getById(id);
    return response.data;
  },

  create: async (data) => {
    const response = await cvApi.create(pickCvPayload(data));
    const cv = response.data.data;

    await Promise.all([
      ...(data.educations || []).map((item) => educationApi.create(cv.id, item)),
      ...(data.experiences || []).map((item) => experienceApi.create(cv.id, item)),
      ...(data.skills || []).map((item) => skillApi.create(cv.id, item)),
    ]);

    return response.data;
  },

  update: async (id, data) => {
    const currentResponse = await cvApi.getById(id);
    const current = currentResponse.data.data;
    const response = await cvApi.update(id, pickCvPayload(data));

    await Promise.all([
      syncCollection({
        current: current.educations || [],
        next: data.educations || [],
        create: (payload) => educationApi.create(id, payload),
        update: educationApi.update,
        remove: educationApi.delete,
      }),
      syncCollection({
        current: current.experiences || [],
        next: data.experiences || [],
        create: (payload) => experienceApi.create(id, payload),
        update: experienceApi.update,
        remove: experienceApi.delete,
      }),
      syncCollection({
        current: current.skills || [],
        next: data.skills || [],
        create: (payload) => skillApi.create(id, payload),
        update: skillApi.update,
        remove: skillApi.delete,
      }),
    ]);

    return response.data;
  },

  delete: async (id) => {
    const response = await cvApi.delete(id);
    return response.data;
  },

  download: async (id) => {
    const response = await cvApi.download(id);
    return response;
  },
};
