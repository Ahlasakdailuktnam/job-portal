import React, { useEffect, useMemo, useState } from "react";
import {
  Building,
  Edit,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { deleteCompany, updateCompany } from "../../api/company/company";

const storageUrl = (path) =>
  path ? `http://localhost:8000/storage/${path}` : null;

export const Company = ({ company: initialCompany, onDeleted }) => {
  const [company, setCompany] = useState(initialCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [formData, setFormData] = useState({
    company_name: "",
    description: "",
    social: "",
    contact_tlg: "",
    address: "",
    logo: null,
  });

  useEffect(() => {
    setCompany(initialCompany);
  }, [initialCompany]);

  useEffect(() => {
    if (company) {
      setFormData({
        company_name: company.company_name || "",
        description: company.description || "",
        social: company.social || "",
        contact_tlg: company.contact_tlg || "",
        address: company.address || "",
        logo: null,
      });
    }
  }, [company]);

  const user = company?.user || {};
  const logoUrl = useMemo(
    () => logoPreview || storageUrl(company?.logo),
    [company?.logo, logoPreview],
  );

  if (!company) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, logo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    payload.append("company_name", formData.company_name);
    payload.append("description", formData.description);
    payload.append("social", formData.social);
    payload.append("contact_tlg", formData.contact_tlg);
    payload.append("address", formData.address);

    if (formData.logo) {
      payload.append("logo", formData.logo);
    }

    try {
      setIsSaving(true);
      const response = await updateCompany(company.id, payload);
      setCompany(response.data);
      setIsEditing(false);
      setLogoPreview(null);
      toast.success(response.message || "Company updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update company");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this company profile?")) return;

    try {
      setIsDeleting(true);
      const response = await deleteCompany(company.id);
      toast.success(response.message || "Company deleted");
      onDeleted?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to delete company");
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setLogoPreview(null);
    setFormData({
      company_name: company.company_name || "",
      description: company.description || "",
      social: company.social || "",
      contact_tlg: company.contact_tlg || "",
      address: company.address || "",
      logo: null,
    });
  };

  return (
    <div className="min-h-screen px-4 md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div className="flex gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-2xl font-bold text-gray-600">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={company.company_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  company.company_name?.charAt(0) || "C"
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {company.company_name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Managed by {user.name || "Recruiter"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-500">
                  {user.email && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                      <Mail size={14} />
                      {user.email}
                    </span>
                  )}
                  {company.address && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                      <MapPin size={14} />
                      {company.address}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                <Trash2 size={16} />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Edit company profile</h2>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Company name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                icon={Building}
                required
              />
              <InputField
                label="Telegram / phone"
                name="contact_tlg"
                value={formData.contact_tlg}
                onChange={handleChange}
                icon={Phone}
              />
              <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                icon={MapPin}
              />
              <InputField
                label="Social link"
                name="social"
                value={formData.social}
                onChange={handleChange}
                icon={Globe}
              />
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-gray-700"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Logo
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  <Upload size={16} />
                  Choose logo
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
              >
                <Save size={16} />
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            <section className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
              <h2 className="mb-3 font-bold text-gray-900">
                About {company.company_name}
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                {company.description || "No description available"}
              </p>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                <User size={18} />
                Company details
              </h2>
              <div className="space-y-3">
                <DetailLine label="Contact" value={company.contact_tlg} />
                <DetailLine label="Address" value={company.address} />
                <DetailLine label="Owner" value={user.name} />
                <DetailLine label="Email" value={user.email} />
                {company.social && (
                  <a
                    href={company.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <Globe size={15} />
                    Visit social link
                  </a>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        {...props}
        className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-gray-700"
      />
    </div>
  </div>
);

const DetailLine = ({ label, value }) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="text-right font-medium text-gray-900">
      {value || "Not provided"}
    </span>
  </div>
);
