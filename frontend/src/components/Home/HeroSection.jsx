import { Search, ArrowUpRight, ChevronDown } from "lucide-react";
import image from "../../assets/image.png";
import logo from "../../assets/logo.png";
import Navbar from "../../components/Navbar";
const HeroSection = () => {
  return (
    <div>
      <section className="relative flex-1 flex flex-col px-6 md:px-16 py-4 overflow-y-auto z-10">
        <div className="relative z-10 max-w-4xl mx-auto mt-5 text-center flex-shrink-0">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-black">
            បទពិសោធន៍ថ្មី
            <br />
            ក្នុងការស្វែងរកការងារ
          </h1>
          <p className="mt-6 max-w-2xl text-gray-500 text-sm md:text-base leading-relaxed">
            ចាប់ផ្តើមអាជីពការងារក្នុងក្តីស្រមៃរបស់អ្នក
            ជាមួយឱកាសការងារល្អៗនៅលើវេបសាយ Srolanh Career។
          </p>
          {/* SEARCH */}
          <div className="mt-5 flex justify-center">
            <div className="w-full bg-white rounded-full shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row items-center">
              {/* INPUT */}
              <input
                type="text"
                placeholder="ស្វែងរកការងារដែលអ្នកចង់បាន..."
                className="flex-1 px-5 py-3 md:py-5 bg-transparent outline-none text-gray-600 text-sm"
              />

              {/* CATEGORY */}
              <div className="flex items-center gap-2 px-4 py-3 md:py-4 border-l border-gray-200 text-sm font-medium text-gray-700 whitespace-nowrap">
                Web Development
                <ChevronDown size={14} />
              </div>

              <button className="m-1.5 bg-gray-900 transition rounded-full p-2.5 text-white">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative flex items-center justify-center flex-1 min-h-0">
          <div className="hidden lg:flex absolute right-[60%] top-10 bg-white rounded-xl shadow-xl px-3 py-3 items-center gap-3 z-20">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src="bmnbm"
                alt="google"
                className="w-5"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">ជោគជ័យអតិថិជន</p>

              <p className="font-bold text-lg">8.50%</p>
            </div>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <img
              src={image}
              alt="hero"
              className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] object-contain"
            />
          </div>

          {/* RIGHT CARD */}
          <div className="hidden lg:flex absolute right-[5%] xl:right-[25%] top-10 bg-white rounded-xl shadow-xl px-7 py-3 items-center gap-3 z-20">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="google"
                    className="w-5"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">ការងារថ្មី</p>

                  <p className="font-bold text-lg">100+</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                    alt="google"
                    className="w-5"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-500">ក្រុមហ៊ុន</p>

                  <p className="font-bold text-lg">100+</p>
                </div>
              </div>
            </div>
          </div>

          {/* USERS */}
          <div className="hidden bg-white px-4 py-2 rounded-2xl lg:flex absolute right-[5%] xl:right-[10%] bottom-35 items-center gap-3 z-20">
            <div className="flex -space-x-2">
              <img
                src="https://i.pravatar.cc/100?img=12"
                className="w-9 h-9 rounded-full border-2 border-white"
                alt="user"
              />

              <img
                src="https://i.pravatar.cc/100?img=13"
                className="w-9 h-9 rounded-full border-2 border-white"
                alt="user"
              />

              <img
                src="https://i.pravatar.cc/100?img=14"
                className="w-9 h-9 rounded-full border-2 border-white"
                alt="user"
              />
            </div>

            <p className="text-xs text-gray-600 max-w-[180px] leading-relaxed">
              យើងជួយបង្កើតឱកាសការងារដោយគ្មានភាពមិនស្មើភាព
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
