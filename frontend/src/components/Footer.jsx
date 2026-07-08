import {
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronRight,
  ArrowUp,
  Briefcase,
  Clock,
  Heart,
  
} from "lucide-react";
import { useState, useEffect } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "អំពីយើង", href: "#" },
    { name: "ទំនាក់ទំនង", href: "#" },
    { name: "គោលការណ៍ឯកជនភាព", href: "#" },
    { name: "លក្ខខណ្ឌសេវាកម្ម", href: "#" },
    { name: "សំណួរញឹកញាប់", href: "#" },
    { name: "ប្លុក", href: "#" },
  ];

  const jobCategories = [
    { name: "អភិវឌ្ឍន៍វេប", count: 120 },
    { name: "រចនា", count: 80 },
    { name: "ទីផ្សារ", count: 65 },
    { name: "សេវាកម្មអតិថិជន", count: 95 },
    { name: "គណនេយ្យ", count: 40 },
    { name: "ជំនួញ", count: 50 },
  ];

  const contactInfo = [
    { icon: <MapPin size={18} />, text: "ផ្លូវ ១២៣, ភ្នំពេញ, កម្ពុជា" },
    { icon: <Phone size={18} />, text: "+855 12 345 678" },
    { icon: <Mail size={18} />, text: "info@jobportal.com" },
  ];

  // const socialLinks = [
  //   { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
  //   { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
  //   { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  //   { icon: <Youtube size={20} />, href: "#", label: "YouTube" },
  //   { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  // ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1 - Brand & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 p-2.5 rounded-xl">
                <Briefcase size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Srolanh Career
              </h2>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              ភ្ជាប់អ្នកជំនាញដែលមានទេពកោសល្យជាមួយនឹងឱកាសការងារល្អៗ 
              ស្វែងរកការងារក្នុងក្តីស្រមៃរបស់អ្នក ឬបេក្ខជនដ៏ល្អឥតខ្ចោះជាមួយយើង។
            </p>

            {/* Social Links */}
            {/* <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div> */}

            {/* Trust Badges */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <span>វេទិកាសុវត្ថិភាព ១០០%</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <span>ក្រុមហ៊ុនដែលបានផ្ទៀងផ្ទាត់</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              តំណភ្ជាប់រហ័ស
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={14} className="text-gray-600" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Popular Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              ប្រភេទការងារពេញនិយម
            </h3>
            <ul className="space-y-3">
              {jobCategories.slice(0, 5).map((category, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight size={14} className="text-gray-600" />
                      {category.name}
                    </span>
                    <span className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              ទទួលបានព័ត៌មានថ្មីៗ
            </h3>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <p className="text-gray-400 text-sm mb-3">
                ទទួលបានដំណឹងអំពីការងារថ្មីៗ និងគន្លឹះអាជីពតាមរយៈអ៊ីមែលរបស់អ្នក។
              </p>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="បញ្ចូលអ៊ីមែលរបស់អ្នក"
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Send size={16} className="text-gray-300" />
                </button>
              </div>
              
              {isSubscribed && (
                <div className="mt-2 text-xs text-green-400">
                  ✓ បានចុះឈ្មោះដោយជោគជ័យ!
                </div>
              )}
            </form>

            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="text-gray-500">{info.icon}</div>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>

            {/* Working Hours */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} className="text-gray-500" />
              <span>ច័ន្ទ - សុក្រ: ៨:០០ ព្រឹក - ៦:០០ ល្ងាច</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; {currentYear} JobPortal. រក្សាសិទ្ធិគ្រប់យ៉ាង។
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">គោលការណ៍ឯកជនភាព</a>
            <a href="#" className="hover:text-white transition-colors">លក្ខខណ្ឌសេវាកម្ម</a>
            <a href="#" className="hover:text-white transition-colors">ខូគី</a>
          </div>

          <div className="flex items-center gap-1">
            <span>បង្កើតឡើងដោយ</span>
            <Heart size={14} className="text-gray-600" />
            <span>សម្រាប់អ្នកស្វែងរកការងារ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;