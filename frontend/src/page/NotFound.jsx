import { Link } from 'react-router-dom';
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnimation from "../assets/Error 404.json";
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="relative">
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            រកមិនឃើញទំព័រ
          </h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            សូមអភ័យទោស! ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមានទេ ឬត្រូវបានផ្លាស់ប្តូរ។
          </p>
          <p className="text-gray-400 text-xs">
            Please check the URL or return to the homepage.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            ត្រឡប់ទៅទំព័រដើម
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            ត្រឡប់ក្រោយ
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-400" >
          ប្រសិនបើអ្នកគិតថាមានបញ្ហា សូមទាក់ទងអ្នកគ្រប់គ្រងគេហទំព័រ
        </p>
      </div>
    </div>
  );
};

export default NotFound;