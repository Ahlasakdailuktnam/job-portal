import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  Users,
  Briefcase,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Award,
  TrendingUp,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  Download,
  Printer,
  Share2,
  MessageCircle,
  Settings,
  MoreVertical,
  Zap,
  Target,
  Activity,
  FileText,
  BarChart3,
  PieChart,
  LineChart,
  UserCheck,
  UserPlus,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  Mail as MailIcon,
  Phone as PhoneIcon
} from "lucide-react";

import {
  LineChart as ReLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Company Data
  const company = {
    id: 1,
    name: 'TechCorp Solutions',
    logo: 'https://ui-avatars.com/api/?background=3b82f6&color=fff&name=TC',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    email: 'info@techcorp.com',
    phone: '023 456 789',
    website: 'www.techcorp.com',
    location: 'ភ្នំពេញ, កម្ពុជា',
    address: 'អគារណាហ្គាវើល ទី១ ជាន់ទី១០ ផ្លូវសហព័ន្ធរុស្ស៊ី ភ្នំពេញ',
    industry: 'បច្ចេកវិទ្យា',
    size: '50-100 នាក់',
    founded: '2018',
    description: 'TechCorp Solutions គឺជាក្រុមហ៊ុនបច្ចេកវិទ្យាឈានមុខគេក្នុងប្រទេសកម្ពុជា ដែលផ្តល់សេវាកម្មអភិវឌ្ឍន៍កម្មវិធី និងដំណោះស្រាយបច្ចេកវិទ្យាប្រកបដោយគុណភាពខ្ពស់។ យើងមានបុគ្គលិកជំនាញជាង ៥០ នាក់ ដែលត្រៀមខ្លួនជួយអាជីវកម្មរបស់អ្នកឱ្យរីកចម្រើន។',
    plan: {
      name: 'អាជីវកម្ម',
      price: 299,
      period: 'ខែ',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      status: 'active',
      features: ['បង្ហោះការងារ ៥០ កន្លែង', 'ស្វែងរកបេក្ខជនកម្រិតខ្ពស់', 'របាយការណ៍លម្អិត', 'ការគាំទ្រ ២៤/៧', 'ការផ្សាយពាណិជ្ជកម្មដោយឥតគិតថ្លៃ']
    },
    stats: {
      totalJobs: 42,
      activeJobs: 38,
      closedJobs: 4,
      totalApplicants: 342,
      totalViews: 12470,
      avgRating: 4.8,
      monthlyRevenue: 8970,
      responseRate: 98,
      avgResponseTime: '2.5 ម៉ោង'
    },
    monthlyData: [
      { month: 'មករា', jobs: 5, applicants: 42, views: 1250 },
      { month: 'កុម្ភៈ', jobs: 4, applicants: 38, views: 1180 },
      { month: 'មីនា', jobs: 6, applicants: 51, views: 1420 },
      { month: 'មេសា', jobs: 3, applicants: 29, views: 980 },
      { month: 'ឧសភា', jobs: 7, applicants: 63, views: 1680 },
      { month: 'មិថុនា', jobs: 5, applicants: 47, views: 1350 },
      { month: 'កក្កដា', jobs: 4, applicants: 35, views: 1120 },
      { month: 'សីហា', jobs: 3, applicants: 28, views: 890 },
      { month: 'កញ្ញា', jobs: 5, applicants: 46, views: 1310 },
      { month: 'តុលា', jobs: 0, applicants: 0, views: 450 },
      { month: 'វិច្ឆិកា', jobs: 0, applicants: 0, views: 380 },
      { month: 'ធ្នូ', jobs: 0, applicants: 0, views: 320 }
    ],
    topJobs: [
      { title: 'Senior Frontend Developer', applicants: 42, views: 1247, status: 'active' },
      { title: 'Backend Developer', applicants: 35, views: 1156, status: 'active' },
      { title: 'UI/UX Designer', applicants: 28, views: 893, status: 'active' },
      { title: 'Full Stack Developer', applicants: 23, views: 756, status: 'closed' }
    ],
    payments: [
      { id: 'PAY-001', amount: 299, date: '2024-12-15', status: 'completed', method: 'ABA Bank', transactionId: 'TRX123456' },
      { id: 'PAY-002', amount: 299, date: '2024-11-15', status: 'completed', method: 'Wing', transactionId: 'TRX123457' },
      { id: 'PAY-003', amount: 299, date: '2024-10-15', status: 'completed', method: 'ABA Bank', transactionId: 'TRX123458' },
      { id: 'PAY-004', amount: 299, date: '2024-09-15', status: 'completed', method: 'TrueMoney', transactionId: 'TRX123459' }
    ],
    contact: {
      name: 'ចាន់ សុខា',
      position: 'អ្នកគ្រប់គ្រងធនធានមនុស្ស',
      email: 'sokha@techcorp.com',
      phone: '012 345 678',
      avatar: 'https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=CS'
    }
  };

  const statsCards = [
    { label: 'ការងារសរុប', value: company.stats.totalJobs, icon: Briefcase, color: '#3b82f6', bg: '#eff6ff' },
    { label: 'កំពុងផ្សាយ', value: company.stats.activeJobs, icon: CheckCircle, color: '#10b981', bg: '#ecfdf5' },
    { label: 'បេក្ខជនសរុប', value: company.stats.totalApplicants, icon: Users, color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'ចំនួនទស្សនា', value: company.stats.totalViews.toLocaleString(), icon: Eye, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'អត្រាឆ្លើយតប', value: `${company.stats.responseRate}%`, icon: MessageCircle, color: '#06b6d4', bg: '#ecfeff' },
    { label: 'ចំណូលប្រចាំខែ', value: `$${company.stats.monthlyRevenue}`, icon: DollarSign, color: '#ef4444', bg: '#fef2f2' }
  ];

  const planColors = {
    active: 'bg-green-100 text-green-700',
    expiring: 'bg-yellow-100 text-yellow-700',
    expired: 'bg-red-100 text-red-700'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <p className="font-semibold text-gray-800 text-sm mb-1">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-xs" style={{ color: p.color }}>
              {p.name}: {p.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-khmer">
      {/* Header with Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition"
        >
          <ChevronLeft size={18} />
          <span>ត្រឡប់ក្រោយ</span>
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 z-10 flex gap-3">
          <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition">
            <Share2 size={18} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition">
            <Printer size={18} />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition">
            <Download size={18} />
          </button>
        </div>

        {/* Company Logo and Name */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
          <div className="flex items-end gap-5">
            <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                {company.name.charAt(0)}
              </div>
            </div>
            <div className="text-white mb-2">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-sm text-white/90">
                  <MapPin size={14} />
                  {company.location}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/90">
                  <Building2 size={14} />
                  {company.industry}
                </span>
                <span className="flex items-center gap-1 text-sm text-white/90">
                  <Calendar size={14} />
                  បង្កើតឡើង {company.founded}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto">
          {['overview', 'jobs', 'applicants', 'payments', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' && 'ទិដ្ឋភាពទូទៅ'}
              {tab === 'jobs' && 'ការងារ'}
              {tab === 'applicants' && 'បេក្ខជន'}
              {tab === 'payments' && 'ប្រវត្តិបង់ប្រាក់'}
              {tab === 'settings' && 'ការកំណត់'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statsCards.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: stat.bg }}>
                      <Icon size={18} style={{ color: stat.color }} />
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Two Columns */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Company Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* About Company */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 size={20} className="text-blue-600" />
                    អំពីក្រុមហ៊ុន
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{company.description}</p>
                  <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400">ទំហំក្រុមហ៊ុន</p>
                      <p className="text-sm font-medium text-gray-700">{company.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">ឆ្នាំបង្កើត</p>
                      <p className="text-sm font-medium text-gray-700">{company.founded}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">អត្រាឆ្លើយតប</p>
                      <p className="text-sm font-medium text-gray-700">{company.stats.responseRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">ពេលវេលាឆ្លើយតបជាមធ្យម</p>
                      <p className="text-sm font-medium text-gray-700">{company.stats.avgResponseTime}</p>
                    </div>
                  </div>
                </div>

                {/* Monthly Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-green-600" />
                    ស្ថិតិការងារ និងបេក្ខជនប្រចាំខែ
                  </h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={company.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} interval={1} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="jobs" name="ការងារ" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={30} yAxisId="left" />
                      <Bar dataKey="applicants" name="បេក្ខជន" fill="#10b981" radius={[6, 6, 0, 0]} barSize={30} yAxisId="right" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Views Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye size={20} className="text-purple-600" />
                    ចំនួនទស្សនាការងារប្រចាំខែ
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={company.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} interval={1} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="views" name="ចំនួនទស្សនា" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Plan Information */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Award size={24} className="text-white/80" />
                    <span className="px-2 py-1 bg-white/20 rounded-lg text-xs">សកម្ម</span>
                  </div>
                  <p className="text-sm opacity-80">ប្លង់បច្ចុប្បន្ន</p>
                  <p className="text-2xl font-bold mt-1">{company.plan.name}</p>
                  <p className="text-2xl font-bold mt-2">${company.plan.price}<span className="text-sm">/{company.plan.period}</span></p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs opacity-80">សុពលភាព</p>
                    <p className="text-sm font-medium">{company.plan.startDate} - {company.plan.endDate}</p>
                  </div>
                </div>

                {/* Contact Person */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users size={18} className="text-blue-600" />
                    បុគ្គលិកទំនាក់ទំនង
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {company.contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{company.contact.name}</p>
                      <p className="text-sm text-gray-500">{company.contact.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MailIcon size={14} className="text-gray-400" />
                      <a href={`mailto:${company.contact.email}`} className="text-blue-600 hover:underline">{company.contact.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <PhoneIcon size={14} className="text-gray-400" />
                      <a href={`tel:${company.contact.phone}`} className="text-gray-700">{company.contact.phone}</a>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    ផ្ញើសារ
                  </button>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-green-600" />
                    ព័ត៌មានទំនាក់ទំនង
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">អ៊ីមែល</p>
                        <p className="text-sm text-gray-700">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">ទូរស័ព្ទ</p>
                        <p className="text-sm text-gray-700">{company.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">វេបសាយ</p>
                        <a href={`https://${company.website}`} className="text-sm text-blue-600 hover:underline">{company.website}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-400">អាសយដ្ឋាន</p>
                        <p className="text-sm text-gray-700">{company.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">ការងារទាំងអស់</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {company.topJobs.map((job, idx) => (
                  <div key={idx} className="p-5 hover:bg-gray-50 transition flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Users size={12} /> {job.applicants} បេក្ខជន</span>
                        <span className="flex items-center gap-1"><Eye size={12} /> {job.views} ទស្សនា</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {job.status === 'active' ? 'កំពុងផ្សាយ' : 'បានបិទ'}
                      </span>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">ប្រវត្តិនៃការទូទាត់</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-3">លេខសម្គាល់</th>
                    <th className="px-6 py-3">ចំនួនទឹកប្រាក់</th>
                    <th className="px-6 py-3">ថ្ងៃខែឆ្នាំ</th>
                    <th className="px-6 py-3">វិធីសាស្ត្រ</th>
                    <th className="px-6 py-3">លេខប្រតិបត្តិការ</th>
                    <th className="px-6 py-3">ស្ថានភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {company.payments.map((payment, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.id}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">${payment.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.method}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.transactionId}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          <CheckCircle size={10} />
                          បានបញ្ចប់
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applicants Tab */}
        {activeTab === 'applicants' && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Users size={48} className="text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">បញ្ជីបេក្ខជន</h3>
            <p className="text-gray-500">សូមជ្រើសរើសការងារដើម្បីមើលបេក្ខជនដែលបានដាក់ពាក្យ</p>
            <select className="mt-4 px-4 py-2 border border-gray-200 rounded-xl text-sm">
              <option>ជ្រើសរើសការងារ</option>
              {company.topJobs.map((job, idx) => (
                <option key={idx}>{job.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <Settings size={48} className="text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">ការកំណត់ក្រុមហ៊ុន</h3>
            <p className="text-gray-500">កែប្រែព័ត៌មានក្រុមហ៊ុន ប្លង់សេវាកម្ម និងការកំណត់ផ្សេងៗ</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;