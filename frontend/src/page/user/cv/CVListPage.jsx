import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCV } from '../../../hook';
import { Button, Loading } from '../../../components/common';
import { 
  FiPlus, 
  FiEdit2, 
  FiDownload, 
  FiTrash2, 
  FiSearch, 
  FiGrid, 
  FiList,
  FiPhone,
  FiMapPin,
  FiLink,
  FiCalendar,
  FiFileText
} from 'react-icons/fi';

const CVListPage = () => {
  const navigate = useNavigate();
  const cvHooks = useCV();
  const { useGetAll, useDelete, useDownload } = cvHooks;
  
  const { data, isLoading, error, refetch } = useGetAll();
  const deleteMutation = useDelete();
  const downloadMutation = useDownload();

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុប CV នេះមែនទេ?')) {
      try {
        await deleteMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await downloadMutation.mutateAsync(id);
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cv-${id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Navigate to edit page with proper ID
  const handleEdit = (id) => {
    navigate(`/cv/${id}/edit`);
  };

  const cvs = data?.data || [];
  
  const filteredCVs = cvs.filter(cv =>
    cv.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.phone?.includes(searchTerm) ||
    cv.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-yellow-500 to-yellow-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
    ];
    const index = name?.length || 0;
    return colors[index % colors.length];
  };

  const getInitials = (name) => {
    if (!name) return 'CV';
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loading size="lg" />
        <p className="mt-4 text-gray-500 text-sm">កំពុងផ្ទុក CV របស់អ្នក...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">😕</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">មិនអាចផ្ទុក CV បាន</h3>
        <p className="text-gray-500 mb-4 text-center max-w-md">{error.message}</p>
        <Button variant="primary" onClick={() => refetch()}>
          ព្យាយាមម្តងទៀត
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="relative bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="bg-gray-700 text-white p-2 rounded-xl">
                  <FiFileText className="w-6 h-6" />
                </span>
                CV របស់ខ្ញុំ
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                អ្នកមាន CV ចំនួន <span className="font-semibold text-gray-700">{filteredCVs.length}</span> 
                {filteredCVs.length === 1 ? ' សន្លឹក' : ' សន្លឹក'}
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/cv/create')}
              className="flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FiPlus className="w-5 h-5" />
              បង្កើត CV ថ្មី
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ស្វែងរក CV តាមចំណងជើង លេខទូរស័ព្ទ ឬអាសយដ្ឋាន..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent text-sm transition-all duration-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                  title="មើលជាក្រឡា"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                  }`}
                  title="មើលជាបញ្ជី"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-600">
                <span className="font-semibold text-gray-800">{filteredCVs.length}</span>
                <span>សរុប</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCVs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <span className="text-6xl">📄</span>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm">
                {searchTerm ? '🔍' : '+'}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mt-6">
              {searchTerm ? 'រកមិនឃើញ CV ទេ' : 'មិនទាន់មាន CV ទេ'}
            </h3>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              {searchTerm 
                ? 'សូមសាកល្បងស្វែងរកដោយប្រើពាក្យផ្សេង'
                : 'ចាប់ផ្តើមបង្កើត CV ដំបូងរបស់អ្នកឥឡូវនេះ'}
            </p>
            {!searchTerm && (
              <Button 
                variant="primary" 
                onClick={() => navigate('/cv/create')}
                className="px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FiPlus className="w-5 h-5 inline mr-2" />
                បង្កើត CV
              </Button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCVs.map((cv) => (
              <div
                key={cv.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
              >
                {/* Card Header with Gradient */}
                <div className="relative h-24 bg-gradient-to-r from-gray-700 to-gray-900">
                  <div className="absolute -bottom-10 left-6">
                    {cv.profile_image ? (
                      <img
                        src={`http://localhost:8000/storage/${cv.profile_image}`}
                        alt={cv.title}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(cv.title)} flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg`}>
                        {getInitials(cv.title)}
                      </div>
                    )}
                  </div>
                  
                  {/* Template Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                      {cv.template || 'Classic'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-12 px-6 pb-4">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">
                    {cv.title || 'Untitled CV'}
                  </h3>
                  
                  {/* Contact Info */}
                  <div className="mt-3 space-y-1.5">
                    {cv.phone && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FiPhone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{cv.phone}</span>
                      </p>
                    )}
                    {cv.address && (
                      <p className="text-sm text-gray-600 flex items-center gap-2 truncate">
                        <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{cv.address}</span>
                      </p>
                    )}
                    {cv.linkedin && (
                      <p className="text-sm text-gray-600 flex items-center gap-2 truncate">
                        <FiLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{cv.linkedin}</span>
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <FiCalendar className="w-3 h-3" />
                    <span>ធ្វើបច្ចុប្បន្នភាព {new Date(cv.updated_at).toLocaleDateString('km-KH')}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cv.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group-hover:shadow-sm"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    កែប្រែ
                  </button>
                  <button
                    onClick={() => handleDownload(cv.id)}
                    disabled={downloadMutation.isLoading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-300 group-hover:shadow-lg disabled:opacity-50"
                  >
                    <FiDownload className="w-4 h-4" />
                    ទាញយក
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    disabled={deleteMutation.isLoading}
                    className="inline-flex items-center justify-center p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 disabled:opacity-50"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filteredCVs.map((cv, index) => (
                <div
                  key={cv.id}
                  className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-all duration-300 ${
                    index === 0 ? 'bg-gray-50/50' : ''
                  }`}
                >
                  {cv.profile_image ? (
                    <img
                      src={`http://localhost:8000/storage/${cv.profile_image}`}
                      alt={cv.title}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAvatarColor(cv.title)} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
                      {getInitials(cv.title)}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{cv.title || 'Untitled CV'}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {cv.template || 'Classic'}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-0.5">
                      {cv.phone && (
                        <span className="flex items-center gap-1">
                          <FiPhone className="w-3 h-3" />
                          {cv.phone}
                        </span>
                      )}
                      {cv.address && (
                        <span className="flex items-center gap-1 truncate max-w-[200px]">
                          <FiMapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{cv.address}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(cv.updated_at).toLocaleDateString('km-KH')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(cv.id)}
                      className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300"
                      title="កែប្រែ"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(cv.id)}
                      disabled={downloadMutation.isLoading}
                      className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 disabled:opacity-50"
                      title="ទាញយក"
                    >
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cv.id)}
                      disabled={deleteMutation.isLoading}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 disabled:opacity-50"
                      title="លុប"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVListPage;