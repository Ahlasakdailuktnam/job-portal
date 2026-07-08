import React, { useState } from "react";
import { createCategory } from "../../../api/job/jobcategory";
import SuccessModal from "../../../components/modals/SuccessModal";
import { useNavigate } from "react-router-dom";
import { Loader2, TicketSlash, TicketSlashIcon, TicketX } from "lucide-react";

const CategoryAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    icon: null,
  });
  const [showsucess, setShowsucess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("icon", formData.icon);

      const res = await createCategory(data);
      if (res.success) {
        setShowsucess(true);
        setFormData({
          name: "",
          icon: null,
        });
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              បង្កើតប្រភេទការងារថ្មី
            </h2>
            <p className="text-sm text-gray-500">
              បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតប្រភេទថ្មី
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ឈ្មោះប្រភេទការងារ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="ឧ. បច្ចេកវិទ្យាព័ត៌មាន"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-700/20 focus:border-gray-700 transition-all duration-200"
            required
          />
          <p className="mt-1 text-xs text-gray-400">
            ឈ្មោះប្រភេទត្រូវមានយ៉ាងតិច ២ តួអក្សរ
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            រូបតំណាង <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".svg,image/svg+xml"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  icon: e.target.files[0],
                })
              }
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-700 file:text-white hover:file:bg-gray-800 transition-colors duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-gray-700/20 focus:border-gray-700"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            ទ្រង់ទ្រាយ SVG តែប៉ុណ្ណោះ
          </p>
        </div>

        {formData.icon && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  រូបតំណាងដែលបានជ្រើស
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formData.icon.name}
                </p>
              </div>
              <div className="w-14 h-14 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                <object
                  data={URL.createObjectURL(formData.icon)}
                  type="image/svg+xml"
                  width="36"
                  height="36"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                កំពុងបញ្ចូលទិន្នន័យ...
              </>
            ) : (
              <>
                <TicketSlash />
                បង្កើតប្រភេទ
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({ name: "", icon: null });
            }}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
          >
            បោះបង់
          </button>
        </div>
      </form>
      <SuccessModal
        open={showsucess}
        onClose={() => navigate("/admin/category/list")}
        title="បង្កើតប្រភេទការងារជោគជ័យ"
        message="ការបង្កើតប្រភេទការងារត្រូវបានបង្កើតដោយជោគជ័យ។"
      />
    </div>
  );
};

export default CategoryAdd;
