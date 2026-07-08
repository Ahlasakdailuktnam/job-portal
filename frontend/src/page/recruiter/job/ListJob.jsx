// pages/jobs/ListJob.jsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMyJobs } from "../../../hook/useMyJobs";
import { useDeleteJob } from "../../../hook/useDeleteJob";
import { useCloseJob, useReopenJob } from "../../../hook/useJob";
import { useCategories } from "../../../hook/useCategories"; // Import categories hook
import JobTable from "../../../components/job/JobTable";
import JobFilters from "../../../components/job/JobFilters";
import JobPagination from "../../../components/job/JobPagination";
import JobTableSkeleton from "../../../components/job/JobTableSkeleton";
import { Briefcase } from "lucide-react";
import ConfirmModal from "../../../components/modals/ConfirmModal";

const ListJob = () => {
  const navigate = useNavigate();
  const { mutate: deleteJob, isLoading: isDeleting } = useDeleteJob();
  const closeJobMutation = useCloseJob();
  const reopenJobMutation = useReopenJob();

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    job_type: "",
    job_level: "",
    status: "",
    salary_min: "",
    salary_max: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  // Prepare params for the hook
  const getParams = useCallback(() => {
    const params = {
      page: currentPage,
      per_page: perPage,
      ...filters,
    };

    // Remove empty filters
    Object.keys(params).forEach((key) => {
      if (
        params[key] === "" ||
        params[key] === null ||
        params[key] === undefined
      ) {
        delete params[key];
      }
    });

    return params;
  }, [filters, currentPage, perPage]);

  // Use the useMyJobs hook
  const { data, isLoading, error, refetch, isFetching } =
    useMyJobs(getParams());

  // Safely extract data with fallbacks
  const jobs = data?.jobs || [];
  const pagination = data?.pagination || null;

  // Handle search with debounce
  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    setIsSearching(true);
    setCurrentPage(1);
  }, []);

  // Debounced search for keyword change
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    if (filters.keyword && filters.keyword.length > 0) {
      searchTimeout.current = setTimeout(() => {
        setIsSearching(true);
        setCurrentPage(1);
      }, 500);
    } else if (!filters.keyword) {
      setIsSearching(false);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [filters.keyword]);

  // Reset searching state when data loads
  useEffect(() => {
    if (!isLoading) {
      setIsSearching(false);
    }
  }, [isLoading]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      category: "",
      job_type: "",
      job_level: "",
      status: "",
      salary_min: "",
      salary_max: "",
    });
    setCurrentPage(1);
    setIsSearching(false);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination?.lastPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewJob = (id) => {
    navigate(`/recruiter/jobs/${id}/preview`);
  };

  const handleEditJob = (id) => {
    navigate(`/recruiter/jobs/${id}/preview`);
  };

  const handleDeleteJob = (id) => {
    setSelectedJobId(id);
    setIsDeleteOpen(true);
  };

  const handleCloseJob = (id) => {
    closeJobMutation.mutate(id);
  };

  const handleReopenJob = (id) => {
    reopenJobMutation.mutate(id);
  };


  const confirmDeleteJob = () => {
    if (!selectedJobId) return;
    deleteJob(selectedJobId, {
      onSuccess: () => {
        refetch();
      }
    });
    setIsDeleteOpen(false);
    setSelectedJobId(null);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-700">
              បញ្ជីការងាររបស់ខ្ញុំ
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              សរុប{" "}
              <span className="font-medium text-gray-700">
                {pagination?.total || 0}
              </span>{" "}
              ការងារ
            </p>
          </div>
          <button
            onClick={() => navigate("/recruiter/jobs/post")}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <span>+</span> បន្ថែមការងារ
          </button>
        </div>

        {/* Filters - Pass categories to the filter component */}
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearFilters={clearFilters}
          isSearching={isSearching}
          categories={categories} // Pass categories here
          showCategoryFilter={true}
          showStatusFilter={true}
        />

        {/* Content */}
        {isLoading ? (
          <JobTableSkeleton />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            <p className="font-medium">កំហុសក្នុងការផ្ទុកទិន្នន័យ</p>
            <p className="text-sm">{error.message || "Failed to load jobs"}</p>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              ព្យាយាមម្តងទៀត
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">មិនមានការងារ</p>
            <p className="text-sm text-gray-400 mt-1">សូមបង្កើតការងារថ្មី</p>
          </div>
        ) : (
          <>
            <JobTable
              jobs={jobs}
              onView={handleViewJob}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
              onClose={handleCloseJob}
              onReopen={handleReopenJob}
              isDeleting={isDeleting}
              isStatusUpdating={
                closeJobMutation.isPending || reopenJobMutation.isPending
              }
            />
            <JobPagination
              pagination={pagination}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDeleteJob}
        title="បញ្ជាក់ការលុប"
        message="តើអ្នកពិតជាចង់លុបការងារនេះមែនទេ?"
        confirmText="លុប"
        cancelText="បោះបង់"
        variant="danger"
      />
    </div>
  );
};

export default ListJob;
