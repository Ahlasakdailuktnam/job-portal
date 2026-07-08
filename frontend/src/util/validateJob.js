
export const validateStep1 = (formData) => {
  const errors = {};
  if (!formData.category_id) {
    errors.category_id = ["សូមជ្រើសរើសប្រភេទការងារ"];
  }
  if (!formData.title || !formData.title.trim()) {
    errors.title = ["សូមបញ្ចូលចំណងជើងការងារ"];
  }
  if (!formData.description || !formData.description.trim()) {
    errors.description = ["សូមបញ្ចូលការពណ៌នាការងារ"];
  }
  return errors;
};

export const validateStep2 = (requirements) => {
  const errors = {};
  const reqs = requirements.filter((r) => r.trim());
  if (reqs.length === 0) {
    errors.requirement = ["សូមបញ្ចូលតម្រូវការយ៉ាងហោចណាស់មួយ"];
  }
  return errors;
};

export const validateStep3 = (formData) => {
  const errors = {};
  if (!formData.job_type) {
    errors.job_type = ["សូមជ្រើសរើសប្រភេទការងារ"];
  }
  if (!formData.deadline) {
    errors.deadline = ["សូមជ្រើសរើសថ្ងៃផុតកំណត់"];
  }
  return errors;
};

export const validateAllSteps = (formData, requirements) => {
  const errors = {
    ...validateStep1(formData),
    ...validateStep2(requirements),
    ...validateStep3(formData),
  };
  return errors;
};