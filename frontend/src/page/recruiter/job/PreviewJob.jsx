import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createJob,
  getMyJobById,
  updateJob,
  deleteJob,
} from "../../../api/job/job";
import LogoutModal from "../../../components/modals/LogoutModal";
import SuccessModal from "../../../components/modals/SuccessModal";

const PreviewJob = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    if (id) {
      fetchJobData(id);
    } else if (location.state) {
      setFormData(location.state);
      setOriginalData(location.state);
      setFetchLoading(false);
    } else {
      setFetchLoading(false);
      setError("មិនមានទិន្នន័យសម្រាប់មើលជាមុន");
    }
  }, [id, location.state]);

  const fetchJobData = async (jobId) => {
    try {
      setFetchLoading(true);
      setError(null);
      const response = await getMyJobById(jobId);

      if (response.success) {
        setFormData(response.data);
        setOriginalData(response.data);
      } else {
        setError("មិនអាចទាញយកទិន្នន័យការងារបានទេ");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
      setError("មានបញ្ហាក្នុងការទាញយកទិន្នន័យ");
    } finally {
      setFetchLoading(false);
    }
  };

  const showModal = (type, title, message, onConfirm = null) => {
    setModalConfig({
      isOpen: true,
      type,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      type: null,
      title: "",
      message: "",
      onConfirm: null,
    });
  };

  const handleModalConfirm = () => {
    closeModal();

    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(originalData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        status: "draft",
        requirement: formData.requirement || "",
        responsibility: formData.responsibility || "",
      };

      let response;
      if (id) {
        response = await updateJob(id, payload);
      } else {
        response = await createJob(payload);
      }

      if (response.success) {
        setIsEditing(false);
        if (response.data) {
          setFormData(response.data);
          setOriginalData(response.data);
        }

        showModal(
          "success",
          "ជោគជ័យ!",
          "រក្សាទុកជាសេចក្តីព្រាងដោយជោគជ័យ",
          () => {
            navigate("/recruiter/jobs/list");
          },
        );
      }
    } catch (error) {
      if (error.response?.status === 422) {
        showModal("error", "កំហុស", "សូមពិនិត្យមើលទិន្នន័យដែលបានបញ្ចូល");
      } else if (error.response?.status === 403) {
        showModal("error", "កំហុស", error.response.data.message);
      } else {
        showModal("error", "កំហុស", "មានបញ្ហាក្នុងការរក្សាទុក");
      }
      console.error("Save draft error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForApproval = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        status: "pending",
        requirement: formData.requirement || "",
        responsibility: formData.responsibility || "",
      };

      let response;
      if (id) {
        response = await updateJob(id, payload);
      } else {
        response = await createJob(payload);
      }

      if (response.success) {
        setIsEditing(false);
        if (response.data) {
          setFormData(response.data);
          setOriginalData(response.data);
        }

        showModal("success", "ជោគជ័យ!", "ដាក់ស្នើសុំអនុម័តដោយជោគជ័យ", () => {
          navigate("/recruiter/jobs/list");
        });
      }
    } catch (error) {
      if (error.response?.status === 422) {
        showModal("error", "កំហុស", "សូមពិនិត្យមើលទិន្នន័យដែលបានបញ្ចូល");
      } else if (error.response?.status === 403) {
        showModal("error", "កំហុស", error.response.data.message);
      } else {
        showModal("error", "កំហុស", "មានបញ្ហាក្នុងការដាក់ស្នើ");
      }
      console.error("Submit for approval error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) {
      showModal("error", "កំហុស", "មិនអាចលុបការងារដែលមិនទាន់រក្សាទុកបានទេ");
      return;
    }

    showModal(
      "warning",
      "បញ្ជាក់ការលុប",
      "តើអ្នកពិតជាចង់លុបការងារនេះមែនទេ?",
      async () => {
        try {
          setLoading(true);
          const response = await deleteJob(id);

          if (response.success) {
            showModal("success", "ជោគជ័យ!", "លុបការងារដោយជោគជ័យ", () => {
              navigate("/recruiter/jobs/list");
            });
          }
        } catch (error) {
          showModal("error", "កំហុស", "មានបញ្ហាក្នុងការលុបការងារ");
          console.error("Delete error:", error);
        } finally {
          setLoading(false);
        }
      },
    );
  };

  const getJobTypeLabel = (type) => {
    const types = {
      full_time: "ពេញម៉ោង",
      part_time: "ក្រៅម៉ោង",
      remote: "ពីចម្ងាយ",
      internship: "កម្មសិក្សា",
      contract: "កិច្ចសន្យា",
      freelance: "ឯករាជ្យ",
    };
    return types[type] || type;
  };

  const getJobLevelLabel = (level) => {
    const levels = {
      entry: "កម្រិតចូល",
      junior: "យុវជន",
      mid: "មធ្យម",
      senior: "ជាន់ខ្ពស់",
      lead: "អ្នកដឹកនាំ",
      manager: "អ្នកគ្រប់គ្រង",
      director: "នាយក",
    };
    return levels[level] || level;
  };

  const renderModal = () => {
    if (!modalConfig.isOpen) return null;

    if (modalConfig.type === "success") {
      return (
        <SuccessModal
          open={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={handleModalConfirm}
          title={modalConfig.title}
          message={modalConfig.message}
        />
      );
    }

    if (modalConfig.type === "warning" || modalConfig.type === "error") {
      return (
        <LogoutModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={
            modalConfig.type === "warning" ? handleModalConfirm : closeModal
          }
          title={modalConfig.title}
          message={modalConfig.message}
        />
      );
    }

    return null;
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">កំពុងផ្ទុកទិន្នន័យ...</p>
        </div>
      </div>
    );
  }

  if (!formData || error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {error || "មិនមានទិន្នន័យ"}
          </h2>
          <p className="text-gray-500">សូមត្រឡប់ទៅបង្កើតការងារវិញ</p>
          <button
            onClick={() => navigate("/recruiter/jobs/create")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ត្រឡប់ទៅបង្កើតការងារ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {renderModal()}

      <div className="max-w-4xl mx-auto px-4">
        {/* Status Badge */}
        {id && (
          <div className="mb-4 flex justify-end">
            <span
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                formData.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : formData.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : formData.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
              }`}
            >
              ស្ថានភាព:{" "}
              {formData.status === "draft"
                ? "សេចក្តីព្រាង"
                : formData.status === "pending"
                  ? "កំពុងរង់ចាំអនុម័ត"
                  : formData.status === "approved"
                    ? "បានអនុម័ត"
                    : formData.status === "rejected"
                      ? "មិនបានអនុម័ត"
                      : formData.status || "មិនមាន"}
            </span>
          </div>
        )}

        {/* Job Detail Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleInputChange}
                className="text-2xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="ចំណងជើងការងារ"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.title}
              </h1>
            )}
          </div>

          {/* Job Details */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ប្រភេទការងារ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="category_id"
                    value={formData.category_id || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                    placeholder="ប្រភេទ"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.category_id || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ប្រភេទការងារ
                </label>
                {isEditing ? (
                  <select
                    name="job_type"
                    value={formData.job_type || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                  >
                    <option value="">ជ្រើសរើស</option>
                    <option value="full_time">ពេញម៉ោង</option>
                    <option value="part_time">ក្រៅម៉ោង</option>
                    <option value="remote">ពីចម្ងាយ</option>
                    <option value="internship">កម្មសិក្សា</option>
                    <option value="contract">កិច្ចសន្យា</option>
                    <option value="freelance">ឯករាជ្យ</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">
                    {getJobTypeLabel(formData.job_type) || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  កម្រិត
                </label>
                {isEditing ? (
                  <select
                    name="job_level"
                    value={formData.job_level || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                  >
                    <option value="">ជ្រើសរើស</option>
                    <option value="entry">កម្រិតចូល</option>
                    <option value="junior">យុវជន</option>
                    <option value="mid">មធ្យម</option>
                    <option value="senior">ជាន់ខ្ពស់</option>
                    <option value="lead">អ្នកដឹកនាំ</option>
                    <option value="manager">អ្នកគ្រប់គ្រង</option>
                    <option value="director">នាយក</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">
                    {getJobLevelLabel(formData.job_level) || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  បទពិសោធន៍
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                    placeholder="ឧ. ៣-៥ ឆ្នាំ"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.experience || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  សញ្ញាបត្រ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                    placeholder="ឧ. បរិញ្ញាបត្រ"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.qualification || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ភាសា
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="language"
                    value={formData.language || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                    placeholder="ឧ. ខ្មែរ, អង់គ្លេស"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.language || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ចំនួនមុខតំណែង
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="available_position"
                    value={formData.available_position || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                    placeholder="1"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.available_position || "—"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ថ្ងៃផុតកំណត់
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.deadline
                      ? new Date(formData.deadline).toLocaleDateString()
                      : "—"}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                  ជួរប្រាក់ខែ
                </label>
                {isEditing ? (
                  <div className="flex gap-3">
                    <input
                      type="number"
                      name="salary_min"
                      value={formData.salary_min || ""}
                      onChange={handleInputChange}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                      placeholder="អប្បបរមា"
                    />
                    <input
                      type="number"
                      name="salary_max"
                      value={formData.salary_max || ""}
                      onChange={handleInputChange}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm"
                      placeholder="អតិបរមា"
                    />
                  </div>
                ) : (
                  <p className="text-gray-800 font-medium">
                    {formData.salary_min && formData.salary_max
                      ? `$${Number(formData.salary_min).toLocaleString()} - $${Number(formData.salary_max).toLocaleString()}`
                      : "—"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              ការពណ៌នា
            </h3>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="សរសេរការពណ៌នា..."
              />
            ) : (
              <p className="text-gray-600 whitespace-pre-wrap">
                {formData.description || "—"}
              </p>
            )}
          </div>

          {/* Requirements */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              តម្រូវការ
            </h3>
            {isEditing ? (
              <textarea
                name="requirement"
                value={formData.requirement || ""}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="បញ្ចូលតម្រូវការនីមួយៗក្នុងបន្ទាត់ថ្មី"
              />
            ) : (
              <ul className="space-y-1">
                {formData.requirement
                  ?.split("\n")
                  .filter((item) => item.trim())
                  .map((req, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-blue-500">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Responsibilities */}
          <div className="px-8 py-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              ភារកិច្ច
            </h3>
            {isEditing ? (
              <textarea
                name="responsibility"
                value={formData.responsibility || ""}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="បញ្ចូលភារកិច្ចនីមួយៗក្នុងបន្ទាត់ថ្មី"
              />
            ) : (
              <ul className="space-y-1">
                {formData.responsibility
                  ?.split("\n")
                  .filter((item) => item.trim())
                  .map((resp, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-green-500">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={() => navigate("/recruiter/jobs/create")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                ត្រឡប់
              </button>

              {id && (
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? "កំពុងលុប..." : "លុប"}
                </button>
              )}

              {isEditing ? (
                <button
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                >
                  បោះបង់
                </button>
              ) : (
                <button
                  onClick={handleEditToggle}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                >
                  កែសម្រួល
                </button>
              )}

              <button
                onClick={handleSaveDraft}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
              >
                {loading ? "កំពុងរក្សាទុក..." : "រក្សាទុកជាសេចក្តីព្រាង"}
              </button>

              <button
                onClick={handleSubmitForApproval}
                disabled={loading}
                className={`px-6 py-2 text-white rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "កំពុងដាក់ស្នើ..." : "ដាក់ស្នើសុំអនុម័ត"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewJob;
