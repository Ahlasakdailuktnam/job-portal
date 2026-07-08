import React from "react";
import { TriangleAlert } from "lucide-react";

const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "ជោគជ័យ!",
  message = "ប្រតិបត្តិការត្រូវបានបញ្ចប់ដោយជោគជ័យ",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/45 ">
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        <div className="flex flex-col items-center px-6 pt-8">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <TriangleAlert
              size={32}
              className="text-red-600"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
             {title || " បញ្ជាក់ការចាកចេញ"}
          </h2>

          <p className="mt-2 text-center text-gray-500 leading-relaxed">
              {message || "  តើអ្នកពិតជាចង់ចាកចេញពីគណនីនេះមែនទេ?"}
            {/* <br />
            អ្នកនឹងត្រូវចូលគណនីម្ដងទៀត ដើម្បីប្រើប្រាស់ប្រព័ន្ធ។ */}
          </p>
        </div>

        <div className="flex gap-3 p-6 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            បោះបង់
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
          >
            យល់ព្រម
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;