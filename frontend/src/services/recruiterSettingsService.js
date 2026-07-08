import * as settingsApi from "../api/recruiter/settings";

export const recruiterSettingsService = {
  get: async () => {
    const response = await settingsApi.getRecruiterSettings();
    return response.data.data;
  },
  update: async (data) => {
    const response = await settingsApi.updateRecruiterSettings(data);
    return response.data;
  },
};
