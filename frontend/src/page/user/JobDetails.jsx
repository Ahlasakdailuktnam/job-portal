// pages/jobs/JobDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Award,
  Users,
  Calendar,
  Globe,
  CheckCircle,
  XCircle,
  Send,
  Bookmark,
  Share2,
  ChevronRight,
  GraduationCap,
  Target,
  Zap,
  Heart,
  Eye,
  TrendingUp,
  AlertCircle,
  Shield,
  ThumbsUp,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useJobDetail } from "../../hook/useJob";
import { useSavedJobsManager } from "../../hook/useSavedJobsManager";
import JobHero from "../../components/job/job-detail/JobHero";
import ContactCard from "../../components/job/job-detail/ContactCard";
import JobContent from "../../components/job/job-detail/JobContent";
import toast from "react-hot-toast";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { data, isLoading, error } = useJobDetail(id);
  const { savedJobIds, loadingJobId, toggleSave } = useSavedJobsManager();

  const job = data?.data || data;

  // Check if job is saved
  useEffect(() => {
    if (job?.id && savedJobIds) {
      setIsSaved(savedJobIds.has(job.id));
    }
  }, [job?.id, savedJobIds]);

  // Handle toggle save with toast
  const handleToggleSave = () => {
    if (!job) return;
    
    toggleSave(job, {
      onSuccess: () => {
        toast.success(
          isSaved 
            ? 'បានដកការងារចេញពីបញ្ជីរក្សាទុក' 
            : 'បានរក្សាទុកការងារដោយជោគជ័យ',
          { duration: 3000, position: 'top-center' }
        );
        setIsSaved(!isSaved);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || 
          (isSaved ? 'មានបញ្ហាក្នុងការដកការងារ' : 'មានបញ្ហាក្នុងការរក្សាទុកការងារ'),
          { duration: 3000, position: 'top-center' }
        );
      },
    });
  };

  // Loading skeleton
  if (isLoading) {
    return <JobDetailSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-red-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            កំហុសក្នុងការផ្ទុកទិន្នន័យ
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {error?.response?.data?.message || "មិនអាចផ្ទុកព័ត៌មានការងារបានទេ"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ត្រលប់ក្រោយ
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            រកមិនឃើញការងារ
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            ការងារដែលអ្នកកំពុងស្វែងរកមិនមានទេ
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ត្រលប់ក្រោយ
          </button>
        </div>
      </div>
    );
  }

  // Get status config
  const getStatusConfig = (status) => {
    const configs = {
      active: {
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle,
        label: "កំពុងដំណើរការ",
      },
      pending: {
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: Clock,
        label: "កំពុងរង់ចាំ",
      },
      draft: {
        color: "bg-gray-50 text-gray-600 border-gray-200",
        icon: Briefcase,
        label: "សេចក្តីព្រាង",
      },
      closed: {
        color: "bg-rose-50 text-rose-700 border-rose-200",
        icon: XCircle,
        label: "បិទ",
      },
      expired: {
        color: "bg-gray-50 text-gray-500 border-gray-200",
        icon: XCircle,
        label: "ផុតកំណត់",
      },
      near_expired: {
        color: "bg-orange-50 text-orange-700 border-orange-200",
        icon: AlertCircle,
        label: "ជិតផុតកំណត់",
      },
    };
    return configs[status] || configs.draft;
  };

  const statusConfig = getStatusConfig(job.status);
  const StatusIcon = statusConfig.icon;

  // Get job type label
  const getJobTypeLabel = (type) => {
    const types = {
      full_time: "ពេញម៉ោង",
      part_time: "ក្រៅម៉ោង",
      remote: "ពីចម្ងាយ",
      internship: "កម្មសិក្សា",
      contract: "កិច្ចសន្យា",
      freelance: "ឯករាជ្យ",
    };
    return types[type] || type || "មិនមាន";
  };

  const getJobLevelLabel = (level) => {
    const levels = {
      entry: "កម្រិតចូល",
      junior: "ជុនីយ័រ",
      senior: "សេនីយ័រ",
      lead: "អ្នកដឹកនាំ",
      manager: "អ្នកគ្រប់គ្រង",
      executive: "នាយកប្រតិបត្តិ",
    };
    return levels[level] || level || "មិនមាន";
  };

  // Simple bullet point formatter
  const formatBulletPoints = (text) => {
    if (!text) return null;

    const lines = text.split("\n").filter((line) => line.trim());

    return (
      <ul className="space-y-2 list-none">
        {lines.map((line, index) => {
          const trimmed = line.trim();
          let cleanText = trimmed;
          if (
            trimmed.startsWith("•") ||
            trimmed.startsWith("-") ||
            trimmed.startsWith("*") ||
            trimmed.startsWith(".")
          ) {
            cleanText = trimmed.replace(/^[•\-*.]\s*/, "");
          }
          return (
            <li key={index} className="flex items-start gap-2.5">
              <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
              <span className="text-gray-600 leading-relaxed">{cleanText}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JobHero
        job={job}
        isApplied={isApplied}
        setIsApplied={setIsApplied}
        getJobTypeLabel={getJobTypeLabel}
        getJobLevelLabel={getJobLevelLabel}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        isSaving={loadingJobId === job.id}
      />
      <div className="max-w-7xl mx-auto md:px-5 px-4">
        <div className="grid lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-8">
            <JobContent job={job} />
          </div>

          <div className="lg:col-span-4">
            <ContactCard job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader
const JobDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50 animate-pulse">
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-gray-200 rounded-2xl h-64 mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gray-200 rounded-2xl h-64"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded-lg"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default JobDetail;