// components/cv/CvPreview.jsx
import React from "react";

const CvPreview = ({ formData }) => {
  const {
    title,
    phone,
    address,
    linkedin,
    telegram,
    summary,
    educations,
    experiences,
    skills,
    profile_image,
  } = formData;

  // Function to get image URL
  const getImageUrl = (image) => {
    if (!image) return null;
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    if (typeof image === 'string' && image.startsWith('http')) {
      return image;
    }
    if (typeof image === 'string') {
      return `http://localhost:8000/storage/${image}`;
    }
    return null;
  };

  const imageUrl = getImageUrl(profile_image);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header with Profile Image */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-6">
        <div className="flex items-center gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Profile"}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
              {title?.charAt(0)?.toUpperCase() || "C"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold truncate">{title || "Untitled CV"}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-300">
              {phone && <span>{phone}</span>}
              {address && <span>{address}</span>}
              {linkedin && <span className="truncate max-w-[200px]">{linkedin}</span>}
              {telegram && <span>{telegram}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary */}
        {summary && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 uppercase tracking-wider">
              Profile
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && experiences.some(exp => exp.company_name || exp.position) && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 uppercase tracking-wider">
              Experience
            </h3>
            <div className="space-y-3 mt-2">
              {experiences.map((exp, index) => (
                (exp.company_name || exp.position) && (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{exp.position || "Position"}</p>
                        <p className="text-sm text-gray-600">{exp.company_name || "Company"}</p>
                      </div>
                      {(exp.start_date || exp.end_date) && (
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {exp.start_date} {exp.end_date && `- ${exp.end_date}`}
                          {!exp.end_date && " - Present"}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations && educations.length > 0 && educations.some(edu => edu.school_name || edu.degree) && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-2 mt-2">
              {educations.map((edu, index) => (
                (edu.school_name || edu.degree) && (
                  <div key={index}>
                    <p className="font-medium text-gray-800">{edu.degree || "Degree"}</p>
                    <p className="text-sm text-gray-600">{edu.school_name || "School"}</p>
                    {(edu.start_year || edu.end_year) && (
                      <span className="text-xs text-gray-400">
                        {edu.start_year} {edu.end_year && `- ${edu.end_year}`}
                        {!edu.end_year && " - Present"}
                      </span>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 uppercase tracking-wider">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CvPreview;