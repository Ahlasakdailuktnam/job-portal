import React from "react";
import { CheckCircle2, X } from "lucide-react";

const SuccessModal = ({
  open,
  onClose,
  onConfirm,
  title = "ជោគជ័យ!",
  message = "ប្រតិបត្តិការត្រូវបានបញ្ចប់ដោយជោគជ័យ",
}) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/25 animate-fadeIn">
        <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] animate-slideUp">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <X size={18} strokeWidth={1.5} />
          </button>

          <div className="flex flex-col items-center text-center px-8 pt-12 pb-9">
            {/* Icon */}
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-5">
              <CheckCircle2
                size={120}
                className="text-green-700"
                strokeWidth={1.5}
              />
            </div>

            <h2 className="text-xl font-medium text-gray-800 mb-2">
              {title || "Success!"}
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed">
              {message || "Your action has been completed successfully."}
            </p>

            <button
              onClick={onConfirm || onClose}
              className="mt-7 w-full py-3.5 bg-green-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:bg-green-900"
            >
              យល់ព្រម
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default SuccessModal;
