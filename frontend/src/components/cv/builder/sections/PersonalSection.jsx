import React from 'react';
import { Input, Card } from '../../../common';
import ImageUpload from '../../../common/ImageUpload';

const PersonalSection = ({ data = {}, onChange, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleImageChange = (file) => {
    onChange({ ...data, profile_image: file });
  };

  return (
    <Card title="Personal Information">
      <div className="space-y-6">
        <div className="flex justify-center">
          <ImageUpload
            value={data.profile_image}
            onChange={handleImageChange}
            label="Profile Photo"
            error={errors.profile_image}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="title"
            value={data.title || ''}
            onChange={handleChange}
            placeholder="John Doe"
            required
            error={errors.title}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            required
            error={errors.phone}
          />
          <Input
            label="Address"
            name="address"
            value={data.address || ''}
            onChange={handleChange}
            placeholder="123 Main St, City"
          />
          <Input
            label="LinkedIn"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
          <Input
            label="Telegram"
            name="telegram"
            value={data.telegram || ''}
            onChange={handleChange}
            placeholder="@username"
          />
        </div>
      </div>
    </Card>
  );
};

export default PersonalSection;