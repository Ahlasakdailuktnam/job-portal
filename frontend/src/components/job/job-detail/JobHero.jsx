// components/job/JobHero.jsx
import React, { useState } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  GraduationCap,
  Globe,
  Clock,
  Send,
  Heart,
  Bookmark,
  CheckCircle,
  Users,
  Award,
  QrCode,
  Link2,
  Eye,
  TrendingUp,
  Printer,
  Download,
  Share2,
  ArrowLeft,
  CassetteTape,
} from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "../ApplyJobModal";

// Info Item Component
const InfoItem = ({ icon: Icon, label, value, highlight = false }) => (
  <div
    className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${highlight ? "bg-blue-50 border border-blue-100" : ""}`}
  >
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${highlight ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}
    >
      <Icon size={16} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

const JobHero = ({
  job,
  isApplied,
  setIsApplied,
  getJobTypeLabel,
  getJobLevelLabel,
  isSaved = false,
  onToggleSave,
  isSaving = false,
}) => {
  const navigate = useNavigate();
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div className="bg-gray-100 w-full md:p-7 lg:p-5 p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition text-sm mb-4"
      >
        <ArrowLeft size={16} />
        <span>ត្រលប់ក្រោយ</span>
      </button>

      <div className="overflow-hidden mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-0">
          {/* Left Column - Company Image & Info */}
          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Company Image */}
              <div className="md:col-span-1 relative rounded-xl bg-gray-50 min-h-[200px] md:min-h-full">
                {job.company?.social ? (
                  <img
                    src="https://office-interior.com/cdn/shop/files/LinkedIn-2_755d667a-ef67-42e6-838c-91a62d5dace2.jpg?v=1737040622&width=5234"
                    alt={job.company?.company_name || "Company"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6">
                    <div className="w-24 h-24 rounded-2xl bg-gray-200 flex items-center justify-center">
                      <Building2 size={40} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400 mt-3 text-center">
                      {job.company?.company_name || "ក្រុមហ៊ុន"}
                    </p>
                  </div>
                )}
              </div>

              {/* Job Info */}
              <div className="md:col-span-2 py-4 lg:p-6">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                      {job.title || "មិនមានចំណងជើង"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <Building2 size={14} className="text-gray-400" />
                      {job.company?.company_name ||
                        job.company_name ||
                        "មិនមាន"}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">                   
                    <button
                      onClick={onToggleSave}
                      disabled={isSaving}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                      title={isSaved ? "ដកចេញពីការរក្សាទុក" : "រក្សាទុកការងារ"}
                    >
                      <Bookmark
                        size={18}
                        className={
                          isSaved
                            ? "fill-gray-700 text-gray-700"
                            : "text-gray-400 hover:text-gray-600"
                        }
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <InfoItem
                    icon={DollarSign}
                    label="ប្រាក់ខែ"
                    value={
                      job.salary_min && job.salary_max
                        ? `$${job.salary_min} - $${job.salary_max}`
                        : "Negotiable"
                    }
                    highlight={true}
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="ប្រភេទការងារ"
                    value={getJobTypeLabel(job.job_type)}
                  />
                  <InfoItem
                    icon={GraduationCap}
                    label="កម្រិត"
                    value={getJobLevelLabel(job.job_level)}
                  />
                  <InfoItem
                    icon={Award}
                    label="បទពិសោធន៍"
                    value={job.experience}
                  />
                  <InfoItem
                    icon={CassetteTape}
                    label="Category"
                    value={job.category?.name}
                  />
                  <InfoItem icon={Globe} label="ភាសា" value={job.language} />
                  <InfoItem
                    icon={MapPin}
                    label="ទីតាំង"
                    value={job.company?.address}
                  />
                  <InfoItem
                    icon={Users}
                    label="តំណែងទំនេរ"
                    value={
                      job.available_position
                        ? `${job.available_position} នាក់`
                        : null
                    }
                  />
                  <InfoItem
                    icon={GraduationCap}
                    label="សញ្ញាបត្រ"
                    value={job.qualification}
                  />
                </div>

                {/* Skills */}
                {job.skills && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">
                      ជំនាញទាមទារ
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.split(",").map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-3 py-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="sticky top-24 space-y-5">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                  <p className="text-xs text-gray-400">ថ្ងៃចេញផ្សាយ</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-xs text-red-500">ថ្ងៃផុតកំណត់</p>
                  <p className="text-sm font-semibold text-red-600 mt-0.5">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="w-24 h-24 mx-auto bg-white rounded-lg flex items-center justify-center border border-gray-200">
                  <QrCode size={40} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  ស្កេន QR ដើម្បីដាក់ពាក្យ
                </p>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => {
                  if (!isApplied) {
                    setShowApplyModal(true);
                  }
                }}
                disabled={isApplied}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white font-semibold 
                  hover:from-gray-900 hover:to-gray-800 transition-all duration-300 flex items-center justify-center gap-2
                  shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isApplied ? (
                  <>
                    <CheckCircle size={18} />
                    បានដាក់ពាក្យ
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    ដាក់ពាក្យឥឡូវនេះ
                  </>
                )}
              </button>

              {/* Share */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-3">
                  ចែករំលែក
                </p>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition">
                    <FaFacebook size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition">
                    <FaLinkedin size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center hover:opacity-80 transition">
                    <FaTwitter size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-gray-700 text-white flex items-center justify-center hover:bg-gray-800 transition">
                    <Link2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyJobModal
        job={job}
        isOpen={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        onApplied={() => setIsApplied(true)}
      />
    </div>
  );
};

export default JobHero;
