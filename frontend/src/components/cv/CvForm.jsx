import React from 'react';

import { EducationSection, ExperienceSection, PersonalSection, ProfileSection, SkillSection } from './builder';

const CvForm = ({ 
  formData, 
  onChange, 
  onAddEducation, 
  onUpdateEducation, 
  onRemoveEducation, 
  onAddExperience, 
  onUpdateExperience, 
  onRemoveExperience, 
  onAddSkill, 
  onRemoveSkill 
}) => {
  return (
    <div className="space-y-6">
      <PersonalSection
        data={formData}
        onChange={onChange}
      />
      
      <ProfileSection
        data={formData}
        onChange={onChange}
      />
      
      <EducationSection
        educations={formData.educations}
        onAdd={onAddEducation}
        onUpdate={onUpdateEducation}
        onRemove={onRemoveEducation}
      />
      
      <ExperienceSection
        experiences={formData.experiences}
        onAdd={onAddExperience}
        onUpdate={onUpdateExperience}
        onRemove={onRemoveExperience}
      />
      
      <SkillSection
        skills={formData.skills}
        onAdd={onAddSkill}
        onRemove={onRemoveSkill}
      />
    </div>
  );
};


export default CvForm;