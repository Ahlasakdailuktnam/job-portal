import React, { useState } from 'react';
import { Input, Textarea, Button, Card } from '../../../common';

const ExperienceSection = ({ experiences = [], onAdd, onUpdate, onRemove }) => {
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      company_name: formData.get('company_name'),
      position: formData.get('position'),
      start_date: formData.get('start_date'),
      end_date: formData.get('end_date') || null,
      description: formData.get('description'),
    };

    if (editing) {
      onUpdate(editing, data);
      setEditing(null);
    } else {
      onAdd(data);
    }
    e.target.reset();
  };

  const getExperience = (id) => experiences.find(e => e.id === id);

  return (
    <Card title="Experience">
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex justify-between items-start p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium">{exp.position}</p>
              <p className="text-sm text-gray-600">{exp.company_name}</p>
              <p className="text-sm text-gray-500">
                {exp.start_date} - {exp.end_date || 'Present'}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="secondary" size="sm" onClick={() => setEditing(exp.id)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onRemove(exp.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              name="company_name"
              placeholder="Company name"
              defaultValue={editing ? getExperience(editing)?.company_name : ''}
              required
            />
            <Input
              name="position"
              placeholder="Position"
              defaultValue={editing ? getExperience(editing)?.position : ''}
              required
            />
            <Input
              name="start_date"
              type="date"
              defaultValue={editing ? getExperience(editing)?.start_date : ''}
              required
            />
            <Input
              name="end_date"
              type="date"
              placeholder="End date (leave empty if present)"
              defaultValue={editing ? getExperience(editing)?.end_date : ''}
            />
          </div>
          <Textarea
            name="description"
            placeholder="Job description..."
            rows={3}
            defaultValue={editing ? getExperience(editing)?.description : ''}
          />
          <Button type="submit" variant="primary">
            {editing ? 'Update' : 'Add'} Experience
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

export default ExperienceSection;