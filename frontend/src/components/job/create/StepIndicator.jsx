import React from 'react';
const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, label: 'មូលដ្ឋាន' },
    { number: 2, label: 'តម្រូវការ' },
    { number: 3, label: 'លម្អិត' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.number}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  currentStep >= step.number ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {step.number < totalSteps && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  currentStep > step.number ? "bg-gray-800" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;