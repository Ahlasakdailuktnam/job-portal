import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../api/job/jobcategory";
import Loading from "../../../components/common/Loading";
import SuccessModal from "../../../components/modals/SuccessModal";
import { ArrowLeft, Edit2, Loader2, Pencil, Upload, X } from "lucide-react";

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showsucess, setShowsucess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: null,
  });
  const [preview, setPreview] = useState("");

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await getCategoryById(id);

      setFormData({
        name: res.data.name,
        icon: null,
      });

      setPreview(res.data.icon_url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);

      if (formData.icon) {
        data.append("icon", formData.icon);
      }

      await updateCategory(id, data);
      setShowsucess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/admin/category/list")}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 mb-4 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm font-medium">ត្រឡប់ក្រោយ</span>
        </button>

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(0,0,0,0.08)] border border-gray-100/80 overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-600/20 via-gray-800/40 to-gray-600/20" />
            <div className="px-8 pt-8 pb-6 border-b border-gray-100/80">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                    កែប្រែប្រភេទ
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    កែប្រែព័ត៌មាន និងរូបតំណាងប្រភេទ
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Pencil size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ឈ្មោះប្រភេទ
                <span className="text-gray-300 ml-1">*</span>
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
                placeholder="បញ្ចូលឈ្មោះប្រភេទ..."
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800/10 focus:border-gray-400 transition-all duration-200 text-gray-700 placeholder:text-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                រូបតំណាងប្រភេទ
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="relative">
                    <input
                      type="file"
                      accept=".svg,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setFormData({
                            ...formData,
                            icon: file,
                          });
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                    <div className="w-full px-4 py-3 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-3 text-gray-400 hover:text-gray-600">
                      <Upload size={18} />
                      <span className="text-sm">ជ្រើសរើសរូបតំណាង</span>
                    </div>
                  </div>
                </label>

                {preview && (
                  <div className="relative group">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-20 h-20 object-contain border-2 border-gray-200 rounded-xl p-2 bg-gray-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setFormData({
                          ...formData,
                          icon: null,
                        });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-50 border border-red-200 rounded-full flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-all duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                គាំទ្រទ្រង់ទ្រាយ SVG, PNG, JPG
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100/80">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-medium py-3.5 px-6 rounded-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-gray-700 transition-all duration-200"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    កំពុងកែប្រែទិន្នន័យ...
                  </>
                ) : (
                  <>
                    <Edit2 size={20} />
                    កែប្រែប្រភេទ
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/category/list")}
                className="px-6 py-3.5 border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700 font-medium rounded-xl transition-all duration-200 hover:bg-gray-50"
              >
                បោះបង់
              </button>
            </div>
          </form>
        </div>
         
        <SuccessModal
          open={showsucess}
          onClose={() => navigate("/admin/category/list")}
          title="កែប្រែជោគជ័យ"
          message="ព័ត៌មានប្រភេទការងារត្រូវបានកែប្រែដោយជោគជ័យ។"
        />
      </div>
    </div>
  );
};

export default CategoryEdit;