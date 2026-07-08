import React from "react";
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  Shield,
  CheckCircle,
  Briefcase,
  Building2,
  BarChart3,
  Rocket,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Code,
  Palette,
  Megaphone,
  Headphones,
  Database,
  ChevronRight,
  Star,
  UserCheck,
  Zap,
  Heart,
  BookOpen,
} from "lucide-react";
import image3 from "../../assets/image3.png";
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnimation from "../../assets/Coding.json";
const AboutUs = () => {
  const services = [
    {
      title: "ការផ្សាយពាណិជ្ជកម្មការងារ",
      titleEn: "Job Posting",
      description: "ផ្សាយការងារទៅកាន់អ្នកស្វែងរកការងាររាប់ម៉ឺននាក់",
      icon: <Megaphone size={28} />,
    },
    {
      title: "ស្វែងរកប្រវត្តិរូប",
      titleEn: "CV Search",
      description: "ស្វែងរកប្រវត្តិរូបដែលត្រូវនឹងតម្រូវការរបស់អ្នក",
      icon: <Users size={28} />,
    },
    {
      title: "ប្រព័ន្ធគ្រប់គ្រង",
      titleEn: "Management System",
      description: "ប្រព័ន្ធគ្រប់គ្រងបេក្ខជនកម្រិតខ្ពស់",
      icon: <Database size={28} />,
    },
    {
      title: "បណ្តុះបណ្តាល",
      titleEn: "Training",
      description: "វគ្គបណ្តុះបណ្តាលជំនាញសម្រាប់អ្នកស្វែងរកការងារ",
      icon: <BookOpen size={28} />,
    },
  ];

  const team = [
    {
      name: "លោក ឡាញ់ផល្លា",
      position: "នាយកប្រតិបត្តិ និង អ្នកអភិវឌ្ឃន៍វេបសាយ",
      positionEn: "CEO and Web Developer",
      experience: "និស្សិតឆ្នាំទី២",
      image: image3,
    },
  ];

  const achievements = [
    {
      number: "10,000+",
      label: "ការងារដែលបានផ្សព្វផ្សាយ",
      icon: <Briefcase size={24} />,
    },
    { number: "5,000+", label: "ក្រុមហ៊ុនដៃគូ", icon: <Building2 size={24} /> },
    {
      number: "50,000+",
      label: "អ្នកស្វែងរកការងារ",
      icon: <Users size={24} />,
    },
    { number: "95%", label: "អត្រាពេញចិត្ត", icon: <Star size={24} /> },
    {
      number: "500+",
      label: "ព្រឹត្តិការណ៍ការងារ",
      icon: <Calendar size={24} />,
    },
    { number: "20+", label: "ពានរង្វាន់", icon: <Award size={24} /> },
  ];

  const historyMilestones = [
    {
      year: "២០២០",
      title: "ចាប់ផ្តើមអាជីវកម្ម",
      description: "បើកដំណើរការវេទិកាដំបូងបង្អស់",
      icon: <Rocket size={20} />,
    },
    {
      year: "២០២១",
      title: "ពង្រីកទីផ្សារ",
      description: "ពង្រីកសេវាកម្មដល់ខេត្តទាំងអស់",
      icon: <Globe size={20} />,
    },
    {
      year: "២០២២",
      title: "បច្ចេកវិទ្យាថ្មី",
      description: "ដាក់ឱ្យប្រើប្រាស់ AI Matching",
      icon: <Zap size={20} />,
    },
    {
      year: "២០២៣",
      title: "ដៃគូអន្តរជាតិ",
      description: "សហការជាមួយក្រុមហ៊ុនអន្តរជាតិ",
      icon: <TrendingUp size={20} />,
    },
    {
      year: "២០២៤",
      title: "សមិទ្ធផលថ្មី",
      description: "ទទួលបានពានរង្វាន់អាជីវកម្មឆ្នើម",
      icon: <Award size={20} />,
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section - Who We Are */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop"
            alt="Office"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              អំពីពួកយើង
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              បេសកកម្មរបស់យើងគឺតភ្ជាប់ទេពកោសល្យជាមួយឱកាស
            </p>
            <p className="text-gray-300 leading-relaxed">
              យើងជាវេទិកាឈានមុខគេក្នុងការតភ្ជាប់អ្នកស្វែងរកការងារ
              ជាមួយក្រុមហ៊ុនដែលកំពុងស្វែងរកបុគ្គលិកពូកែ។
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                រឿងរ៉ាវរបស់យើង
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-6">
                ចាប់ផ្តើមពីចំណង់ចំណូលចិត្តក្នុងការធ្វើ Project​ និងដោះស្រាយបញ្ហាផ្សេងៗ
              </h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                នៅឆ្នាំ២០២០
                យើងបានចាប់ផ្តើមជាមួយក្រុមការងារតូចមួយដែលមានចក្ខុវិស័យរួមគ្នា។
              </p>
              <p className="text-gray-600 leading-relaxed">
                សព្វថ្ងៃនេះ យើងបានក្លាយជាវេទិកាឈានមុខគេ ដោយមានក្រុមហ៊ុនជាង ៥,០០០
                និងអ្នកស្វែងរកការងារជាង ៥០,០០០ នាក់
                ទុកចិត្តប្រើប្រាស់សេវាកម្មរបស់យើង។
              </p>
            </div>
            <div>
              <Player
                autoplay
                loop
                src={loginAnimation}
                style={{
                  height: "400px",
                  width: "400px",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our History Timeline */}
      <section className="py-20 bg-white ">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              ប្រវត្តិរបស់យើង
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">
              ដំណើរឆ្ពោះទៅរកភាពជោគជ័យ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ព្រឹត្តិការណ៍សំខាន់ៗក្នុងការអភិវឌ្ឍន៍ក្រុមហ៊ុនរបស់យើង
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>
            <div className="space-y-12">
              {historyMilestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={`relative flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-5/12 ${idx % 2 === 0 ? "text-right pr-8" : "pl-8"}`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-2xl mb-2">
                        {milestone.icon}
                        <span>{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              សេវាកម្មរបស់យើង
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">
              អ្វីដែលយើងផ្តល់ជូន
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              សេវាកម្មទំនើបៗដើម្បីបំពេញតម្រូវការរបស់អ្នក
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-blue-600 mb-3">{service.titleEn}</p>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Achievements */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://jobify.works/assets/img/img-parallax.5d0c811.jpg')",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="text-white/80 text-sm uppercase tracking-wide">
              សមិទ្ធផលរបស់យើង
            </span>

            <h2 className="text-3xl lg:text-4xl font-bold mt-4 mb-4">
              លទ្ធផលដែលបង្ហាញពីភាពជោគជ័យ
            </h2>

            <p className="text-white/80 max-w-2xl mx-auto">
              តួលេខទាំងនេះបង្ហាញពីការលះបង់របស់យើងក្នុងការផ្តល់សេវាកម្មល្អបំផុត
            </p>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="text-center backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex p-3 bg-white/10 rounded-xl mb-3">
                  {achievement.icon}
                </div>

                <h3 className="text-2xl font-bold">{achievement.number}</h3>

                <p className="text-sm text-white/80">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              ក្រុមការងារ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">
              ជួបជាមួយក្រុមការងាររបស់យើង
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              អ្នកជំនាញដែលមានបទពិសោធន៍ ត្រៀមខ្លួនជួយអ្នក
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-70 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-1">
                    {member.position}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 mt-2">
                      {member.experience}
                    </p>
                    <p className="text-sm underline">មើលព័ត័មានបន្ថែម </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            ត្រៀមខ្លួនស្វែងរកការងារហើយឬនៅ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            ចូលរួមជាមួយពួកយើងថ្ងៃនេះ ដើម្បីស្វែងរកឱកាសការងារល្អបំផុត
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              ស្វែងរកការងារ
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              ទំនាក់ទំនងមកយើង
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
