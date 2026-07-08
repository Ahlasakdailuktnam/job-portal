import React from 'react';
import { Textarea, Card } from '../../../common';

const ProfileSection = ({ data = {}, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <Card title="Professional Summary">
      <Textarea
        label="Summary"
        name="summary"
        value={data.summary || ''}
        onChange={handleChange}
        placeholder="Write a compelling summary about yourself..."
        rows={5}
      />
    </Card>
  );
};

export default ProfileSection;