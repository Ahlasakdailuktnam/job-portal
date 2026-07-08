import React, { useState, useEffect } from 'react';
import { Card } from '../../common';
import { 
  Phone, 
  MapPin, 
  Send, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  MapIcon
} from 'lucide-react';

const Preview = ({ formData }) => {
  const { 
    title, 
    phone, 
    address, 
    linkedin, 
    telegram, 
    summary, 
    profile_image, 
    educations, 
    experiences, 
    skills,
    template = 'classic'
  } = formData;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (profile_image instanceof File) {
      const url = URL.createObjectURL(profile_image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(profile_image);
    }
  }, [profile_image]);

  const renderTemplate = () => {
    switch(template) {
      case 'modern':
        return <ModernTemplate formData={formData} imageUrl={imageUrl} />;
      case 'minimal':
        return <MinimalTemplate formData={formData} imageUrl={imageUrl} />;
      case 'professional':
        return <ProfessionalTemplate formData={formData} imageUrl={imageUrl} />;
      case 'creative':
        return <CreativeTemplate formData={formData} imageUrl={imageUrl} />;
      default:
        return <ClassicTemplate formData={formData} imageUrl={imageUrl} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 px-4 py-3 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">Live Preview</h3>
      </div>
      <div className="p-0">
        {renderTemplate()}
      </div>
    </div>
  );
};

