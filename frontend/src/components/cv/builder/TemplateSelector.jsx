import React from 'react';
import { Card } from '../../common';

const templates = [
  { id: 'classic', name: 'Classic', description: 'Clean & Professional' },
  { id: 'modern', name: 'Modern', description: 'Sleek & Contemporary' },
  { id: 'minimal', name: 'Minimal', description: 'Simple & Elegant' },
];

const TemplateSelector = ({ selected, onChange }) => {
  return (
    <Card title="Choose Template">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selected === template.id
                ? 'border-gray-700 bg-gray-50 shadow-md'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="font-medium text-gray-800">{template.name}</div>
            <div className="text-xs text-gray-500 mt-1">{template.description}</div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;