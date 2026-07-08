// pages/FindJobs.jsx
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Building2,
  TrendingUp,
  Award,
  Users,
  Globe,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronDown,
  ThumbsUp,
  ArrowRight,
  Mail,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useJob } from "../../hook/useJob";
import { useCategories } from "../../hook/useCategories";
import { useSavedJobsManager } from "../../hook/useSavedJobsManager";
import JobFilters from "../../components/job/JobFilters";
import JobList from "../../components/job/JobList";
import toast from "react-hot-toast";

// ============== MEMOIZED COMPONENTS ==============

// Hero Component - Memoized
const Hero = React.memo(({
  onSearch,
  searchKeyword,
  setSearchKeyword,
  searchLocation,
  setSearchLocation,
}) => {
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  }, [onSearch]);

  return (
    <div className="bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            ស្វែងរកការងារដែលអ្នកស្រឡាញ់
          </h1>
          <p className="text-gray-200 text-base mb-6">
            ស្វែងរកក្នុងចំណោមការងារជាង 10,000+ កន្លែងពីក្រុមហ៊ុនល្អៗ
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-xl p-2 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="តួនាទីការងារ ឬជំនាញ..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ទីតាំង"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition whitespace-nowrap"
              >
                ស្វែងរក
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm">
            <span className="text-gray-300">ការស្វែងរកពេញនិយម:</span>
            <button onClick={() => setSearchKeyword("Frontend Developer")} className="text-gray-200 hover:text-white">Frontend Developer</button>
            <span className="text-gray-400">•</span>
            <button onClick={() => setSearchKeyword("UI/UX Designer")} className="text-gray-200 hover:text-white">UI/UX Designer</button>
            <span className="text-gray-400">•</span>
            <button onClick={() => setSearchKeyword("Marketing Manager")} className="text-gray-200 hover:text-white">Marketing Manager</button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Stats Component - Memoized
const Stats = React.memo(() => {
  const STATS = [
    { icon: Briefcase, label: "ការងារសរុប", value: "1,284" },
    { icon: Users, label: "ក្រុមហ៊ុន", value: "345" },
    { icon: TrendingUp, label: "ការងារថ្មី", value: "1,234" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-700">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
                {idx < STATS.length - 1 && <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="text-xs text-gray-400">បច្ចុប្បន្នភាព: ថ្ងៃនេះ</div>
      </div>
    </div>
  );
});

// Toolbar Component - Memoized
const Toolbar = React.memo(({ total, currentPage, perPage, onPageSizeChange }) => {
  const validTotal = isNaN(total) || total < 0 ? 0 : total;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition">
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">តម្រង</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition">
            <DollarSign size={14} />
            <span className="hidden sm:inline">ប្រាក់ខែ</span>
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition">
            <Clock size={14} />
            <span className="hidden sm:inline">ប្រភេទ</span>
            <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition">
            <Briefcase size={14} />
            <span className="hidden sm:inline">កម្រិត</span>
            <ChevronDown size={12} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden md:inline">
            បង្ហាញ <span className="font-semibold text-gray-700">{validTotal}</span> លទ្ធផល
          </span>
          <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
            <button className="p-1.5 bg-gray-100 rounded-md transition">
              <LayoutGrid size={14} className="text-gray-700" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-50 transition">
              <List size={14} className="text-gray-400" />
            </button>
          </div>
          <select
            value={perPage}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gray-400"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
});

// Pagination Component - Memoized
const JobPagination = React.memo(({ pagination, currentPage, onPageChange }) => {
  if (!pagination) return null;

  const { total, currentPage: apiCurrentPage, lastPage, from, to } = pagination;

  if (!total || !apiCurrentPage || !lastPage) return null;
  if (isNaN(total) || isNaN(apiCurrentPage) || isNaN(lastPage)) return null;

  const getPageNumbers = useCallback(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, apiCurrentPage - Math.floor(maxVisible / 2));
    let end = Math.min(lastPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [apiCurrentPage, lastPage]);

  const validFrom = from || (apiCurrentPage - 1) * 10 + 1;
  const validTo = to || Math.min(apiCurrentPage * 10, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200 mt-4">
      <div className="text-sm text-gray-500">
        បង្ហាញ <span className="font-medium text-gray-700">{validFrom}</span> -{" "}
        <span className="font-medium text-gray-700">{validTo}</span> នៃ{" "}
        <span className="font-medium text-gray-700">{total}</span> ការងារ
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(apiCurrentPage - 1)}
          disabled={apiCurrentPage <= 1}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${apiCurrentPage <= 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <ChevronLeft size={18} />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${page === apiCurrentPage ? "bg-gray-700 text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(apiCurrentPage + 1)}
          disabled={apiCurrentPage >= lastPage}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${apiCurrentPage >= lastPage ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
});

// Recommended Jobs - Memoized
const RecommendedJobs = React.memo(() => {
  const RECOMMENDED_JOBS = [
    { title: "Graphic Designer", company: "Design Studio", salary: "$800 - $1,200", type: "Remote", posted: "2d ago" },
    { title: "Mobile Developer", company: "AppTech", salary: "$1,500 - $2,200", type: "On-site", posted: "3d ago" },
    { title: "Data Analyst", company: "DataTech", salary: "$1,200 - $1,800", type: "Hybrid", posted: "1d ago" },
    { title: "Security Engineer", company: "SecureTech", salary: "$2,000 - $3,000", type: "Remote", posted: "5d ago" },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <ThumbsUp size={20} className="text-gray-500" />
            ការងារដែលអ្នកអាចចាប់អារម្មណ៍
          </h2>
          <p className="text-sm text-gray-500 mt-1">ផ្អែកលើប្រវត្តិការស្វែងរករបស់អ្នក</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1">
          មើលទាំងអស់ <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {RECOMMENDED_JOBS.map((job, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
              <Building2 size={20} className="text-gray-600" />
            </div>
            <h3 className="font-semibold text-gray-700">{job.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{job.company}</p>
            <p className="text-sm font-medium text-gray-600 mt-2">{job.salary}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Globe size={12} />{job.type}</span>
              <span>•</span>
              <span>{job.posted}</span>
            </div>
            <button className="w-full mt-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition">
              មើលការងារ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

// Newsletter - Memoized
const Newsletter = React.memo(() => (
  <div className="mt-12 bg-gray-100 rounded-xl p-8 text-center">
    <h3 className="text-xl font-semibold text-gray-700 mb-2">ទទួលបានការងារថ្មីៗតាមអ៊ីមែល</h3>
    <p className="text-gray-500 mb-6">ចុះឈ្មោះដើម្បីទទួលបានដំណឹងអំពីការងារដែលសាកសមនឹងអ្នក</p>
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" placeholder="អ៊ីមែលរបស់អ្នក" className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400" />
      <button className="px-6 py-2.5 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition">ចុះឈ្មោះ</button>
    </div>
    <p className="text-xs text-gray-400 mt-4">យើងនឹងមិនផ្ញើសារឥតប្រយោជន៍ទេ។</p>
  </div>
));

// ============== MAIN COMPONENT ==============
const FindJobs = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    category: "",
    job_type: "",
    job_level: "",
    salary_min: "",
    salary_max: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const searchTimeout = useRef(null);

  const { data: categories = [] } = useCategories();
  const { savedJobIds, toggleSave } = useSavedJobsManager();

  const params = useMemo(() => {
    const cleaned = { page: currentPage, per_page: perPage, ...filters };
    Object.keys(cleaned).forEach((key) => {
      if (cleaned[key] === "" || cleaned[key] === null || cleaned[key] === undefined) {
        delete cleaned[key];
      }
    });
    return cleaned;
  }, [filters, currentPage, perPage]);

  const { data, isLoading, error, refetch } = useJob(params);
  const jobs = data?.jobs || [];
  const pagination = data?.pagination || null;

  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    setIsSearching(true);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, keyword: searchKeyword }));
  }, [searchKeyword]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (searchKeyword) {
      searchTimeout.current = setTimeout(() => {
        setIsSearching(true);
        setCurrentPage(1);
        setFilters((prev) => ({ ...prev, keyword: searchKeyword }));
      }, 500);
    }
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
  }, [searchKeyword]);

  useEffect(() => { if (!isLoading) setIsSearching(false); }, [isLoading]);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ keyword: "", category: "", job_type: "", job_level: "", salary_min: "", salary_max: "", status: "" });
    setSearchKeyword("");
    setCurrentPage(1);
    setIsSearching(false);
  }, []);

  const handlePageChange = useCallback((page) => {
    if (page < 1 || page > pagination?.lastPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagination]);

  const handlePageSizeChange = useCallback((size) => {
    setPerPage(size);
    setCurrentPage(1);
  }, []);

  const handleRetry = useCallback(() => refetch(), [refetch]);

  const handleToggleSaveWithToast = useCallback((job) => {
    const isSaved = savedJobIds.has(job.id);
    toggleSave(job, {
      onSuccess: () => {
        toast.success(isSaved ? 'បានដកការងារចេញពីបញ្ជីរក្សាទុក' : 'បានរក្សាទុកការងារដោយជោគជ័យ', {
          duration: 3000,
          position: 'top-center',
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || (isSaved ? 'មានបញ្ហាក្នុងការដកការងារ' : 'មានបញ្ហាក្នុងការរក្សាទុកការងារ'), {
          duration: 3000,
          position: 'top-center',
        });
      },
    });
  }, [savedJobIds, toggleSave]);

  const publicStatusOptions = [
    { value: "active", label: "សកម្ម" },
    { value: "near_expired", label: "ជិតផុតកំណត់" },
    { value: "expired", label: "ផុតកំណត់" },
  ];

  if (isLoading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero
          onSearch={handleSearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchLocation={null}
          setSearchLocation={null}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <Stats />
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                onClearFilters={clearFilters}
                isSearching={isSearching}
                categories={categories}
                showCategoryFilter={true}
                showStatusFilter={true}
              />
              <JobList jobs={[]} isLoading={true} savedJobIds={savedJobIds} onToggleSave={handleToggleSaveWithToast} savingId={null} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero
          onSearch={handleSearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchLocation={null}
          setSearchLocation={null}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="font-medium text-red-700">កំហុសក្នុងការផ្ទុកទិន្នន័យ</p>
            <p className="text-sm text-red-600 mt-1">{error.message || "Failed to load jobs"}</p>
            <button onClick={handleRetry} className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
              ព្យាយាមម្តងទៀត
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        onSearch={handleSearch}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        searchLocation={null}
        setSearchLocation={null}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Stats />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onClearFilters={clearFilters}
              isSearching={isSearching}
              categories={categories}
              showCategoryFilter={true}
              showStatusFilter={true}
              statusOptions={publicStatusOptions}
              role="public"
            />

            <Toolbar
              total={pagination?.total || 0}
              currentPage={currentPage}
              perPage={perPage}
              onPageSizeChange={handlePageSizeChange}
            />

            <JobList
              jobs={jobs}
              isLoading={false}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSaveWithToast}
              savingId={null}
            />

            {pagination && pagination.total > 0 && (
              <JobPagination
                pagination={pagination}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>

        <RecommendedJobs />
        <Newsletter />
      </div>
    </div>
  );
};

export default FindJobs;