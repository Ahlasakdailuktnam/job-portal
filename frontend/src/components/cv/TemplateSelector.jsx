import React from 'react';
import { Card } from '../../common';

const templates = [
  { 
    id: 'classic', 
    name: 'Classic',
    description: 'Traditional professional layout with sidebar',
  },
  { 
    id: 'modern', 
    name: 'Modern',
    description: 'Contemporary two-column design',
  },
  { 
    id: 'minimal', 
    name: 'Minimal',
    description: 'Clean single-column layout',
  },
  { 
    id: 'professional', 
    name: 'Professional',
    description: 'Executive style with header emphasis',
  },
  { 
    id: 'creative', 
    name: 'Creative',
    description: 'Unique layout for creative fields',
  },
];

const TemplateSelector = ({ selected, onChange }) => {
  return (
    <Card title="Choose Template">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onChange(template.id)}
            className={`p-3 rounded-lg border-2 transition-all text-center ${
              selected === template.id
                ? 'border-gray-700 bg-gray-50 shadow-md ring-2 ring-gray-700 ring-offset-2'
                : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
            }`}
          >
            <div className="w-full h-12 bg-gray-100 rounded mb-2 flex items-center justify-center text-xs text-gray-400">
              {template.id === 'classic' && 'Sidebar'}
              {template.id === 'modern' && 'Two-Column'}
              {template.id === 'minimal' && 'Single'}
              {template.id === 'professional' && 'Executive'}
              {template.id === 'creative' && 'Creative'}
            </div>
            <div className="font-semibold text-gray-800 text-sm">{template.name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{template.description}</div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;