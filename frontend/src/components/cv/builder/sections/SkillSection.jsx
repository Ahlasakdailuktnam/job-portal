import React, { useState } from 'react';
import { Input, Button, Card } from '../../../common';

const SkillSection = ({ skills = [], onAdd, onRemove }) => {
  const [skillName, setSkillName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (skillName.trim()) {
      onAdd({ name: skillName.trim() });
      setSkillName('');
    }
  };

  return (
    <Card title="Skills">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {skill.name}
              <button
                onClick={() => onRemove(skill.id)}
                className="ml-1 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            name="skill"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Enter a skill..."
            className="flex-1"
          />
          <Button type="submit" variant="primary">
            Add Skill
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SkillSection;