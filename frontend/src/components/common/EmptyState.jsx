import React from 'react';

const EmptyState = ({ 
  icon = null, 
  title = 'No items found', 
  description = '', 
  action = null 
}) => {
  return (
    <div className="text-center py-12">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;