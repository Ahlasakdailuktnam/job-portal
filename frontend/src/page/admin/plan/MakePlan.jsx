import React, { useState } from "react";
import { makePlan } from "../../../api/plan/plan";
import SuccessModal from "../../../components/modals/SuccessModal";
import { useNavigate } from "react-router-dom";

const MakePlan = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    job_limit: "",
    featured_job: "",
    cv_access: "",
    duration_days: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate= useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("job_limit", formData.job_limit);
      data.append("featured_job", formData.featured_job);
      data.append("cv_access", formData.cv_access);
      data.append("duration_days", formData.duration_days);

      const res = await makePlan(data);
      if (res.success) {
        setShowSuccess(true);
        setFormData({
          name: "",
          price: "",
          job_limit: "",
          featured_job: "",
          cv_access: "",
          duration_days: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-700">
              បង្កើតកញ្ចប់សេវាកម្ម
            </h1>
            <p className="text-gray-500 mt-1">
              បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតកញ្ចប់សេវាកម្មថ្មី
            </p>
          </div>
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  ព័ត៌មានទូទៅ
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    ឈ្មោះកញ្ចប់សេវាកម្ម <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                    placeholder="បញ្ចូលឈ្មោះកញ្ចប់សេវាកម្ម"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      តម្លៃ (ដុល្លារ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                      placeholder="0.00"
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
                      required
                      min="1"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                      placeholder="បញ្ចូលចំនួនថ្ងៃ"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    សិទ្ធិប្រើប្រាស់
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        ចំនួនការងារ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="job_limit"
                        value={formData.job_limit}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                        placeholder="ចំនួន"
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
                        required
                        min="0"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                        placeholder="ចំនួន"
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
                        required
                        min="0"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-700 focus:border-transparent focus:bg-white outline-none transition-all"
                        placeholder="ចំនួន"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-6 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all ${
                      loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        កំពុងបង្កើត...
                      </span>
                    ) : (
                      "បង្កើតកញ្ចប់សេវាកម្ម"
                    )}
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      setFormData({
                        name: "",
                        price: "",
                        job_limit: "",
                        featured_job: "",
                        cv_access: "",
                        duration_days: "",
                      });
                      setErrors({});
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all"
                  >
                    កំណត់ឡើងវិញ
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">
                  ព័ត៌មានបន្ថែម
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">ចំណាំ</p>
                    <p className="text-sm text-gray-500">
                      ត្រូវបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      ស្ថានភាព
                    </p>
                    <p className="text-sm text-gray-500">
                      កញ្ចប់សេវាកម្មនឹងបង្ហាញភ្លាមៗ
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 text-center">
                    គ្រប់កន្លែងដែលមាន <span className="text-red-500">*</span>{" "}
                    ត្រូវតែបំពេញ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SuccessModal
          open={showSuccess}
          onClose={() => navigate("/admin/plan/list")}
          title="បង្កើតដោយជោគជ័យ"
          message="កញ្ចប់សេវាកម្មរបស់អ្នកត្រូវបានបង្កើតដោយជោគជ័យ។"
        />
      </div>
    </div>
  );
};

export default MakePlan;
