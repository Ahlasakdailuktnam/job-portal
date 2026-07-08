import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../common';

const CVCard = ({ cv, onDelete, onDownload }) => {
  return (
    <Card
      title={cv.title || 'Untitled CV'}
      actions={
        <>
          <Link to={`/cv/${cv.id}/edit`}>
            <Button variant="secondary" size="sm">Edit</Button>
          </Link>
          <Button variant="primary" size="sm" onClick={() => onDownload(cv.id)}>
            Download
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(cv.id)}>
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-2">
        {cv.personal?.full_name && (
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> {cv.personal.full_name}
          </p>
        )}
        {cv.personal?.email && (
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {cv.personal.email}
          </p>
        )}
        <p className="text-sm text-gray-500">
          Updated: {new Date(cv.updated_at).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
};

export default CVCard;