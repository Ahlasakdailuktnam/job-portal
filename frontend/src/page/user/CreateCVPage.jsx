import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code,
  Globe, Plus, Trash2, Upload, Save, Eye,
  Download, CheckCircle, Calendar, FileText, Sparkles,
  ArrowLeft, ArrowRight, Zap, Languages, Link
} from "lucide-react";

const CreateCVPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [showPreview, setShowPreview] = useState(false);
  const [cvData, setCvData] = useState({
    personal: { 
      fullName: 'សុខា ច័ន្ទ', 
      email: 'sokha.chan@example.com', 
      phone: '+855 12 345 678', 
      address: 'ភ្នំពេញ, កម្ពុជា', 
      dateOfBirth: '1995-06-15', 
      title: 'Frontend Developer', 
      summary: 'អ្នកអភិវឌ្ឍន៍ Frontend ដែលមានបទពិសោធន៍ 5 ឆ្នាំ ជំនាញ React, Vue.js និង Tailwind CSS។ ចូលចិត្តបង្កើត UI/UX ដែលមានគុណភាពខ្ពស់ និងឆ្លើយតបលឿន។',
      profileImage: '' 
    },
    experience: [
      { id: 1, jobTitle: 'Senior Frontend Developer', company: 'ABC Tech', startDate: '2022-01', endDate: '', current: true, description: 'ទទួលបន្ទុកអភិវឌ្ឍន៍កម្មវិធី Web ដោយប្រើ React និង TypeScript\nសហការជាមួយក្រុមការងារ Design ដើម្បីបង្កើត UI ដែលទាន់សម័យ\nបង្កើនប្រសិទ្ធភាពកម្មវិធីឱ្យដំណើរការលឿនជាងមុន 40%' },
      { id: 2, jobTitle: 'Junior Developer', company: 'XYZ Solutions', startDate: '2019-03', endDate: '2021-12', current: false, description: 'អភិវឌ្ឍន៍ Website និង Mobile Responsive\nជួសជុល Bug និងបន្ថែម Feature ថ្មីៗ' }
    ],
    education: [
      { id: 1, degree: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ', institution: 'សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ', startDate: '2015', endDate: '2019', description: '' }
    ],
    skills: [
      { id: 1, name: 'React', level: 5 },
      { id: 2, name: 'JavaScript', level: 5 },
      { id: 3, name: 'Tailwind CSS', level: 4 },
      { id: 4, name: 'Node.js', level: 3 }
    ],
    languages: [
      { id: 1, name: 'ខ្មែរ', proficiency: 'ភាសាកំណើត' },
      { id: 2, name: 'អង់គ្លេស', proficiency: 'ស្ទាត់ជំនាញ' }
    ],
    social: { linkedin: 'https://linkedin.com/in/sokha', github: 'https://github.com/sokha', portfolio: 'https://sokha.dev' }
  });

  const steps = [
    { number: 1, title: 'ព័ត៌មានផ្ទាល់ខ្លួន', icon: User },
    { number: 2, title: 'បទពិសោធន៍ការងារ', icon: Briefcase },
    { number: 3, title: 'ការសិក្សា', icon: GraduationCap },
    { number: 4, title: 'ជំនាញ & ភាសា', icon: Code },
  ];

  const templates = [
    { id: 'modern', name: 'ទំនើប', icon: '✨', color: 'blue' },
    { id: 'professional', name: 'អាជីព', icon: '💼', color: 'gray' },
    { id: 'creative', name: 'ច្នៃប្រឌិត', icon: '🎨', color: 'purple' }
  ];

  const handlePersonalChange = (field, value) => {
    setCvData({ ...cvData, personal: { ...cvData.personal, [field]: value } });
  };

  const addExperience = () => {
    setCvData({
      ...cvData,
      experience: [...cvData.experience, { id: Date.now(), jobTitle: '', company: '', startDate: '', endDate: '', current: false, description: '' }]
    });
  };

  const removeExperience = (id) => {
    setCvData({ ...cvData, experience: cvData.experience.filter(exp => exp.id !== id) });
  };

  const updateExperience = (id, field, value) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { id: Date.now(), degree: '', institution: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const removeEducation = (id) => {
    setCvData({ ...cvData, education: cvData.education.filter(edu => edu.id !== id) });
  };

  const updateEducation = (id, field, value) => {
    setCvData({
      ...cvData,
      education: cvData.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const addSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, { id: Date.now(), name: '', level: 3 }] });
  };

  const removeSkill = (id) => {
    setCvData({ ...cvData, skills: cvData.skills.filter(skill => skill.id !== id) });
  };

  const updateSkill = (id, field, value) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.map(skill => skill.id === id ? { ...skill, [field]: value } : skill)
    });
  };

  const addLanguage = () => {
    setCvData({ ...cvData, languages: [...cvData.languages, { id: Date.now(), name: '', proficiency: 'មធ្យម' }] });
  };

  const removeLanguage = (id) => {
    setCvData({ ...cvData, languages: cvData.languages.filter(lang => lang.id !== id) });
  };

  const updateLanguage = (id, field, value) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.map(lang => lang.id === id ? { ...lang, [field]: value } : lang)
    });
  };

  // Function to get skill level as stars
  const getSkillStars = (level) => {
    return '⭐'.repeat(level) + '☆'.repeat(5 - level);
  };

  // CV Preview Component
  const CVPreview = () => (
    <div className={`rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
      activeTemplate === 'modern' ? 'bg-white' :
      activeTemplate === 'professional' ? 'bg-gray-50' : 'bg-gradient-to-br from-purple-50 to-pink-50'
    }`}>
      {/* CV Header */}
      <div className={`p-6 text-white ${
        activeTemplate === 'modern' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
        activeTemplate === 'professional' ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-600 to-pink-600'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/50">
            {cvData.personal.profileImage ? (
              <img src={cvData.personal.profileImage} className="w-full h-full rounded-full object-cover" alt="Profile" />
            ) : (
              <User size={40} className="text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{cvData.personal.fullName || 'ឈ្មោះពេញ'}</h1>
            <p className="text-white/90 text-lg mt-1">{cvData.personal.title || 'មុខតំណែង'}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-200 mb-4">
          {cvData.personal.email && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} /> {cvData.personal.email}
            </div>
          )}
          {cvData.personal.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} /> {cvData.personal.phone}
            </div>
          )}
          {cvData.personal.address && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} /> {cvData.personal.address}
            </div>
          )}
          {cvData.personal.dateOfBirth && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} /> {cvData.personal.dateOfBirth}
            </div>
          )}
        </div>

        {/* Summary */}
        {cvData.personal.summary && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
              <User size={18} /> អំពីខ្ញុំ
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {cvData.personal.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {cvData.experience.filter(exp => exp.jobTitle).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Briefcase size={18} /> បទពិសោធន៍ការងារ
            </h3>
            {cvData.experience.map(exp => exp.jobTitle && (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} - {exp.current ? 'បច្ចុប្បន្ន' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cvData.education.filter(edu => edu.degree).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <GraduationCap size={18} /> ការសិក្សា
            </h3>
            {cvData.education.map(edu => edu.degree && (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {cvData.skills.filter(s => s.name).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Code size={18} /> ជំនាញ
            </h3>
            <div className="flex flex-wrap gap-3">
              {cvData.skills.map(skill => skill.name && (
                <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs text-gray-500 ml-2">{getSkillStars(skill.level)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {cvData.languages.filter(l => l.name).length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Languages size={18} /> ភាសា
            </h3>
            <div className="space-y-2">
              {cvData.languages.map(lang => lang.name && (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-gray-700">{lang.name}</span>
                  <span className="text-sm text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CV Builder Pro
                </span>
                <p className="text-xs text-gray-500">បង្កើត CV ប្រកបដោយវិជ្ជាជីវៈ</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setActiveTemplate(template.id)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTemplate === template.id
                      ? `bg-${template.color}-100 text-${template.color}-700 border-2 border-${template.color}-200 shadow-md`
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{template.icon}</span>
                  <span>{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setCurrentStep(step.number)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110' :
                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                      }`}
                    >
                      {isCompleted ? <CheckCircle size={20} /> : <StepIcon size={20} />}
                    </button>
                    <span className={`text-xs mt-2 text-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 rounded ${currentStep > step.number + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Main Content - Split Screen */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">ព័ត៌មានផ្ទាល់ខ្លួន</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">ឈ្មោះពេញ</label>
                      <input type="text" value={cvData.personal.fullName} onChange={(e) => handlePersonalChange('fullName', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="ឈ្មោះពេញ" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">មុខតំណែង</label>
                      <input type="text" value={cvData.personal.title} onChange={(e) => handlePersonalChange('title', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="មុខតំណែង" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">អ៊ីមែល</label>
                      <input type="email" value={cvData.personal.email} onChange={(e) => handlePersonalChange('email', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="អ៊ីមែល" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">លេខទូរស័ព្ទ</label>
                      <input type="tel" value={cvData.personal.phone} onChange={(e) => handlePersonalChange('phone', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="លេខទូរស័ព្ទ" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">អាសយដ្ឋាន</label>
                      <input type="text" value={cvData.personal.address} onChange={(e) => handlePersonalChange('address', e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="អាសយដ្ឋាន" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">សេចក្តីសង្ខេប</label>
                      <textarea value={cvData.personal.summary} onChange={(e) => handlePersonalChange('summary', e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg" placeholder="រៀបរាប់អំពីខ្លួនអ្នក..." />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">បទពិសោធន៍ការងារ</h2>
                  {cvData.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 relative">
                      {cvData.experience.length > 1 && (
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 p-1 text-red-500">
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="space-y-3">
                        <input type="text" value={exp.jobTitle} onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="មុខតំណែង" />
                        <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="ក្រុមហ៊ុន" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} className="px-3 py-2 border rounded-lg" />
                          <input type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} className="px-3 py-2 border rounded-lg" disabled={exp.current} />
                        </div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)} />
                          <span className="text-sm">កំពុងបំពេញការងារ</span>
                        </label>
                        <textarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-lg" placeholder="ការពិពណ៌នា..." />
                      </div>
                    </div>
                  ))}
                  <button onClick={addExperience} className="w-full py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-semibold flex items-center justify-center gap-2">
                    <Plus size={16} /> បន្ថែមបទពិសោធន៍
                  </button>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">ការសិក្សា</h2>
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4 relative">
                      {cvData.education.length > 1 && (
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 p-1 text-red-500">
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="space-y-3">
                        <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="សញ្ញាបត្រ" />
                        <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="ស្ថាប័ន" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} className="px-3 py-2 border rounded-lg" placeholder="ឆ្នាំចាប់ផ្តើម" />
                          <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} className="px-3 py-2 border rounded-lg" placeholder="ឆ្នាំបញ្ចប់" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addEducation} className="w-full py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-semibold flex items-center justify-center gap-2">
                    <Plus size={16} /> បន្ថែមការសិក្សា
                  </button>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">ជំនាញ & ភាសា</h2>
                  
                  <div>
                    <h3 className="font-semibold mb-2">ជំនាញ</h3>
                    {cvData.skills.map((skill) => (
                      <div key={skill.id} className="flex gap-2 mb-2">
                        <input type="text" value={skill.name} onChange={(e) => updateSkill(skill.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg" placeholder="ជំនាញ" />
                        <select value={skill.level} onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))} className="w-24 px-2 py-2 border rounded-lg">
                          <option value={1}>⭐</option><option value={2}>⭐⭐</option><option value={3}>⭐⭐⭐</option>
                          <option value={4}>⭐⭐⭐⭐</option><option value={5}>⭐⭐⭐⭐⭐</option>
                        </select>
                        {cvData.skills.length > 1 && (
                          <button onClick={() => removeSkill(skill.id)} className="p-2 text-red-500"><Trash2 size={16} /></button>
                        )}
                      </div>
                    ))}
                    <button onClick={addSkill} className="text-blue-600 text-sm flex items-center gap-1"><Plus size={14} /> បន្ថែមជំនាញ</button>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">ភាសា</h3>
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="flex gap-2 mb-2">
                        <input type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg" placeholder="ភាសា" />
                        <select value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)} className="w-32 px-2 py-2 border rounded-lg">
                          <option>ថ្នាក់ដំបូង</option><option>មធ្យម</option><option>ស្ទាត់ជំនាញ</option><option>ភាសាកំណើត</option>
                        </select>
                        {cvData.languages.length > 1 && (
                          <button onClick={() => removeLanguage(lang.id)} className="p-2 text-red-500"><Trash2 size={16} /></button>
                        )}
                      </div>
                    ))}
                    <button onClick={addLanguage} className="text-blue-600 text-sm flex items-center gap-1"><Plus size={14} /> បន្ថែមភាសា</button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-between">
              {currentStep > 1 && (
                <button onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border rounded-lg text-gray-700 font-medium flex items-center gap-2">
                  <ArrowLeft size={16} /> ត្រឡប់
                </button>
              )}
              {currentStep < 4 && (
                <button onClick={() => setCurrentStep(currentStep + 1)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 ml-auto">
                  បន្ទាប់ <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Live CV Preview */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className={`p-4 border-b ${
                activeTemplate === 'modern' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                activeTemplate === 'professional' ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-600 to-pink-600'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <h3 className="font-semibold">ការមើលជាមុន (Live Preview)</h3>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">ធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ</span>
                </div>
              </div>
              <div className="p-4 max-h-[600px] overflow-y-auto">
                <CVPreview />
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex gap-3">
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 text-sm">
                  <Download size={16} /> ទាញយក PDF
                </button>
                <button className="flex-1 py-2 bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 text-sm">
                  <Save size={16} /> រក្សាទុក
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Zap size={20} className="text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">គន្លឹះសម្រាប់បង្កើត CV ដ៏មានប្រសិទ្ធភាព</h4>
              <p className="text-xs text-gray-600">បំពេញព័ត៌មានក្នុងទម្រង់ ហើយ CV របស់អ្នកនឹងត្រូវបានបង្ហាញជាមុននៅផ្នែកខាងស្តាំភ្លាមៗ!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCVPage;