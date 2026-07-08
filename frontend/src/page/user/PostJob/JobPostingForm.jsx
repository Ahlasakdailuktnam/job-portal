import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  FileText,
  Building2,
  Mail,
  Phone,
  Globe,
  ChevronLeft,
  Send,
  CheckCircle,
  Calendar,
  Eye,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    // Job Details
    jobTitle: '',
    department: '',
    employmentType: 'full-time',
    experienceLevel: 'mid-level',
    numberOfHires: '1',
    urgent: false,
    
    // Location
    locationType: 'on-site',
    location: '',
    
    // Compensation
    salaryMin: '',
    salaryMax: '',
    
    // Job Description
    description: '',
    requirements: '',
    benefits: '',
    
    // Company Info
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyWebsite: '',
    
    // Contact Person
    contactName: '',
    contactPosition: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const employmentTypes = [
    { value: 'full-time', label: 'ពេញម៉ោង', labelEn: 'Full-time', icon: Briefcase, color: 'blue' },
    { value: 'part-time', label: 'ក្រៅម៉ោង', labelEn: 'Part-time', icon: Clock, color: 'green' },
    { value: 'contract', label: 'កុងត្រា', labelEn: 'Contract', icon: FileText, color: 'orange' },
    { value: 'internship', label: 'កម្មសិក្សា', labelEn: 'Internship', icon: Users, color: 'purple' },
    { value: 'remote', label: 'ពីចម្ងាយ', labelEn: 'Remote', icon: Globe, color: 'indigo' },
  ];

  const experienceLevels = [
    { value: 'entry', label: 'ចាប់ផ្តើម', labelEn: 'Entry Level', years: '0-1 ឆ្នាំ' },
    { value: 'mid-level', label: 'កម្រិតមធ្យម', labelEn: 'Mid Level', years: '2-5 ឆ្នាំ' },
    { value: 'senior', label: 'ជាន់ខ្ពស់', labelEn: 'Senior Level', years: '5-8 ឆ្នាំ' },
    { value: 'manager', label: 'អ្នកគ្រប់គ្រង', labelEn: 'Manager', years: '8+ ឆ្នាំ' },
    { value: 'executive', label: 'ថ្នាក់ដឹកនាំ', labelEn: 'Executive', years: '10+ ឆ្នាំ' },
  ];

  const locationTypes = [
    { value: 'on-site', label: 'នៅកន្លែងធ្វើការ', icon: Building2, description: 'ធ្វើការនៅការិយាល័យ' },
    { value: 'hybrid', label: 'ចម្រុះ', icon: Globe, description: 'ចែកចាយពេលវេលា' },
    { value: 'remote', label: 'ពីចម្ងាយ', icon: MapPin, description: 'ធ្វើការពីទីណាក៏បាន' },
  ];

  const departments = [
    { name: 'បច្ចេកវិទ្យា', icon: '💻', color: 'blue' },
    { name: 'ទីផ្សារ', icon: '📢', color: 'pink' },
    { name: 'លក់', icon: '🤝', color: 'green' },
    { name: 'ធនធានមនុស្ស', icon: '👥', color: 'purple' },
    { name: 'ហិរញ្ញវត្ថុ', icon: '💰', color: 'yellow' },
    { name: 'ប្រតិបត្តិការ', icon: '⚙️', color: 'gray' },
    { name: 'សេវាកម្មអតិថិជន', icon: '🎧', color: 'teal' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const steps = [
    { number: 1, title: 'ព័ត៌មានការងារ', icon: Briefcase, color: 'blue' },
    { number: 2, title: 'ទីតាំង & ប្រាក់ខែ', icon: MapPin, color: 'green' },
    { number: 3, title: 'ការពណ៌នា', icon: FileText, color: 'purple' },
    { number: 4, title: 'ព័ត៌មានក្រុមហ៊ុន', icon: Building2, color: 'orange' },
  ];

  const JobPreview = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">មើលជាមុន</h3>
          <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-100 rounded-lg">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">{formData.jobTitle || 'ចំណងជើងការងារ'}</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="flex items-center gap-1"><Briefcase size={14} /> {formData.employmentType || 'ប្រភេទការងារ'}</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {formData.location || 'ទីតាំង'}</span>
            {formData.salaryMin && formData.salaryMax && (
              <span className="flex items-center gap-1"><DollarSign size={14} /> ${formData.salaryMin} - ${formData.salaryMax}</span>
            )}
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">ការពណ៌នា</h4>
            <p className="text-gray-600 whitespace-pre-line">{formData.description || '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-md mx-auto animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">បង្ហោះការងារដោយជោគជ័យ!</h2>
        <p className="text-gray-600 mb-6">ការងាររបស់អ្នកត្រូវបានបង្ហោះរួចរាល់។</p>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
          មើលការងារដែលបានបង្ហោះ
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto pt-4">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            const Icon = step.icon;
            
            return (
              <div key={step.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110' 
                        : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute top-6 left-1/2 w-full h-0.5 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ width: 'calc(100% - 48px)', left: 'calc(50% + 24px)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <div className="pb-28">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Job Details */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Briefcase size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">ព័ត៌មានការងារ</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ចំណងជើងការងារ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ឧទាហរណ៍៖ Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ផ្នែក <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {departments.map(dept => (
                    <button
                      key={dept.name}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, department: dept.name }))}
                      className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-2 ${
                        formData.department === dept.name
                          ? `border-${dept.color}-500 bg-${dept.color}-50 text-${dept.color}-700`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{dept.icon}</span>
                      <span className="text-sm">{dept.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ប្រភេទការងារ <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {employmentTypes.map(type => {
                      const Icon = type.icon;
                      return (
                        <label key={type.value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                          <input
                            type="radio"
                            name="employmentType"
                            value={type.value}
                            checked={formData.employmentType === type.value}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <Icon size={18} className={`text-${type.color}-500`} />
                          <div>
                            <div className="font-medium text-gray-700">{type.label}</div>
                            <div className="text-xs text-gray-400">{type.labelEn}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    កម្រិតបទពិសោធន៍ <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {experienceLevels.map(level => (
                      <button
                        key={level.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, experienceLevel: level.value }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          formData.experienceLevel === level.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{level.label}</div>
                        <div className="text-xs text-gray-400">{level.years}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                  />
                  <div>
                    <span className="font-medium text-red-700">សម្គាល់ជាការងារបន្ទាន់</span>
                    <p className="text-xs text-red-500 mt-1">នឹងត្រូវបានផ្សព្វផ្សាយបន្ថែម</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Location & Salary */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <MapPin size={24} className="text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">ទីតាំង & ប្រាក់ខែ</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  ប្រភេទទីតាំង <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {locationTypes.map(type => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, locationType: type.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          formData.locationType === type.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={24} className={`mb-2 ${formData.locationType === type.value ? 'text-green-600' : 'text-gray-400'}`} />
                        <div className="font-medium text-gray-800">{type.label}</div>
                        <div className="text-xs text-gray-400 mt-1">{type.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ទីតាំងការងារ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="ឧទាហរណ៍៖ ភ្នំពេញ, កម្ពុជា"
                />
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign size={20} className="text-green-600" />
                  ប្រាក់ខែ
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">អប្បបរមា</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="៥០០"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">អតិបរមា</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                        placeholder="១០០០"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <FileText size={24} className="text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900">ការពណ៌នាការងារ</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ការពណ៌នា <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  placeholder="ពណ៌នាអំពីការងារ ភារកិច្ច និងការទទួលខុសត្រូវ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  តម្រូវការ <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  placeholder="តម្រូវការសម្រាប់បេក្ខជន..."
                />
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  អត្ថប្រយោជន៍
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                  placeholder="អត្ថប្រយោជន៍ដែលបេក្ខជននឹងទទួលបាន..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Company Info */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right duration-300">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Building2 size={24} className="text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">ព័ត៌មានក្រុមហ៊ុន</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ឈ្មោះក្រុមហ៊ុន <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    អ៊ីមែល <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    លេខទូរស័ព្ទ
                  </label>
                  <input
                    type="tel"
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  វេបសាយ
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                  placeholder="https://..."
                />
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-orange-600" />
                  បុគ្គលិកទំនាក់ទំនង
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ឈ្មោះ</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">តួនាទី</label>
                    <input
                      type="text"
                      name="contactPosition"
                      value={formData.contactPosition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-10">
            <div className="max-w-3xl mx-auto flex justify-between gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  ត្រឡប់
                </button>
              )}
              {currentStep < steps.length && (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 ${currentStep === 1 ? 'ml-auto' : ''}`}
                >
                  បន្ត
                  <ArrowRight size={18} />
                </button>
              )}
              {currentStep === steps.length && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 ml-auto disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      កំពុងបង្ហោះ...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      បង្ហោះ
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {showPreview && <JobPreview />}
    </div>
  );
};

export default JobPostingForm;