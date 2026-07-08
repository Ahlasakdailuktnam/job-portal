import React, { useState } from 'react';
import { Input, Button, Card } from '../../../common';

const EducationSection = ({ educations = [], onAdd, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      school_name: formData.get('school_name'),
      degree: formData.get('degree'),
      start_year: parseInt(formData.get('start_year')),
      end_year: formData.get('end_year') ? parseInt(formData.get('end_year')) : null,
    };

    if (editing) {
      onUpdate(editing, data);
      setEditing(null);
    } else {
      onAdd(data);
    }
    e.target.reset();
  };

  const getEducation = (id) => educations.find(e => e.id === id);

  return (
    <Card title="Education">
      <div className="space-y-4">
        {educations.map((edu) => (
          <div key={edu.id} className="flex justify-between items-start p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">{edu.school_name}</p>
              <p className="text-sm text-gray-600">{edu.degree}</p>
              <p className="text-sm text-gray-500">
                {edu.start_year} - {edu.end_year || 'Present'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(edu.id)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onRemove(edu.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              name="school_name"
              placeholder="School name"
              defaultValue={editing ? getEducation(editing)?.school_name : ''}
              required
            />
            <Input
              name="degree"
              placeholder="Degree (e.g., Bachelor)"
              defaultValue={editing ? getEducation(editing)?.degree : ''}
              required
            />
            <Input
              name="start_year"
              type="number"
              placeholder="Start year"
              defaultValue={editing ? getEducation(editing)?.start_year : ''}
              required
            />
            <Input
              name="end_year"
              type="number"
              placeholder="End year (leave empty if present)"
              defaultValue={editing ? getEducation(editing)?.end_year : ''}
            />
          </div>
          <Button type="submit" variant="primary">
            {editing ? 'Update' : 'Add'} Education
          </Button>
          {editing && (
            <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          )}
        </form>
      </div>
    </Card>
  );
};

export default EducationSection;