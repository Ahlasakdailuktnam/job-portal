import React from "react";
import {
  TriangleAlert,
  Info,
  CheckCircle,
} from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,

  title = "បញ្ជាក់សកម្មភាព",
  message = "តើអ្នកពិតជាចង់បន្តមែនទេ?",

  confirmText = "យល់ព្រម",
  cancelText = "បោះបង់",

  variant = "danger",
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      button:
        "bg-red-600 hover:bg-red-700",
      Icon: TriangleAlert,
    },

    primary: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      button:
        "bg-blue-600 hover:bg-blue-700",
      Icon: Info,
    },

    success: {
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      button:
        "bg-green-600 hover:bg-green-700",
      Icon: CheckCircle,
    },
  };

  const style =
    variantStyles[variant] ||
    variantStyles.danger;

  const Icon = style.Icon;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 ">
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex flex-col items-center px-6 pt-8">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${style.iconBg}`}
          >
            <Icon
              size={32}
              className={style.iconColor}
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900 text-center">
            {title}
          </h2>

          <p className="mt-2 text-center text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex gap-3 p-6 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 py-3 text-white rounded-xl font-medium transition ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;