import React from 'react';
import { Link } from 'react-router-dom';
import CVCard from './CVCard';
import { Button, EmptyState, Loading } from '../common';

const CVList = ({ 
  cvs = [], 
  loading = false, 
  error = null, 
  onDelete, 
  onDownload 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading CVs: {error.message}</p>
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <EmptyState
        icon="📄"
        title="No CVs yet"
        description="Create your first CV to get started"
        action={
          <Link to="/cv/create">
            <Button variant="primary">Create CV</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          cv={cv}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
};

export default CVList;