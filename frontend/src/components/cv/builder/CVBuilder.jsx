import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import TemplateSelector from './TemplateSelector';
import { Button } from '../../common';
import CvForm from '../CvForm';

const CvBuilder = ({ initialData = null, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    phone: '',
    address: '',
    linkedin: '',
    telegram: '',
    summary: '',
    template: 'classic',
    profile_image: null,
    educations: [],
    experiences: [],
    skills: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        linkedin: initialData.linkedin || '',
        telegram: initialData.telegram || '',
        summary: initialData.summary || '',
        template: initialData.template || 'classic',
        profile_image: initialData.profile_image || null,
        educations: initialData.educations || [],
        experiences: initialData.experiences || [],
        skills: initialData.skills || [],
      });
    }
  }, [initialData]);

  const handleChange = (data) => {
    setFormData(data);
  };

  const handleTemplateChange = (template) => {
    setFormData({ ...formData, template });
  };

  const handleAddEducation = (education) => {
    setFormData({
      ...formData,
      educations: [...formData.educations, { ...education, id: `local-${Date.now()}` }],
    });
  };

  const handleUpdateEducation = (id, data) => {
    setFormData({
      ...formData,
      educations: formData.educations.map((edu) =>
        edu.id === id ? { ...edu, ...data } : edu
      ),
    });
  };

  const handleRemoveEducation = (id) => {
    setFormData({
      ...formData,
      educations: formData.educations.filter((edu) => edu.id !== id),
    });
  };

  const handleAddExperience = (experience) => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { ...experience, id: `local-${Date.now()}` }],
    });
  };

  const handleUpdateExperience = (id, data) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...data } : exp
      ),
    });
  };

  const handleRemoveExperience = (id) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((exp) => exp.id !== id),
    });
  };

  const handleAddSkill = (skill) => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { ...skill, id: `local-${Date.now()}` }],
    });
  };

  const handleRemoveSkill = (id) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill.id !== id),
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="space-y-6">
      <TemplateSelector
        selected={formData.template}
        onChange={handleTemplateChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Form Column */}
        <div className="space-y-6">
          <CvForm
            formData={formData}
            onChange={handleChange}
            errors={errors}
            onAddEducation={handleAddEducation}
            onUpdateEducation={handleUpdateEducation}
            onRemoveEducation={handleRemoveEducation}
            onAddExperience={handleAddExperience}
            onUpdateExperience={handleUpdateExperience}
            onRemoveExperience={handleRemoveExperience}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
          
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isLoading}
            >
              {initialData ? 'Update CV' : 'Create CV'}
            </Button>
          </div>
        </div>

        {/* Preview Column - Sticky */}
        <div className="lg:sticky lg:top-6">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CvBuilder;

