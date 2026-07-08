// components/job/create/BasicInfoStep.jsx
import React from "react";

const BasicInfoStep = ({
  formData,
  errors,
  categories = [],
  onChange,
  onNext,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="space-y-8">
        {/* Category Selection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              ជ្រើសរើសប្រភេទការងារ <span className="text-red-500">*</span>
            </label>
            {formData.category_id && (
              <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                ✓ បានជ្រើសរើស
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.isArray(categories) &&
              categories.map((category) => {
                const isSelected = formData.category_id === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => {
                      const event = {
                        target: {
                          name: "category_id",
                          value: category.id,
                        },
                      };
                      onChange(event);
                    }}
                    className={`
                      group relative flex flex-col items-center justify-center p-5 rounded-2xl 
                      transition-all duration-300 transform hover:scale-105
                      ${
                        isSelected
                          ? "bg-gradient-to-br from-gray-900 to-gray-700 shadow-lg ring-2 ring-gray-800 ring-offset-2"
                          : "bg-white border-2 border-gray-200 hover:border-gray-400 hover:shadow-md"
                      }
                      ${errors.category_id ? "border-red-500" : ""}
                    `}
                  >
                    {/* Selection checkmark */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}

                    {/* Icon Container */}
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-3
                      transition-all duration-300
                      ${isSelected 
                        ? "bg-gray-700 backdrop-blur-sm" 
                        : "bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100"
                      }
                    `}>
                      <img
                        src={category.icon_url}
                        alt={category.name}
                        className={`
                          w-7 h-7 object-contain transition-all duration-300
                          ${isSelected ? "brightness-0 invert" : "group-hover:scale-110"}
                        `}
                      />
                    </div>

                  
                    <span className={`
                      text-sm font-medium text-center transition-all duration-300
                      ${isSelected ? "text-white" : "text-gray-700 group-hover:text-gray-900"}
                    `}>
                      {category.name}
                    </span>
                  </button>
                );
              })}
          </div>

          {errors.category_id && (
            <p className="mt-3 text-sm text-red-500 flex items-center gap-1">
              <span>⚠️</span> {errors.category_id[0]}
            </p>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ចំណងជើងការងារ <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="text"
              name="title"
              placeholder="បញ្ចូលចំណងជើងការងារ..."
              value={formData.title}
              onChange={onChange}
              className={`
                w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2
                ${errors.title ? "border-red-500" : "border-gray-200 focus:border-gray-800"}
                rounded-2xl focus:ring-0 focus:bg-white transition-all duration-200 outline-none
                placeholder:text-gray-400
              `}
            />
          </div>
          {errors.title && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <span>⚠️</span> {errors.title[0]}
            </p>
          )}
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            ការពណ៌នា <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              name="description"
              placeholder="សរសេរការពណ៌នាអំពីការងារលម្អិត..."
              value={formData.description}
              onChange={onChange}
              rows={5}
              className={`
                w-full px-4 py-3.5 bg-gray-50 border-2
                ${errors.description ? "border-red-500" : "border-gray-200 focus:border-gray-800"}
                rounded-2xl focus:ring-0 focus:bg-white transition-all duration-200 outline-none resize-none
                placeholder:text-gray-400
              `}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formData.description?.length || 0} characters
            </div>
          </div>
          {errors.description && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              <span>⚠️</span> {errors.description[0]}
            </p>
          )}
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onNext}
            className="
              group px-10 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 
              hover:from-gray-900 hover:to-black text-white rounded-2xl 
              transition-all duration-300 font-medium shadow-lg hover:shadow-xl 
              flex items-center gap-2
            "
          >
            <span>បន្ត</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;