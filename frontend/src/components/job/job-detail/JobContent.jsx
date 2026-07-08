// components/job/JobContent.jsx
import React from "react";
import {
  Target,
  Zap,
  FileText,
  ClipboardList,
  Briefcase,
  CheckCircle,
  Users,
  Award,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  GraduationCap,
  Globe,
} from "lucide-react";

const SectionCard = ({ icon: Icon, title, children, className = "" }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 p-6 pb-0">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      <div className="p-6 pt-4">
        {children}
      </div>
    </div>
  );
};

const BulletContent = ({ text }) => {
  if (!text) return null;

  const lines = text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <ul className="space-y-2.5">
      {lines.map((line, index) => (
        <li
          key={index}
          className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
          <span>{line.replace(/^[-•]\s*/, "")}</span>
        </li>
      ))}
    </ul>
  );
};

const InfoGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => {
        if (!item.value) return null;
        return (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-sm font-medium text-gray-700 mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const JobContent = ({ job }) => {
 

  return (
    <div className="space-y-6">
      

      {job.requirement && (
        <SectionCard icon={Target} title="តម្រូវការការងារ">
          <BulletContent text={job.requirement} />
        </SectionCard>
      )}

      {/* Job Responsibility */}
      {job.responsibility && (
        <SectionCard icon={Zap} title="ភារកិច្ចការងារ">
          <BulletContent text={job.responsibility} />
        </SectionCard>
      )}

      {/* Job Description */}
      {job.description && (
        <SectionCard icon={FileText} title="ការពណ៌នាការងារ">
          <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
            {job.description}
          </div>
        </SectionCard>
      )}

      {/* How to Apply */}
      <SectionCard icon={CheckCircle} title="របៀបដាក់ពាក្យ">
        <ol className="space-y-2.5 list-decimal list-inside text-sm text-gray-600">
          <li>សូមចុះឈ្មោះគណនី Jobify</li>
          <li>ចុចបង្កើត ឬដាក់ CV របស់អ្នក</li>
          <li>បន្ទាប់ពីបង្កើត CV រួច សូមដាក់ពាក្យដោយចុចប៊ូតុង 'ដាក់ពាក្យឥឡូវនេះ'</li>
          <li>Jobify នឹងពិនិត្យ CV របស់អ្នក</li>
        </ol>
      </SectionCard>
    </div>
  );
};

export default JobContent;