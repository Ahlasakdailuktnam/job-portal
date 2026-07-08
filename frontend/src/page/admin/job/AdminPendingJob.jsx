import React, { useEffect, useState } from "react";
import {
  getPendingJobs,
  approveJob,
  rejectJob,
} from "../../../api/job/adminJobServiec";
import {
  Briefcase,
  Building2,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  FileCheck,
  Calendar,
  Users,
  Search,
  Filter,
} from "lucide-react";
import Loading from "../../../components/common/Loading";
import SuccessModal from "../../../components/modals/SuccessModal";
import LogoutModal from "../../../components/modals/LogoutModal";

const AdminPendingJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getPendingJobs();
      setJobs(response.data.data || []);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApprove = (id) => {
    setConfirmAction(() => async () => {
      try {
        const response = await approveJob(id);
        setSuccessMessage(response.message || "ការងារត្រូវបានអនុម័តដោយជោគជ័យ");
        setShowSuccess(true);
        fetchJobs();
      } catch (error) {
        setSuccessMessage(error.response?.data?.message || "មានបញ្ហាក្នុងការអនុម័ត");
        setShowSuccess(true);
      }
    });
    setShowConfirm(true);
  };

  const handleReject = (id) => {
    setConfirmAction(() => async () => {
      try {
        const response = await rejectJob(id);
        setSuccessMessage(response.message || "ការងារត្រូវបានបដិសេធដោយជោគជ័យ");
        setShowSuccess(true);
        fetchJobs();
      } catch (error) {
        setSuccessMessage(error.response?.data?.message || "មានបញ្ហាក្នុងការបដិសេធ");
        setShowSuccess(true);
      }
    });
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    if (confirmAction) {
      await confirmAction();
      setConfirmAction(null);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const t = {
    title: "ការងាររង់ចាំអនុម័ត",
    subtitle: "គ្រប់គ្រងការងារដែលកំពុងរង់ចាំការអនុម័ត",
    totalJobs: "សរុបការងារ",
    todayJobs: "ថ្ងៃនេះ",
    pending: "រង់ចាំអនុម័ត",
    approve: "អនុម័ត",
    reject: "បដិសេធ",
    noJobs: "មិនមានការងាររង់ចាំអនុម័ត",
    search: "ស្វែងរកការងារ...",
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">{t.title}</h1>
                </div>
                <p className="text-slate-300 text-sm ml-12">{t.subtitle}</p>
              </div>
              <button
                onClick={fetchJobs}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition duration-200 backdrop-blur-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">ធ្វើឱ្យស្រស់</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.totalJobs}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{jobs.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.todayJobs}</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">
                    {jobs.filter(job => {
                      const today = new Date().toDateString();
                      return new Date(job.created_at).toDateString() === today;
                    }).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.pending}</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{jobs.length}</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition duration-200 outline-none"
                />
              </div>
              <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition duration-200 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm">តម្រង</span>
              </button>
            </div>
          </div>

          {/* Job Cards */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 transition duration-200">
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock className="w-3 h-3 mr-1" />
                              {t.pending}
                            </span>
                            <span className="text-xs text-slate-400">#{job.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{job.company?.company_name || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Tag className="w-4 h-4 text-slate-400" />
                        <span>{job.category?.name || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>{new Date(job.created_at).toLocaleDateString('km-KH')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span>{job.available_position || 0} តំណែង</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => handleApprove(job.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition duration-200 font-medium text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {t.approve}
                      </button>
                      <button
                        onClick={() => handleReject(job.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition duration-200 font-medium text-sm"
                      >
                        <XCircle className="w-4 h-4" />
                        {t.reject}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-16 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">{t.noJobs}</h3>
              <p className="text-sm text-slate-500 mt-1">ការងារទាំងអស់ត្រូវបានអនុម័តរួចរាល់</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-400">
            <p>បង្ហាញ {filteredJobs.length} ការងារ ក្នុងចំណោម {jobs.length} ការងារសរុប</p>
          </div>
        </div>
      </div>

      <LogoutModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="បញ្ជាក់ការអនុម័ត"
        message="តើអ្នកពិតជាចង់អនុម័តការងារនេះមែនទេ?"
      />

      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="ជោគជ័យ!"
        message={successMessage}
      />
    </>
  );
};

export default AdminPendingJobs;