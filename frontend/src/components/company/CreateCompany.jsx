import React, { useState } from "react";
import {
  Building2,
  Upload,
  MapPin,
  Phone,
  Globe,
  X,
  AlertCircle,
} from "lucide-react";
import { createCompany } from "../../api/company/company";
import Swal from "sweetalert2";

export const CreateCompany = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    logo: null,       
    description: "",
    social: "",
    contact_tlg: "",
    address: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logo: "រូបភាពត្រូវតែតូចជាង 5MB",
      }));
      return;
    }

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      setErrors((prev) => ({
        ...prev,
        logo: "សូមជ្រើសរើស JPG, PNG ឬ WEBP",
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreviewLogo(URL.createObjectURL(file));
    setErrors((prev) => ({
      ...prev,
      logo: "",
    }));
  };
  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));
    if (previewLogo) {
      URL.revokeObjectURL(previewLogo);
    }
    setPreviewLogo(null);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.company_name.trim())
      newErrors.company_name = "សូមបញ្ចូលឈ្មោះក្រុមហ៊ុន";
    if (!formData.description.trim())
      newErrors.description = "សូមបញ្ចូលការពណ៌នាអំពីក្រុមហ៊ុន";
    if (!formData.address.trim())
      newErrors.address = "សូមបញ្ចូលអាសយដ្ឋានក្រុមហ៊ុន";
    if (!formData.contact_tlg.trim()) {
      newErrors.contact_tlg = "សូមបញ្ចូលលេខទូរស័ព្ទ";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.contact_tlg)) {
      newErrors.contact_tlg = "សូមបញ្ចូលលេខទូរស័ព្ទឱ្យបានត្រឹមត្រូវ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append(
        "company_name",
        formData.company_name
      );

      payload.append(
        "description",
        formData.description
      );

      payload.append(
        "social",
        formData.social
      );

      payload.append(
        "contact_tlg",
        formData.contact_tlg
      );

      payload.append(
        "address",
        formData.address
      );

      if (formData.logo) {
        payload.append(
          "logo",
          formData.logo
        );
      }

      const res = await createCompany(payload);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "ជោគជ័យ",
          text: res.message || "បង្កើតក្រុមហ៊ុនដោយជោគជ័យ",
        });

        // Reset form
        setFormData({
          company_name: "",
          logo: null,
          description: "",
          social: "",
          contact_tlg: "",
          address: "",
        });
        setPreviewLogo(null);
        setErrors({});

        onSuccess?.();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "បរាជ័យ",
        text: err.response?.data?.message || "Failed to create company",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-700 shadow-lg mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            បង្កើតក្រុមហ៊ុនថ្មី
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្កើតក្រុមហ៊ុនរបស់អ្នក
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8 space-y-8">
              {/* Logo Upload Section */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-400 transition-colors">
                <div className="flex flex-col items-center">
                  {previewLogo ? (
                    <div className="relative">
                      <img
                        src={previewLogo}
                        alt="Logo Preview"
                        className="w-32 h-32 rounded-2xl object-cover border-4 border-indigo-100"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-10 h-10 text-indigo-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium text-indigo-600">
                          ចុចដើម្បីបង្ហោះ
                        </span>{" "}
                        ឬទាញដាក់ទីនេះ
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, WEBP (អតិបរមា 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="mt-4 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 cursor-pointer transition-colors"
                  >
                    {previewLogo ? "ផ្លាស់ប្តូររូបភាព" : "ជ្រើសរើសរូបភាព"}
                  </label>
                  {errors.logo && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.logo}
                    </p>
                  )}
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ឈ្មោះក្រុមហ៊ុន <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="បញ្ចូលឈ្មោះក្រុមហ៊ុន..."
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.company_name ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all`}
                  />
                </div>
                {errors.company_name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.company_name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ការពណ៌នា <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="សូមពណ៌នាអំពីក្រុមហ៊ុនរបស់អ្នក..."
                  className={`w-full px-4 py-3 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all resize-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {formData.description.length} / 500 តួអក្សរ
                </p>
              </div>

              {/* Address & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    អាសយដ្ឋាន <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="បញ្ចូលអាសយដ្ឋាន..."
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    លេខទូរស័ព្ទ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="contact_tlg"
                      value={formData.contact_tlg}
                      onChange={handleChange}
                      placeholder="បញ្ចូលលេខទូរស័ព្ទ..."
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.contact_tlg ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all`}
                    />
                  </div>
                  {errors.contact_tlg && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.contact_tlg}
                    </p>
                  )}
                </div>
              </div>

              {/* Social */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  បណ្តាញសង្គម
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="social"
                    value={formData.social}
                    onChange={handleChange}
                    placeholder="បញ្ចូលតំណភ្ជាប់បណ្តាញសង្គម (ឧទាហរណ៍: https://facebook.com/company)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  អាចបញ្ចូលតំណភ្ជាប់បណ្តាញសង្គមផ្សេងៗបំបែកដោយសញ្ញា comma (,)
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-gray-200 bg-gray-50 px-6 md:px-8 py-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gray-700  text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      កំពុងដំណើរការ...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-5 h-5" />
                      បង្កើតក្រុមហ៊ុន
                    </>
                  )}
                </button>
                <button
                  type="reset"
                  className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  បោះបង់
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-4">
                <span className="text-red-500">*</span> តម្រូវឱ្យបំពេញ
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};