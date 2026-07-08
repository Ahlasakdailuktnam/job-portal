// components/jobs/JobPagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JobPagination = ({ pagination, currentPage, onPageChange }) => {
  if (!pagination || pagination.lastPage <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const { lastPage } = pagination;
    const maxVisible = 5;

    if (lastPage <= maxVisible) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(lastPage);
    } else if (currentPage >= lastPage - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = lastPage - 4; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(lastPage);
    }

    return pages;
  };

  return (
    <div className="px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="text-sm text-gray-500">
        បង្ហាញ{' '}
        <span className="font-medium text-gray-700">
          {pagination.from || 0}
        </span>{' '}
        ដល់{' '}
        <span className="font-medium text-gray-700">
          {pagination.to || 0}
        </span>{' '}
        នៃ{' '}
        <span className="font-medium text-gray-700">
          {pagination.total}
        </span>
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          មុន
        </button>
        <div className="flex items-center gap-1">
          {renderPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="text-gray-400 px-1">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 text-sm rounded transition-colors ${
                  page === currentPage
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pagination.lastPage}
          className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          បន្ទាប់
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default JobPagination;