import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Heart, 
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Phnom Penh, Cambodia",
    salary: "$1,500 - $2,500",
    type: "Full-time",
    experience: "3-5 years",
    logo: "🚀",
    tags: ["React", "TypeScript", "Next.js"],
    featured: true,
    urgent: true,
    postedAt: "2 hours ago",
    companyLogo: "T"
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote (Cambodia)",
    salary: "$1,200 - $2,000",
    type: "Full-time",
    experience: "2-4 years",
    logo: "🎨",
    tags: ["Figma", "Adobe XD", "User Research"],
    featured: true,
    urgent: false,
    postedAt: "5 hours ago",
    companyLogo: "C"
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Global Brands Ltd",
    location: "Siem Reap, Cambodia",
    salary: "$1,800 - $3,000",
    type: "Full-time",
    experience: "5+ years",
    logo: "📊",
    tags: ["SEO", "Social Media", "Analytics"],
    featured: false,
    urgent: true,
    postedAt: "1 day ago",
    companyLogo: "G"
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "DataHub Inc",
    location: "Phnom Penh, Cambodia",
    salary: "$1,800 - $2,800",
    type: "Full-time",
    experience: "3-6 years",
    logo: "⚙️",
    tags: ["Node.js", "Python", "PostgreSQL"],
    featured: true,
    urgent: false,
    postedAt: "3 hours ago",
    companyLogo: "D"
  },
  {
    id: 5,
    title: "Customer Support Specialist",
    company: "ServiceFirst",
    location: "Battambang, Cambodia",
    salary: "$500 - $800",
    type: "Full-time",
    experience: "1-2 years",
    logo: "💬",
    tags: ["Communication", "English", "Problem Solving"],
    featured: false,
    urgent: false,
    postedAt: "2 days ago",
    companyLogo: "S"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "CloudTech Asia",
    location: "Remote",
    salary: "$2,000 - $3,500",
    type: "Full-time",
    experience: "4-7 years",
    logo: "☁️",
    tags: ["AWS", "Docker", "Kubernetes"],
    featured: true,
    urgent: true,
    postedAt: "30 minutes ago",
    companyLogo: "C"
  }
];

const FeaturedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredJob, setHoveredJob] = useState(null);
  const scrollContainerRef = useRef(null);

  // For mobile slider
  const totalSlides = Math.ceil(featuredJobs.length / visibleJobs);
  
  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Responsive visible jobs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleJobs(1);
      } else if (window.innerWidth < 1024) {
        setVisibleJobs(2);
      } else {
        setVisibleJobs(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentJobs = featuredJobs.slice(
    currentSlide * visibleJobs,
    (currentSlide + 1) * visibleJobs
  );

  return (
    <section className="w-full py-24 px-6 md:px-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#5B4CF0]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF6B4A]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#5B4CF0]/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp size={16} className="text-[#5B4CF0]" />
            <span className="text-[#5B4CF0] font-semibold text-sm">Featured Opportunities</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            ការងារពិសេសសម្រាប់អ្នក
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ស្វែងរកការងារដែលមានគុណភាពខ្ពស់ពីក្រុមហ៊ុនល្បីៗ ជាមួយនឹងប្រាក់ខែ និងអត្ថប្រយោជន៍ល្អបំផុត
          </p>
        </div>

        {/* Job Cards Grid/Slider */}
        <div className="relative">
          {/* Desktop Grid View - Hidden on mobile, shown on desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <JobCard 
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onSave={() => handleSaveJob(job.id)}
                isHovered={hoveredJob === job.id}
                onHover={setHoveredJob}
              />
            ))}
          </div>

          {/* Mobile Slider View */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 gap-6">
                      {featuredJobs.slice(
                        slideIndex * visibleJobs,
                        (slideIndex + 1) * visibleJobs
                      ).map((job) => (
                        <JobCard 
                          key={job.id}
                          job={job}
                          isSaved={savedJobs.includes(job.id)}
                          onSave={() => handleSaveJob(job.id)}
                          isHovered={hoveredJob === job.id}
                          onHover={setHoveredJob}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all z-10"
            >
              <ChevronLeft size={24} className="text-[#5B4CF0]" />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all z-10"
            >
              <ChevronRight size={24} className="text-[#5B4CF0]" />
            </button>

            {/* Mobile Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 h-2 bg-[#5B4CF0] rounded-full"
                      : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="group relative inline-flex items-center gap-2 bg-[#5B4CF0] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <span>មើលការងារទាំងអស់</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual Job Card Component
const JobCard = ({ job, isSaved, onSave, isHovered, onHover }) => {
  const [isBookmarked, setIsBookmarked] = useState(isSaved);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onSave();
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 overflow-hidden"
      onMouseEnter={() => onHover(job.id)}
      onMouseLeave={() => onHover(null)}
    >
     

     

      {/* Bookmark Button */}
      <button 
        onClick={handleBookmark}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
      >
        <Bookmark 
          size={18} 
          className={isBookmarked ? "fill-[#5B4CF0] text-[#5B4CF0]" : "text-gray-400"}
        />
      </button>

      <div className="p-6">
        {/* Company Logo & Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5B4CF0] to-[#8B7DF0] flex items-center justify-center text-white text-2xl font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
            {job.company.charAt(0)}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#5B4CF0] transition-colors mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">{job.company}</p>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin size={16} className="text-[#5B4CF0]" />
            <span>{job.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <DollarSign size={16} className="text-[#5B4CF0]" />
            <span className="font-semibold text-gray-900">{job.salary}</span>
            <span className="text-gray-400">/ month</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Briefcase size={16} className="text-[#5B4CF0]" />
            <span>{job.type}</span>
            <span className="text-gray-300">•</span>
            <span>{job.experience}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock size={16} className="text-[#5B4CF0]" />
            <span>{job.postedAt}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-[#5B4CF0]/10 transition-color"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Apply Button */}
        <button className="w-full bg-gray-900 text-white py-2.5 rounded-xl font-semibold hover:bg-[#5B4CF0] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
          Apply Now →
        </button>
      </div>

      <div className={`absolute inset-0  transition-all duration-300 pointer-events-none ${
        isHovered ? 'from-[#5B4CF0]/5 to-[#8B7DF0]/5' : ''
      }`} />
    </div>
  );
};

export default FeaturedJobs;