import React, { useState, useEffect } from 'react';
import { useAdminSubscriptions } from '../../../hook';
import dayjs from 'dayjs';
import Loading from '../../../components/common/Loading';

const GetAllSubscription = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    status: '',
    plan_id: '',
    date_range: null
  });
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch subscriptions data - make sure params are passed correctly
  const { data, isLoading, refetch, error } = useAdminSubscriptions(searchParams);
  
  // Debug: Log the data to see what's coming back
  useEffect(() => {
    console.log('Full API Response:', data);
    console.log('Subscriptions array:', data?.data);
    console.log('Search Params:', searchParams);
  }, [data, searchParams]);

  // Handle data safely - check different possible data structures
  const subscriptions = data?.data || data || [];
  
  // Make sure subscriptions is an array
  const subscriptionArray = Array.isArray(subscriptions) ? subscriptions : [];
  
  // Calculate statistics
  const statistics = {
    total: subscriptionArray.length,
    active: subscriptionArray.filter(sub => sub.status === 'active').length,
    expired: subscriptionArray.filter(sub => sub.status === 'expired').length,
    cancelled: subscriptionArray.filter(sub => sub.status === 'cancelled').length
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchParams(prev => ({ ...prev, search: value }));
    // If you want auto-search, uncomment below
    // refetch();
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSearchParams(prev => ({ ...prev, status: value }));
    // refetch();
  };

  const handleReset = () => {
    setSearchParams({
      search: '',
      status: '',
      plan_id: '',
      date_range: null
    });
    // Refetch after reset
    setTimeout(() => refetch(), 100);
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleViewDetails = (subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  // Status badge renderer
  const renderStatusBadge = (status) => {
    const statusConfig = {
      active: { 
        color: 'bg-green-100 text-green-800 border-green-300', 
        label: 'Active'
      },
      expired: { 
        color: 'bg-red-100 text-red-800 border-red-300', 
        label: 'Expired'
      },
      cancelled: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300', 
        label: 'Cancelled'
      },
      pending: { 
        color: 'bg-blue-100 text-blue-800 border-blue-300', 
        label: 'Pending'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    if (!endDate) return 'N/A';
    const end = dayjs(endDate);
    const now = dayjs();
    const days = end.diff(now, 'day');
    if (days < 0) return 'Expired';
    if (days === 0) return 'Today';
    return `${days} days left`;
  };

  // Get status color for progress bar
  const getProgressColor = (daysRemaining, totalDays) => {
    if (!totalDays) return 'bg-gray-500';
    const ratio = daysRemaining / totalDays;
    if (ratio > 0.5) return 'bg-green-500';
    if (ratio > 0.25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Show error if any
  if (error) {
    console.error('Error fetching subscriptions:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <h3 className="font-semibold">Error loading subscriptions</h3>
          <p>{error.message || 'Please try again later'}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-1">View and manage all user subscriptions</p>
        {data && (
          <p className="text-xs text-gray-400 mt-1">
            Last updated: {new Date().toLocaleString()}
          </p>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-600">{statistics.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active</p>
              <p className="text-2xl font-bold text-green-600">{statistics.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Expired</p>
              <p className="text-2xl font-bold text-red-600">{statistics.expired}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-yellow-600">{statistics.cancelled}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by user name or email..."
                value={searchParams.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <select
              value={searchParams.status}
              onChange={handleStatusChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
            </select>

            <button
              onClick={handleReset}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>

            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
       <Loading/>
      ) : subscriptionArray.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">No subscriptions found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          <button
            onClick={handleRefresh}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load Data
          </button>
        </div>
      ) : (
        // Subscriptions List
        <div className="space-y-4">
          {subscriptionArray.map((subscription) => {
            const daysRemaining = subscription.end_date ? dayjs(subscription.end_date).diff(dayjs(), 'day') : 0;
            const totalDays = subscription.plan?.duration_days || 30;
            const progressPercent = Math.max(0, (daysRemaining / totalDays) * 100);
            const isExpired = daysRemaining < 0;

            return (
              <div 
                key={subscription.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{subscription.user?.name || 'N/A'}</h3>
                        <p className="text-sm text-gray-500">{subscription.user?.email || 'N/A'}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          User ID: #{subscription.user?.id || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Plan Info */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                      <div>
                        <p className="text-xs text-gray-500">Plan</p>
                        <p className="font-medium text-gray-900">{subscription.plan?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-400">ID: #{subscription.plan?.id || 'N/A'}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-bold text-green-600">
                          ${subscription.price ? parseFloat(subscription.price).toFixed(2) : '0.00'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-700">
                          {subscription.plan?.duration_days || 'N/A'} days
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        {renderStatusBadge(subscription.status)}
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Days Remaining</p>
                        <p className={`text-sm font-semibold ${isExpired ? 'text-red-600' : 'text-blue-600'}`}>
                          {getDaysRemaining(subscription.end_date)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(subscription)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setExpandedRow(expandedRow === subscription.id ? null : subscription.id)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {expandedRow === subscription.id ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {subscription.status === 'active' && subscription.end_date && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(daysRemaining, totalDays)}`}
                          style={{ width: `${Math.min(100, progressPercent)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedRow === subscription.id && (
                  <div className="border-t border-gray-100 bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Subscription ID</p>
                        <p className="text-sm font-medium">#{subscription.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="text-sm">
                          {subscription.start_date ? dayjs(subscription.start_date).format('YYYY-MM-DD HH:mm') : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="text-sm">
                          {subscription.end_date ? dayjs(subscription.end_date).format('YYYY-MM-DD HH:mm') : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created At</p>
                        <p className="text-sm">
                          {subscription.created_at ? dayjs(subscription.created_at).format('YYYY-MM-DD HH:mm') : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Plan Features</p>
                        <div className="text-sm">
                          <p>Job Limit: {subscription.plan?.job_limit || 'N/A'}</p>
                          <p>Featured Jobs: {subscription.plan?.featured_job || 'N/A'}</p>
                          <p>CV Access: {subscription.plan?.cv_access || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">User Details</p>
                        <div className="text-sm">
                          <p>Role: {subscription.user?.role || 'N/A'}</p>
                          <p>Verified: {subscription.user?.is_verified ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {isModalOpen && selectedSubscription && (
        <div className="fixed inset-0 bg-black/55 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">Subscription Details</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* User Section */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">User Information</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedSubscription.user?.name || 'N/A'}</p>
                      <p className="text-gray-600">{selectedSubscription.user?.email || 'N/A'}</p>
                      <p className="text-sm text-gray-500">Role: {selectedSubscription.user?.role || 'N/A'}</p>
                      <p className="text-sm text-gray-500">
                        Status: {selectedSubscription.user?.is_verified ? 'Verified' : 'Unverified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plan Section */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Plan Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Plan Name</p>
                      <p className="font-medium">{selectedSubscription.plan?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-bold text-green-600">
                        ${selectedSubscription.price ? parseFloat(selectedSubscription.price).toFixed(2) : '0.00'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p>{selectedSubscription.plan?.duration_days || 'N/A'} days</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      {renderStatusBadge(selectedSubscription.status)}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Plan Features</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedSubscription.plan?.job_limit || 0}</p>
                      <p className="text-xs text-gray-600">Job Limit</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedSubscription.plan?.featured_job || 0}</p>
                      <p className="text-xs text-gray-600">Featured Jobs</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{selectedSubscription.plan?.cv_access || 0}</p>
                      <p className="text-xs text-gray-600">CV Access</p>
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Subscription Period</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {selectedSubscription.start_date ? dayjs(selectedSubscription.start_date).format('YYYY-MM-DD HH:mm') : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="font-medium">
                        {selectedSubscription.end_date ? dayjs(selectedSubscription.end_date).format('YYYY-MM-DD HH:mm') : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created At</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubscription.created_at ? dayjs(selectedSubscription.created_at).format('YYYY-MM-DD HH:mm') : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-sm text-gray-600">
                        {selectedSubscription.updated_at ? dayjs(selectedSubscription.updated_at).format('YYYY-MM-DD HH:mm') : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllSubscription;