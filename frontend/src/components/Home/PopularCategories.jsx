import {
  BriefcaseBusiness,
  Code2,
  Megaphone,
  Palette,
  Headphones,
  Database,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const categories = [
  {
    title: "Web Development",
    jobs: "120 Open Positions",
    icon: <Code2 size={34} />,
  },
  {
    title: "Design",
    jobs: "80 Open Positions",
    icon: <Palette size={34} />,
  },
  {
    title: "Marketing",
    jobs: "65 Open Positions",
    icon: <Megaphone size={34} />,
  },
  {
    title: "Customer Service",
    jobs: "95 Open Positions",
    icon: <Headphones size={34} />,
  },
  {
    title: "Accounting",
    jobs: "40 Open Positions",
    icon: <Database size={34} />,
  },
  {
    title: "Business",
    jobs: "50 Open Positions",
    icon: <BriefcaseBusiness size={34} />,
  },
];

const PopularCategories = () => {
  const scrollContainerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [totalDots, setTotalDots] = useState(0);

  // Update active dot based on scroll position
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll > 0) {
        const scrollPercentage = scrollLeft / maxScroll;
        const dotIndex = Math.round(scrollPercentage * (totalDots - 1));
        setActiveDot(dotIndex);
      }
    }
  };

  // Calculate number of dots based on scrollable width
  useEffect(() => {
    const calculateDots = () => {
      if (scrollContainerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const clientWidth = scrollContainerRef.current.clientWidth;
        const numberOfScreens = Math.ceil(scrollWidth / clientWidth);
        setTotalDots(Math.max(2, numberOfScreens)); // Minimum 2 dots
      }
    };

    calculateDots();
    window.addEventListener('resize', calculateDots);
    
    return () => window.removeEventListener('resize', calculateDots);
  }, []);

  // Scroll to specific position when dot is clicked
  const scrollToDot = (dotIndex) => {
    if (scrollContainerRef.current && totalDots > 1) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPosition = (dotIndex / (totalDots - 1)) * maxScroll;
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full py-15 px-6 md:px-16 bg-white relative overflow-hidden">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          
          <div>
            <p className="text-[#5B4CF0] font-semibold uppercase tracking-widest text-sm">
              Categories
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black text-black">
              ប្រភេទការងារពេញនិយម
            </h2>

            <p className="mt-4 text-gray-500 text-sm md:text-base">
              ស្វែងរកការងារតាមប្រភេទដែលអ្នកចូលចិត្ត
            </p>
          </div>

          <button className="text-[#5B4CF0] font-semibold hover:underline">
            មើលទាំងអស់ →
          </button>
        </div>

        {/* HORIZONTAL SCROLL - HIDDEN SCROLLBAR */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="mt-16 flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none", /* Firefox */
            msOverflowStyle: "none", /* IE and Edge */
            WebkitOverflowScrolling: "touch"
          }}
        >
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {categories.map((category, index) => (
            <div
              key={index}
              className="group min-w-[260px] bg-[#f5f7fb]  rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex-shrink-0"
            >
              
              {/* ICON BOX */}
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm text-black group-hover:scale-110 transition-all duration-300">
                {category.icon}
              </div>

              {/* TITLE */}
              <h3 className="mt-8 text-xl font-bold text-black  transition">
                {category.title}
              </h3>

              {/* JOBS */}
              <p className="mt-3 text-sm text-gray-500  transition">
                {category.jobs}
              </p>
            </div>
          ))}
        </div>

        {/* DOTS - Clickable and interactive */}
        <div className="flex items-center justify-center gap-3 mt-14">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToDot(index)}
              className={`transition-all duration-300 cursor-pointer hover:scale-110 ${
                activeDot === index
                  ? "w-10 h-2 rounded-full bg-black"
                  : "w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;