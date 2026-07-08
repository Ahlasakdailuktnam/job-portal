const TrustedCompanies = () => {
  const companies = [
    {
      name: "ABA Bank",
      logo: "null",
    },
    {
      name: "ACLEDA",
      logo: "null",
    },
    {
      name: "Wing Bank",
      logo: "null",
    },
    {
      name: "Smart",
      logo: "null",
    },
    {
      name: "Cellcard",
      logo: "null",
    },
  ];

  // Triple the array for seamless scrolling
  const scrollingCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="w-full py-20 relative overflow-hidden ">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 md:px-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
            Trusted Partners
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          ក្រុមហ៊ុនដែលជឿជាក់លើយើង
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          ភ្ជាប់អ្នកជាមួយក្រុមហ៊ុនឈានមុខ និងឱកាសការងារល្អៗ នៅកម្ពុជា
        </p>

        {/* Decorative Line */}
        <div className="flex justify-center mt-6">
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </div>

      {/* Scrolling Companies Container */}
      <div className="relative mt-16 overflow-hidden">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-20 pointer-events-none"></div>
        
        {/* Scrolling Wrapper */}
        <div className="overflow-hidden">
          <div className="flex animate-scroll-right gap-8 w-max">
            {scrollingCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 px-8 py-6 flex items-center justify-center gap-4 min-w-[280px] border border-gray-100 hover:border-blue-200 cursor-pointer"
                style={{
                  backdropFilter: 'blur(10px)',
                  transform: 'translateZ(0)',
                }}
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Logo Container */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = '';
                    }}
                  />
                </div>

                {/* Company Name */}
                <div className="relative z-10">
                  <p className="font-bold text-gray-800 text-lg whitespace-nowrap group-hover:text-blue-600 transition-colors duration-300">
                    {company.name}
                  </p>
                  <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 mt-1 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mt-16 max-w-7xl mx-auto px-6">
        <div className="bg-[#232F72] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Active Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-sm opacity-90">Successful Placements</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation
      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style> */}
    </section>
  );
};

export default TrustedCompanies;