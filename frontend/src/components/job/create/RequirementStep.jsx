// components/job/create/RequirementStep.jsx
import React from 'react';

const RequirementStep = ({
  requirements,
  responsibilities,
  errors,
  onRequirementChange,
  onAddRequirement,
  onRemoveRequirement,
  onResponsibilityChange,
  onAddResponsibility,
  onRemoveResponsibility,
  onPrev,
  onNext,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              តម្រូវការ <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={onAddRequirement}
              className="text-sm text-gray-600 hover:text-gray-800 transition duration-200"
            >
              + បន្ថែមតម្រូវការ
            </button>
          </div>

          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400 w-6">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  placeholder={`តម្រូវការ ${index + 1}`}
                  value={req}
                  onChange={(e) => onRequirementChange(index, e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => onRemoveRequirement(index)}
                  className={`p-1.5 text-gray-400 hover:text-red-500 transition duration-200 ${
                    requirements.length <= 1
                      ? "opacity-30 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={requirements.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {errors.requirement && (
            <p className="mt-1 text-sm text-red-500">
              {errors.requirement[0]}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">
              ភារកិច្ច
            </label>
            <button
              type="button"
              onClick={onAddResponsibility}
              className="text-sm text-gray-600 hover:text-gray-800 transition duration-200"
            >
              + បន្ថែមភារកិច្ច
            </button>
          </div>

          <div className="space-y-2">
            {responsibilities.map((resp, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400 w-6">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  placeholder={`ភារកិច្ច ${index + 1}`}
                  value={resp}
                  onChange={(e) => onResponsibilityChange(index, e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => onRemoveResponsibility(index)}
                  className={`p-1.5 text-gray-400 hover:text-red-500 transition duration-200 ${
                    responsibilities.length <= 1
                      ? "opacity-30 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={responsibilities.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          {errors.responsibility && (
            <p className="mt-1 text-sm text-red-500">
              {errors.responsibility[0]}
            </p>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onPrev}
            className="px-8 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition duration-200 font-medium"
          >
            ត្រឡប់
          </button>
          <button
            type="button"
            onClick={onNext}
            className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl transition duration-200 font-medium shadow-sm hover:shadow-md"
          >
            បន្ត
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequirementStep;