import React from "react";
import { Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotYetLoginMsg = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <Lock size={40} className="text-white" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            សូមចូលគណនីជាមុនសិន
          </h2>

          <p className="mt-3 text-gray-600">
            អ្នកត្រូវតែចូលគណនីជាមុន
            ដើម្បីអាចប្រើប្រាស់មុខងារនេះបាន។
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            ចូលគណនី
          </button>

        </div>
      </div>

    </div>
  );
};

export default NotYetLoginMsg;
