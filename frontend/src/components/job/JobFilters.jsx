// components/jobs/JobFilters.jsx
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const JobFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClearFilters,
  categories = [],
  isSearching = false,
  showCategoryFilter = true,
  showStatusFilter = true,
  statusOptions = [
    { value: 'active', label: 'សកម្ម' },
    { value: 'near_expired', label: 'ជិតផុតកំណត់' },
    { value: 'expired', label: 'ផុតកំណត់' },
  ],
  role = 'public', // 'admin' or 'public'
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = Object.values(filters).some(
    (val) => val !== '' && val !== filters.keyword
  );

  const hasAnyFilters = Object.values(filters).some((val) => val !== '');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            name="keyword"
            placeholder="ស្វែងរកការងារ..."
            value={filters.keyword}
            onChange={onFilterChange}
            className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm transition-shadow duration-200"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          {isSearching && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-700"></div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            ស្វែងរក
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            តម្រង
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                {Object.values(filters).filter(
                  (val) => val !== '' && val !== filters.keyword
                ).length}
              </span>
            )}
          </button>
          {hasAnyFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              លុប
            </button>
          )}
        </div>
      </form>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                ប្រភេទការងារ
              </label>
              <select
                name="job_type"
                value={filters.job_type || ''}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
              >
                <option value="">ទាំងអស់</option>
                <option value="full_time">ពេញម៉ោង</option>
                <option value="part_time">ក្រៅម៉ោង</option>
                <option value="remote">ពីចម្ងាយ</option>
                <option value="internship">កម្មសិក្សា</option>
                <option value="contract">កិច្ចសន្យា</option>
                <option value="freelance">ឯករាជ្យ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                កម្រិតការងារ
              </label>
              <select
                name="job_level"
                value={filters.job_level || ''}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
              >
                <option value="">ទាំងអស់</option>
                <option value="entry">កម្រិតចូល</option>
                <option value="junior">ជុនីយ័រ</option>
                <option value="senior">សេនីយ័រ</option>
                <option value="lead">អ្នកដឹកនាំ</option>
                <option value="manager">អ្នកគ្រប់គ្រង</option>
                <option value="executive">នាយកប្រតិបត្តិ</option>
              </select>
            </div>

            {showCategoryFilter && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  ប្រភេទ
                </label>
                <select
                  name="category"
                  value={filters.category || ''}
                  onChange={onFilterChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
                >
                  <option value="">ទាំងអស់</option>
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>មិនមានប្រភេទ</option>
                  )}
                </select>
              </div>
            )}

            {showStatusFilter && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  ស្ថានភាព
                </label>
                <select
                  name="status"
                  value={filters.status || ''}
                  onChange={onFilterChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
                >
                  <option value="">ទាំងអស់</option>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                ប្រាក់ខែអប្បបរមា
              </label>
              <input
                type="number"
                name="salary_min"
                placeholder="0"
                value={filters.salary_min || ''}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                ប្រាក់ខែអតិបរមា
              </label>
              <input
                type="number"
                name="salary_max"
                placeholder="0"
                value={filters.salary_max || ''}
                onChange={onFilterChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent outline-none text-sm"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => {
                  setShowFilters(false);
                  onSearch(new Event('submit'));
                }}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                អនុវត្តតម្រង
              </button>
              <button
                onClick={onClearFilters}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;