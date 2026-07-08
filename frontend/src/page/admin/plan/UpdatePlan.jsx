import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApiState } from "../../../hook/useApiSate";
import { getPlanById, updatePlan } from "../../../api/plan/plan";
import Loading from "../../../components/common/Loading";
import SuccessModal from "../../../components/modals/SuccessModal";

const UpdatePlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, setLoading, error, setError } = useApiState();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    job_limit: "",
    featured_job: "",
    cv_access: "",
    duration_days: "",
    status: true,
  });

  const fetchPlan = async () => {
    setLoading(true);
    try {
      const res = await getPlanById(id);
      setFormData({
        name: res.data.name || "",
        price: res.data.price || "",
        job_limit: res.data.job_limit || "",
        featured_job: res.data.featured_job || "",
        cv_access: res.data.cv_access || "",
        duration_days: res.data.duration_days || "",
        status: res.data.status ?? true,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updatePlan(id, formData);
      setShowSuccess(true);
    
    } catch (err) {
      console.error(err);
      setError("Failed to update plan");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/plans")}
              className="p-2 hover:bg-white rounded-xl transition shadow-sm"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">កែប្រែកញ្ចប់សេវាកម្ម</h1>
              <p className="text-sm text-gray-400 mt-0.5">កែប្រែព័ត៌មានកញ្ចប់សេវាកម្មដែលមានស្រាប់</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-gray-200 rounded-lg text-xs font-medium text-gray-600">
            ID: #{id}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700">ព័ត៌មានទូទៅ</h3>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ឈ្មោះកញ្ចប់សេវាកម្ម <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                  placeholder="បញ្ចូលឈ្មោះកញ្ចប់សេវាកម្ម"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    តម្លៃ (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    រយៈពេល (ថ្ងៃ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration_days"
                    value={formData.duration_days}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                    placeholder="ចំនួនថ្ងៃ"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ចំនួនការងារ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="job_limit"
                    value={formData.job_limit}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                    placeholder="ចំនួន"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ការងារពិសេស <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="featured_job"
                    value={formData.featured_job}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                    placeholder="ចំនួន"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ចំនួនមើល CV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="cv_access"
                    value={formData.cv_access}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-600 focus:border-transparent outline-none transition bg-gray-50/50 focus:bg-white"
                    placeholder="ចំនួន"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                      className="w-5 h-5 text-gray-700 border-gray-300 rounded focus:ring-gray-600"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition">
                    {formData.status ? "កញ្ចប់សេវាកម្មសកម្ម" : "កញ្ចប់សេវាកម្មអសកម្ម"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-3 px-6 bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-800 transition-all ${
                  submitting ? "opacity-60 cursor-not-allowed" : "hover:shadow-md"
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    កំពុងរក្សាទុក...
                  </span>
                ) : (
                  "រក្សាទុកការកែប្រែ"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/plan/list")}
                className="px-8 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                បោះបង់
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessModal
        open={showSuccess}
        onClose={() => navigate("/admin/plan/list")}
        title="កែប្រែជោគជ័យ"
        message="កញ្ចប់សេវាកម្មត្រូវបានកែប្រែដោយជោគជ័យ។"
      />
    </div>
  );
};

export default UpdatePlan;