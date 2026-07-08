import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCV, useEducation, useExperience, useSkill } from '../../../hook';
import { CvBuilder } from '../../../components/cv';

const CVBuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const cvHooks = useCV(id);
  const educationHooks = useEducation(id);
  const experienceHooks = useExperience(id);
  const skillHooks = useSkill(id);

  const { useGetById, useCreate, useUpdate } = cvHooks;
  const { useGetAll: useGetEducations } = educationHooks;
  const { useGetAll: useGetExperiences } = experienceHooks;
  const { useGetAll: useGetSkills } = skillHooks;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const cvQuery = useGetById();
  const educationsQuery = useGetEducations();
  const experiencesQuery = useGetExperiences();
  const skillsQuery = useGetSkills();

  const createMutation = useCreate();
  const updateMutation = useUpdate();

  useEffect(() => {
    if (isEditMode && cvQuery.data) {
      const cvData = cvQuery.data.data;
      setInitialData({
        title: cvData.title || '',
        phone: cvData.phone || '',
        address: cvData.address || '',
        linkedin: cvData.linkedin || '',
        telegram: cvData.telegram || '',
        summary: cvData.summary || '',
        template: cvData.template || 'classic',
        profile_image: cvData.profile_image || null,
        educations: educationsQuery.data?.data || [],
        experiences: experiencesQuery.data?.data || [],
        skills: skillsQuery.data?.data || [],
      });
    }
  }, [isEditMode, cvQuery.data, educationsQuery.data, experiencesQuery.data, skillsQuery.data]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      navigate('/cv');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && cvQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-700">Loading CV...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        {isEditMode ? 'Edit CV' : 'Create New CV'}
      </h1>
      <CvBuilder
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={loading}
      />
    </div>
  );
};

export default CVBuilderPage;