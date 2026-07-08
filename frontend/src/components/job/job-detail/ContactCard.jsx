// components/job/ContactCard.jsx
import React from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  MessageCircle,
 
  Link2,
  Users,
  Calendar,
  Award,
} from "lucide-react";

const ContactItem = ({ icon: Icon, label, value }) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors duration-200">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-700 mt-0.5 break-words">
          {value}
        </p>
      </div>
    </div>
  );
};

const SocialButton = ({ href, icon: Icon, label }) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
};

const ContactCard = ({ job }) => {
  // Use static data if job doesn't provide company info
  const company = job?.company || {};
  
  const companyName = company.company_name || job?.company_name || "Jobify";
  const companyAddress = company.address || "#12, Street 2001, Phum Paprak Khang Tboung, Sangkat Kakab, Khan Porsenchey, Phnom Penh, Cambodia";
  const companyPhone = company.phone || company.contact_tlg || "+855 93 739 400";
  const companyEmail = company.email || company.contact_email || "info@jobify.works";

  // Parse social links if it's a JSON string
  let socialLinks = {};
  try {
    if (company.social) {
      socialLinks = typeof company.social === 'string' 
        ? JSON.parse(company.social) 
        : company.social;
    }
  } catch (e) {
    socialLinks = {};
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Company Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Company Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
              {company.logo ? (
                <img
                    src={`http://localhost:8000/storage/${company.logo}`}
                  alt={companyName}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Building2 className="w-8 h-8 text-gray-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-lg font-semibold truncate">
                {companyName}
              </h3>
              <p className="text-gray-300 text-sm">
                {company.industry || "ក្រុមហ៊ុន"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-5">
          <ContactItem
            icon={MapPin}
            label="អាសយដ្ឋាន"
            value={companyAddress}
          />

          <ContactItem
            icon={Phone}
            label="ទូរស័ព្ទ"
            value={companyPhone}
          />

          <ContactItem
            icon={Mail}
            label="អ៊ីមែល"
            value={companyEmail}
          />

          <ContactItem
            icon={Globe}
            label="គេហទំព័រ"
            value={company.website || "https://jobify.works"}
          />

          <ContactItem
            icon={Clock}
            label="ម៉ោងធ្វើការ"
            value="ច័ន្ទ - សុក្រ, ៨:០០ព្រឹក - ៦:០០ល្ងាច"
          />

          {company.employees && (
            <ContactItem
              icon={Users}
              label="បុគ្គលិក"
              value={`${company.employees} នាក់`}
            />
          )}

          {company.founded && (
            <ContactItem
              icon={Calendar}
              label="បង្កើតឡើង"
              value={company.founded}
            />
          )}
        </div>
      </div>

      
      {/* Map Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          ទីតាំងក្រុមហ៊ុន
        </h3>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <iframe
            title="company-map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              companyAddress
            )}&z=15&output=embed`}
            className="w-full h-56 border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          {companyAddress}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;