import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  Headphones,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "អាសយដ្ឋាន",
      titleEn: "Address",
      details: ["អគារលេខ ១២៣ ផ្លូវ ម៉ៅ សេទុង", "រាជធានីភ្នំពេញ កម្ពុជា"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Phone size={24} />,
      title: "ទូរស័ព្ទ",
      titleEn: "Phone",
      details: ["+855 12 345 678", "+855 98 765 432"],
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Mail size={24} />,
      title: "អ៊ីមែល",
      titleEn: "Email",
      details: ["info@jobportal.com", "support@jobportal.com"],
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Clock size={24} />,
      title: "ម៉ោងបើក",
      titleEn: "Working Hours",
      details: ["ចន្ទ - សុក្រ: ៨:០០ - ១៧:០០", "សៅរ៍: ៨:០០ - ១២:០០"],
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const faqs = [
    {
      question: "តើធ្វើដូចម្តេចដើម្បីចុះឈ្មោះស្វែងរកការងារ?",
      answer: "អ្នកអាចចុះឈ្មោះដោយឥតគិតថ្លៃតាមរយៈប៊ូតុង 'ចុះឈ្មោះ' នៅលើទំព័រដើម បន្ទាប់មកបំពេញព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក។"
    },
    {
      question: "តើការប្រើប្រាស់សេវាកម្មគិតថ្លៃទេ?",
      answer: "សម្រាប់អ្នកស្វែងរកការងារ សេវាកម្មរបស់យើងគឺឥតគិតថ្លៃទាំងស្រុង។ សម្រាប់ក្រុមហ៊ុន មានតម្លៃសមរម្យតាមកញ្ចប់សេវាកម្ម។"
    },
    {
      question: "តើអាចបង្ហោះការងារបានប៉ុន្មាន?",
      answer: "អាស្រ័យលើកញ្ចប់សេវាកម្មដែលអ្នកជ្រើសរើស ចាប់ពី ៥ ទៅ ៥០ ការងារក្នុងមួយខែ។"
    },
    {
      question: "តើធ្វើដូចម្តេចដើម្បីកែប្រែប្រវត្តិរូប?",
      answer: "ចូលទៅកាន់គណនីរបស់អ្នក បន្ទាប់មកចុចលើ 'កែប្រែប្រវត្តិរូប' ដើម្បីធ្វើបច្ចុប្បន្នភាពព័ត៌មានរបស់អ្នក។"
    }
  ];

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover pointer-events-none"
          style={{
            backgroundImage:
              "url('https://jobify.works/assets/img/img-parallax.5d0c811.jpg')",
          }}
        ></div>
       
        <div className="relative max-w-7xl mx-auto px-6 md:px-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">ទំនាក់ទំនងមកយើង</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            យើងខ្ញុំសូមស្វាគមន៍រាល់សំណួរ យោបល់ និងមតិកែលម្អរបស់លោកអ្នក
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`inline-flex p-3 rounded-xl mb-4 ${info.color}`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{info.titleEn}</p>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ផ្ញើសារមកយើង</h2>
              <p className="text-gray-600 mb-6">បំពេញព័ត៌មានខាងក្រោម យើងខ្ញុំនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ឈ្មោះពេញ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      អ៊ីមែល <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      លេខទូរស័ព្ទ
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="+855 XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ប្រធានបទ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="ប្រធានបទសាររបស់អ្នក"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    សារ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    placeholder="សូមបញ្ចូលសាររបស់អ្នក..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>កំពុងផ្ញើ...</>
                  ) : (
                    <>
                      <Send size={18} />
                      ផ្ញើសារ
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle size={18} />
                    <span>សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ! យើងនឹងទាក់ទងអ្នកវិញក្នុងពេលឆាប់ៗ។</span>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Support Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-gray-200 relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.014719999982!2d104.880555!3d11.556355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951add5e2cd81%3A0x171e0b69c7c6f7ba!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1699999999999!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">ទីតាំងការិយាល័យ</h3>
                  <p className="text-gray-600">ស្ថិតនៅកណ្តាលទីក្រុង ងាយស្រួលធ្វើដំណើរ</p>
                </div>
              </div>

              {/* Support Channels */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones size={24} className="text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">សេវាកម្មអតិថិជន</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  យើងខ្ញុំត្រៀមខ្លួនជួយអ្នក ២៤/៧ តាមរយៈឆានែលផ្សេងៗ
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-600" />
                    <span className="text-gray-700">+855 12 345 678 (សេវាកម្មអតិថិជន)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600" />
                    <span className="text-gray-700">support@jobportal.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle size={18} className="text-blue-600" />
                    <span className="text-gray-700">Telegram: @JobPortalSupport</span>
                  </div>
                </div>
              </div>

              {/* Social Links - Using react-icons */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">តាមដានពួកយើង</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                    <FaFacebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition">
                    <FaLinkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">សំណួរដែលគេសួរញឹកញាប់</h2>
            <p className="text-gray-600">ចម្លើយចំពោះសំណួរទូទៅរបស់អតិថិជនយើង</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start gap-2">
                  <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">ត្រូវការជំនួយបន្ថែម?</h2>
          <p className="text-lg mb-6">
            ចូលរួមជាមួយសហគមន៍របស់យើង ឬទាក់ទងមកយើងដោយផ្ទាល់
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
              ចូលរួមសហគមន៍
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              ជជែកផ្ទាល់
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;