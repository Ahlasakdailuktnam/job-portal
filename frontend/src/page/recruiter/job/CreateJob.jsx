// pages/jobs/CreateJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../../hook/useCategories";
import { useCreateJob } from "../../../hook/useCreateJob";
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateAllSteps,
} from "../../../util/validateJob";
import StepIndicator from "../../../components/job/create/StepIndicator";
import BasicInfoStep from "../../../components/job/create/BasicInfoStep";
import RequirementStep from "../../../components/job/create/RequirementStep";
import DetailStep from "../../../components/job/create/DetailStep";
import LogoutModal from "../../../components/modals/LogoutModal";

const CreateJob = () => {
  const navigate = useNavigate();
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { mutate: createJob, isLoading: isSubmitting } = useCreateJob();

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [requirements, setRequirements] = useState([""]);
  const [responsibilities, setResponsibilities] = useState([""]);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null,
    title: "",
    message: "",
    onConfirm: null,
  });

  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    requirement: "",
    responsibility: "",
    salary_min: "",
    salary_max: "",
    job_type: "",
    job_level: "",
    experience: "",
    qualification: "",
    available_position: "",
    language: "",
    deadline: "",
  });

  const resetForm = () => {
    setFormData({
      category_id: "",
      title: "",
      description: "",
      requirement: "",
      responsibility: "",
      salary_min: "",
      salary_max: "",
      job_type: "",
      job_level: "",
      experience: "",
      qualification: "",
      available_position: "",
      language: "",
      deadline: "",
    });

    setRequirements([""]);
    setResponsibilities([""]);
    setErrors({});
    setCurrentStep(1);
  };
  useEffect(() => {
    if (formData.requirement) {
      const reqs = formData.requirement.split("\n").filter((r) => r.trim());
      if (reqs.length > 0) {
        setRequirements(reqs);
      }
    }
  }, []);

  useEffect(() => {
    if (formData.responsibility) {
      const resps = formData.responsibility.split("\n").filter((r) => r.trim());
      if (resps.length > 0) {
        setResponsibilities(resps);
      }
    }
  }, []);

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
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
    setFormData((prev) => ({
      ...prev,
      requirement: newRequirements.filter((r) => r.trim()).join("\n"),
    }));
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index) => {
    if (requirements.length > 1) {
      const newRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(newRequirements);
      setFormData((prev) => ({
        ...prev,
        requirement: newRequirements.filter((r) => r.trim()).join("\n"),
      }));
    }
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
    setFormData((prev) => ({
      ...prev,
      responsibility: newResponsibilities.filter((r) => r.trim()).join("\n"),
    }));
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const removeResponsibility = (index) => {
    if (responsibilities.length > 1) {
      const newResponsibilities = responsibilities.filter(
        (_, i) => i !== index,
      );
      setResponsibilities(newResponsibilities);
      setFormData((prev) => ({
        ...prev,
        responsibility: newResponsibilities.filter((r) => r.trim()).join("\n"),
      }));
    }
  };

  const handleNext = () => {
    let stepErrors = {};

    if (currentStep === 1) {
      stepErrors = validateStep1(formData);
    } else if (currentStep === 2) {
      stepErrors = validateStep2(requirements);
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreview = () => {
    const requiredFields = [
      "title",
      "category_id",
      "description",
      "job_type",
      "deadline",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      showModal(
        "warning",
        "ព្រមាន",
        "សូមបំពេញព័ត៌មានចាំបាច់ទាំងអស់មុនពេលមើលជាមុន",
      );
      return;
    }

    navigate("/recruiter/jobs/preview", {
      state: {
        ...formData,
        requirement:
          formData.requirement ||
          requirements.filter((r) => r.trim()).join("\n"),
        responsibility:
          formData.responsibility ||
          responsibilities.filter((r) => r.trim()).join("\n"),
      },
    });
  };

  const handleSubmit = () => {
    const allErrors = validateAllSteps(formData, requirements);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    const submitData = {
      ...formData,
      requirement: requirements.filter(Boolean).join("\n"),
      responsibility: responsibilities.filter(Boolean).join("\n"),
    };

    createJob(submitData, {
      onSuccess: () => {
        resetForm();
      },
      onError: (error) => {
        const message = error?.response?.data?.message || "";
        const isSubscriptionError =
          message === "Subscription expired" ||
          message?.toLowerCase().includes("subscription") ||
          message?.toLowerCase().includes("no active subscription");

        if (isSubscriptionError) {
          showModal(
            "confirm",
            "ការជាវផុតកំណត់",
            "ការជាវបែបផែនរបស់អ្នកផុតកំណត់ ឬមិនសកម្ម។ សូមជ្រើសរើសបែបផែនសម្រាប់បន្ត បង្ហោះការងារ។",
            () => navigate("/recruiter/plans"),
          );
        } else {
          showModal("error", "មានបញ្ហា", message || "បង្កើតការងារបរាជ័យ");
        }
      },
    });
  };

  const renderModal = () => {
    if (!modalConfig.isOpen) return null;

    if (modalConfig.type === "success") {
      return (
        <SuccessModal
          open={modalConfig.isOpen}
          onClose={closeModal}
          title={modalConfig.title}
          message={modalConfig.message}
        />
      );
    }

    if (
      modalConfig.type === "warning" ||
      modalConfig.type === "error" ||
      modalConfig.type === "confirm"
    ) {
      return (
        <LogoutModal
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          onConfirm={handleModalConfirm}
          title={modalConfig.title}
          message={modalConfig.message}
          confirmText={modalConfig.type === "confirm" ? "យល់ព្រម" : "យល់ព្រម"}
          cancelText={modalConfig.type === "confirm" ? "បោះបង់" : "បិទ"}
        />
      );
    }

    return null;
  };

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-500">កំពុងផ្ទុក...</p>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            មិនអាចផ្ទុកប្រភេទការងារបានទេ
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            សូមពិនិត្យការតភ្ជាប់បណ្តាញ ហើយព្យាយាមម្តងទៀត
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition duration-200"
          >
            សាកម្តងទៀត
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {renderModal()}

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">បង្កើតការងារថ្មី</h1>
          <p className="text-gray-500 text-sm mt-1">បំពេញព័ត៌មានលម្អិត</p>
        </div>

        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            categories={categories}
            onChange={handleChange}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <RequirementStep
            requirements={requirements}
            responsibilities={responsibilities}
            errors={errors}
            onRequirementChange={handleRequirementChange}
            onAddRequirement={addRequirement}
            onRemoveRequirement={removeRequirement}
            onResponsibilityChange={handleResponsibilityChange}
            onAddResponsibility={addResponsibility}
            onRemoveResponsibility={removeResponsibility}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <DetailStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={handlePrev}
            onPreview={handlePreview}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CreateJob;
