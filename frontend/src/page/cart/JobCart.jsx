// pages/JobCart.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSavedJobsManager } from "../../hook/useSavedJobsManager";
import { JobCard } from "../../components/job/cart/JobCard";
import { ArrowLeft, Bookmark, RefreshCw } from "lucide-react";

const JobCart = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const {
    savedJobs,
    loadingJobId,
    toggleSave,
  } = useSavedJobsManager();

  // Handle unsave from JobCart - wrapped with useCallback
  const handleUnsave = useCallback((job) => {
    toggleSave(job, {
      onSuccess: () => {
        toast.success('បានដកការងារចេញពីបញ្ជីរក្សាទុក', {
          duration: 3000,
          position: 'top-center',
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'មានបញ្ហាក្នុងការដកការងារ', {
          duration: 3000,
          position: 'top-center',
        });
      },
    });
  }, [toggleSave]);

  // Handle manual refresh - wrapped with useCallback
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // The manager will handle refetch internally
    // We just need to trigger a refetch of the saved jobs query
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('បានធ្វើឱ្យស្រស់ដោយជោគជ័យ', {
        duration: 2000,
        position: 'top-center',
      });
    }, 500);
  }, []);

  // Memoize the job list to prevent unnecessary re-renders
  const jobList = useMemo(() => {
    if (savedJobs.length === 0) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            មិនមានការងារដែលបានរក្សាទុក
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            ចាប់ផ្តើមរក្សាទុកការងារដែលអ្នកចាប់អារម្មណ៍
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            ស្វែងរកការងារ
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {savedJobs.map((savedJob) => {
          const jobData = savedJob.job || savedJob;
          return (
            <JobCard
              key={savedJob.id || jobData.id}
              job={jobData}
              isSaved={true}
              onToggleSave={() => handleUnsave(jobData)}
              isLoading={loadingJobId === jobData.id}
            />
          );
        })}
      </div>
    );
  }, [savedJobs, loadingJobId, handleUnsave, navigate]);

  // Loading state
  if (!savedJobs) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700 mx-auto"></div>
          <p className="mt-4 text-gray-500">កំពុងផ្ទុក...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="ត្រលប់ក្រោយ"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Bookmark className="text-gray-700" size={24} />
                ការងារដែលបានរក្សាទុក
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                សរុប <span className="font-semibold text-gray-700">{savedJobs.length}</span> ការងារ
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label="ធ្វើឱ្យស្រស់"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            {isRefreshing ? "កំពុងធ្វើឱ្យស្រស់..." : "ធ្វើឱ្យស្រស់"}
          </button>
        </div>

        {/* Saved Jobs List */}
        {jobList}
      </div>
    </div>
  );
};

export default JobCart;