// ============================================
// TEMPLATE 1: CLASSIC (Professional Sidebar)
// ============================================
const ClassicTemplate = ({ formData, imageUrl }) => {
  const { title, phone, address, linkedin, telegram, summary, educations, experiences, skills } = formData;

  return (
    <div className="flex flex-col md:flex-row min-h-[600px] bg-white">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-gray-900 text-white p-6 flex-shrink-0">
        {imageUrl && (
          <div className="flex justify-center mb-4">
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-white/20" 
            />
          </div>
        )}
        
        <h2 className="text-lg font-bold text-center break-words">
          {title || 'Your Name'}
        </h2>
        
        <div className="mt-4 space-y-2 text-sm text-gray-300">
          {phone && (
            <div className="flex items-start gap-2">
              <Phone size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="break-words">{phone}</span>
            </div>
          )}
          {address && (
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="break-words">{address}</span>
            </div>
          )}
          {linkedin && (
            <div className="flex items-start gap-2">
              <MapIcon size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="break-words text-sm truncate">{linkedin}</span>
            </div>
          )}
          {telegram && (
            <div className="flex items-start gap-2">
              <Send size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="break-words">{telegram}</span>
            </div>
          )}
        </div>

        {skills?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider border-b border-white/20 pb-2 flex items-center gap-2">
              <Wrench size={12} />
              Skills
            </h3>
            <div className="mt-2 space-y-1">
              {skills.map((skill, index) => (
                <div key={index} className="text-sm text-gray-300 break-words">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white overflow-hidden">
        {summary && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2 flex items-center gap-2">
              <User size={12} />
              Profile
            </h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed break-words">{summary}</p>
          </div>
        )}

        {experiences?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2 flex items-center gap-2">
              <Briefcase size={12} />
              Experience
            </h3>
            <div className="space-y-4 mt-2">
              {experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 break-words">{exp.position || 'Position'}</p>
                      <p className="text-sm text-gray-600 break-words">{exp.company_name || 'Company'}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.start_date || 'Start'} {exp.end_date && `- ${exp.end_date}`}
                      {!exp.end_date && exp.start_date && ' - Present'}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {educations?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2 flex items-center gap-2">
              <GraduationCap size={12} />
              Education
            </h3>
            <div className="space-y-2 mt-2">
              {educations.map((edu, index) => (
                <div key={index}>
                  <p className="font-semibold text-gray-800 break-words">{edu.degree || 'Degree'}</p>
                  <p className="text-sm text-gray-600 break-words">{edu.school_name || 'School'}</p>
                  <span className="text-xs text-gray-500">
                    {edu.start_year || 'Start'} {edu.end_year && `- ${edu.end_year}`}
                    {!edu.end_year && edu.start_year && ' - Present'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// TEMPLATE 2: MODERN (Header + Two-Column)
// ============================================
const ModernTemplate = ({ formData, imageUrl }) => {
  const { title, phone, address, linkedin, telegram, summary, educations, experiences, skills } = formData;

  return (
    <div className="bg-white min-h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-5">
        <div className="flex flex-wrap items-center gap-4">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30" 
            />
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold break-words">{title || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-300 mt-1">
              {phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {phone}
                </span>
              )}
              {address && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {address}
                </span>
              )}
              {linkedin && (
                <span className="flex items-center gap-1">
                  <MapIcon size={12} /> {linkedin}
                </span>
              )}
              {telegram && (
                <span className="flex items-center gap-1">
                  <Send size={12} /> {telegram}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[300px]">
        <div className="col-span-1 bg-gray-50 p-5 border-r border-gray-200">
          {summary && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <User size={12} /> Profile
              </h3>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed break-words">{summary}</p>
            </div>
          )}
          
          {skills?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench size={12} /> Skills
              </h3>
              <div className="mt-2 space-y-1">
                {skills.map((skill, index) => (
                  <div key={index} className="text-sm text-gray-700 break-words">{skill.name}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-3 p-5">
          {experiences?.length > 0 && (
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase size={12} /> Experience
              </h3>
              <div className="space-y-3 mt-2">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 break-words">{exp.position || 'Position'}</p>
                        <p className="text-sm text-gray-600 break-words">{exp.company_name || 'Company'}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {exp.start_date || 'Start'} {exp.end_date && `- ${exp.end_date}`}
                        {!exp.end_date && exp.start_date && ' - Present'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {educations?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap size={12} /> Education
              </h3>
              <div className="space-y-2 mt-2">
                {educations.map((edu, index) => (
                  <div key={index} className="border-b border-gray-100 pb-2 last:border-0">
                    <p className="font-semibold text-gray-800 break-words">{edu.degree || 'Degree'}</p>
                    <p className="text-sm text-gray-600 break-words">{edu.school_name || 'School'}</p>
                    <span className="text-xs text-gray-500">
                      {edu.start_year || 'Start'} {edu.end_year && `- ${edu.end_year}`}
                      {!edu.end_year && edu.start_year && ' - Present'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TEMPLATE 3: MINIMAL (Clean Single Column)
// ============================================
const MinimalTemplate = ({ formData, imageUrl }) => {
  const { title, phone, address, linkedin, telegram, summary, educations, experiences, skills } = formData;

  return (
    <div className="bg-white min-h-[600px] p-6 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-16 h-16 rounded-full object-cover mx-auto mb-2" 
          />
        )}
        <h1 className="text-2xl font-light tracking-wide break-words">{title || 'Your Name'}</h1>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
          {phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} /> {phone}
            </span>
          )}
          {address && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {address}
            </span>
          )}
          {linkedin && (
            <span className="flex items-center gap-1">
              <MapIcon size={12} /> {linkedin}
            </span>
          )}
          {telegram && (
            <span className="flex items-center gap-1">
              <Send size={12} /> {telegram}
            </span>
          )}
        </div>
      </div>

      {summary && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
            <User size={12} /> Profile
          </h3>
          <p className="text-sm text-gray-700 mt-2 leading-relaxed break-words">{summary}</p>
        </div>
      )}

      {experiences?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
            <Briefcase size={12} /> Experience
          </h3>
          <div className="space-y-3 mt-2">
            {experiences.map((exp, index) => (
              <div key={index} className="border-b border-gray-50 pb-2 last:border-0">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 break-words">{exp.position || 'Position'}</p>
                    <p className="text-sm text-gray-600 break-words">{exp.company_name || 'Company'}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {exp.start_date || 'Start'} {exp.end_date && `- ${exp.end_date}`}
                    {!exp.end_date && exp.start_date && ' - Present'}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {educations?.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
            <GraduationCap size={12} /> Education
          </h3>
          <div className="space-y-2 mt-2">
            {educations.map((edu, index) => (
              <div key={index} className="border-b border-gray-50 pb-2 last:border-0">
                <p className="font-semibold text-gray-800 break-words">{edu.degree || 'Degree'}</p>
                <p className="text-sm text-gray-600 break-words">{edu.school_name || 'School'}</p>
                <span className="text-xs text-gray-400">
                  {edu.start_year || 'Start'} {edu.end_year && `- ${edu.end_year}`}
                  {!edu.end_year && edu.start_year && ' - Present'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills?.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
            <Wrench size={12} /> Skills
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full break-words border border-gray-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// TEMPLATE 4: PROFESSIONAL (Executive Style)
// ============================================
const ProfessionalTemplate = ({ formData, imageUrl }) => {
  const { title, phone, address, linkedin, telegram, summary, educations, experiences, skills } = formData;

  return (
    <div className="bg-white min-h-[600px]">
      <div className="border-b-4 border-gray-800 bg-gray-50 px-6 py-5">
        <div className="flex flex-wrap items-center gap-4">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover border-3 border-gray-800" 
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800 break-words">{title || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mt-1">
              {phone && (
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {phone}
                </span>
              )}
              {address && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {address}
                </span>
              )}
              {linkedin && (
                <span className="flex items-center gap-1">
                  <MapIcon size={12} /> {linkedin}
                </span>
              )}
              {telegram && (
                <span className="flex items-center gap-1">
                  <Send size={12} /> {telegram}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {summary && (
          <div className="mb-5">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-2 flex items-center gap-2">
              <User size={12} /> Professional Summary
            </h3>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed break-words">{summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            {experiences?.length > 0 && (
              <div className="mb-5">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-2 flex items-center gap-2">
                  <Briefcase size={12} /> Experience
                </h3>
                <div className="space-y-3 mt-2">
                  {experiences.map((exp, index) => (
                    <div key={index}>
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 break-words">{exp.position || 'Position'}</p>
                          <p className="text-sm text-gray-600 break-words">{exp.company_name || 'Company'}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {exp.start_date || 'Start'} {exp.end_date && `- ${exp.end_date}`}
                          {!exp.end_date && exp.start_date && ' - Present'}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-2 flex items-center gap-2">
                  <GraduationCap size={12} /> Education
                </h3>
                <div className="space-y-2 mt-2">
                  {educations.map((edu, index) => (
                    <div key={index}>
                      <p className="font-bold text-gray-800 break-words">{edu.degree || 'Degree'}</p>
                      <p className="text-sm text-gray-600 break-words">{edu.school_name || 'School'}</p>
                      <span className="text-xs text-gray-500">
                        {edu.start_year || 'Start'} {edu.end_year && `- ${edu.end_year}`}
                        {!edu.end_year && edu.start_year && ' - Present'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1">
            {skills?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-2 flex items-center gap-2">
                  <Wrench size={12} /> Skills
                </h3>
                <div className="space-y-1 mt-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-sm text-gray-700 break-words">{skill.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// TEMPLATE 5: CREATIVE (Unique Design)
// ============================================
const CreativeTemplate = ({ formData, imageUrl }) => {
  const { title, phone, address, linkedin, telegram, summary, educations, experiences, skills } = formData;

  return (
    <div className="bg-white min-h-[600px]">
      <div className="bg-gray-900 text-white px-6 py-5 relative">
        <div className="flex flex-wrap items-center gap-4">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-3 border-white/30" 
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold break-words">{title || 'Your Name'}</h1>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-300 mt-1">
              {phone && (
                <span className="flex items-center gap-1.5">
                  <Phone size={13} /> {phone}
                </span>
              )}
              {address && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> {address}
                </span>
              )}
              {linkedin && (
                <span className="flex items-center gap-1.5">
                  <MapIcon size={13} /> {linkedin}
                </span>
              )}
              {telegram && (
                <span className="flex items-center gap-1.5">
                  <Send size={13} /> {telegram}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
      </div>

      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="col-span-2">
            {summary && (
              <div className="mb-5">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-3 border-gray-700 pl-3 flex items-center gap-2">
                  <User size={12} /> About
                </h3>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed break-words">{summary}</p>
              </div>
            )}

            {experiences?.length > 0 && (
              <div className="mb-5">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-3 border-gray-700 pl-3 flex items-center gap-2">
                  <Briefcase size={12} /> Experience
                </h3>
                <div className="space-y-3 mt-2">
                  {experiences.map((exp, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800 break-words">{exp.position || 'Position'}</p>
                          <p className="text-sm text-gray-600 break-words">{exp.company_name || 'Company'}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {exp.start_date || 'Start'} {exp.end_date && `- ${exp.end_date}`}
                          {!exp.end_date && exp.start_date && ' - Present'}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {educations?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-l-3 border-gray-700 pl-3 flex items-center gap-2">
                  <GraduationCap size={12} /> Education
                </h3>
                <div className="space-y-2 mt-2">
                  {educations.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="font-bold text-gray-800 break-words">{edu.degree || 'Degree'}</p>
                      <p className="text-sm text-gray-600 break-words">{edu.school_name || 'School'}</p>
                      <span className="text-xs text-gray-500">
                        {edu.start_year || 'Start'} {edu.end_year && `- ${edu.end_year}`}
                        {!edu.end_year && edu.start_year && ' - Present'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1">
            {skills?.length > 0 && (
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-700 pb-2 flex items-center gap-2">
                  <Wrench size={12} /> Skills
                </h3>
                <div className="mt-2 space-y-1">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-sm text-gray-700 break-words">{skill.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;