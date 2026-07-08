// components/job/create/DetailStep.jsx
import React from 'react';

const DetailStep = ({
  formData,
  errors,
  onChange,
  onPrev,
  onPreview,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ប្រាក់ខែអប្បបរមា
            </label>
            <input
              type="number"
              name="salary_min"
              placeholder="0"
              value={formData.salary_min}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.salary_min && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary_min[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ប្រាក់ខែអតិបរមា
            </label>
            <input
              type="number"
              name="salary_max"
              placeholder="0"
              value={formData.salary_max}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.salary_max && (
              <p className="mt-1 text-sm text-red-500">
                {errors.salary_max[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ប្រភេទការងារ <span className="text-red-500">*</span>
            </label>
            <select
              name="job_type"
              value={formData.job_type}
              onChange={onChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.job_type ? "border-red-500" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none`}
            >
              <option value="">ជ្រើសរើសប្រភេទ</option>
              <option value="full_time">ពេញម៉ោង</option>
              <option value="part_time">ក្រៅម៉ោង</option>
              <option value="remote">ពីចម្ងាយ</option>
              <option value="internship">កម្មសិក្សា</option>
              <option value="contract">កិច្ចសន្យា</option>
              <option value="freelance">ឯករាជ្យ</option>
            </select>
            {errors.job_type && (
              <p className="mt-1 text-sm text-red-500">
                {errors.job_type[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              កម្រិតការងារ
            </label>
            <select
              name="job_level"
              value={formData.job_level}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            >
              <option value="">ជ្រើសរើសកម្រិត</option>
              <option value="entry">កម្រិតចូល</option>
              <option value="junior">យុវជន</option>
              <option value="mid">មធ្យម</option>
              <option value="senior">ជាន់ខ្ពស់</option>
              <option value="lead">អ្នកដឹកនាំ</option>
              <option value="manager">អ្នកគ្រប់គ្រង</option>
              <option value="director">នាយក</option>
            </select>
            {errors.job_level && (
              <p className="mt-1 text-sm text-red-500">
                {errors.job_level[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              បទពិសោធន៍
            </label>
            <input
              type="text"
              name="experience"
              placeholder="ឧ. ៣-៥ ឆ្នាំ"
              value={formData.experience}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-500">
                {errors.experience[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              សញ្ញាបត្រ
            </label>
            <input
              type="text"
              name="qualification"
              placeholder="ឧ. បរិញ្ញាបត្រ"
              value={formData.qualification}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.qualification && (
              <p className="mt-1 text-sm text-red-500">
                {errors.qualification[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ចំនួនមុខតំណែង
            </label>
            <input
              type="number"
              name="available_position"
              placeholder="1"
              value={formData.available_position}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.available_position && (
              <p className="mt-1 text-sm text-red-500">
                {errors.available_position[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ភាសា
            </label>
            <input
              type="text"
              name="language"
              placeholder="ឧ. ខ្មែរ, អង់គ្លេស"
              value={formData.language}
              onChange={onChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none"
            />
            {errors.language && (
              <p className="mt-1 text-sm text-red-500">
                {errors.language[0]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ថ្ងៃផុតកំណត់ <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={onChange}
              className={`w-full px-4 py-3 bg-gray-50 border ${
                errors.deadline ? "border-red-500" : "border-gray-200"
              } rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none`}
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-500">
                {errors.deadline[0]}
              </p>
            )}
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-600 font-medium">
              សូមកែតម្រូវកំហុសខាងក្រោម៖
            </p>
            <ul className="mt-1 space-y-0.5">
              {Object.entries(errors).map(([field, messages]) => (
                <li key={field} className="text-sm text-red-500">
                  • {messages[0]}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition duration-200 font-medium"
          >
            ត្រឡប់
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onPreview}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              មើលជាមុន
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  កំពុងបង្កើត...
                </>
              ) : (
                'បង្កើតការងារ'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStep;