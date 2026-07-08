import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BriefcaseBusiness,
  AlertCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnimation from "../../assets/Login Character Animation.json";
import { login } from "../../api/Auth/authApi";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //get login action
  const loginStore = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await login({
        email,
        password,
      });

      if (res.success === false) {
        setError(res.message);
        return;
      }

      if (res.token) {
        loginStore(res.user, res.token);

        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/");
        }
      } else {
        navigate(`/otp?email=${res.email}`);
      }
    } catch (err) {
      console.log(err.response?.data);

      setError("កំហុសប្រព័ន្ធ");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center font-khmer justify-center bg-gray-50 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-12 border-r border-gray-100">
          <div className="w-full max-w-md mx-auto text-center">
            <div className=" flex justify-center">
              <div className="flex items-center gap-2">
                <div className="bg-gray-900 p-2 rounded-lg">
                  <BriefcaseBusiness size={24} className="text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Srolanh Career
                </span>
              </div>
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

            {/* Simple messaging */}
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                សូមស្វាគមន៍!
              </h3>
              <p className="text-gray-500 text-sm">ចូលទៅកាន់គណនីរបស់អ្នក</p>
              <p className="text-gray-400 text-xs mt-4">
                ស្វែងរកការងារសុបិនរបស់អ្នកថ្ងៃនេះ
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-gray-900 p-2 rounded-lg">
              <BriefcaseBusiness size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Srolanh Career
              </h1>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900">
              ចូលគណនី
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              បំពេញព័ត៌មានខាងក្រោមដើម្បីចូលប្រើប្រាស់
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                អ៊ីមែល
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all bg-white">
                <Mail size={16} className="text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparen px-3 py-2.5 outline-none text-gray-900 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                លេខសម្ងាត់
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all bg-white">
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 outline-none text-gray-900 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded hover:bg-gray-100 transition"
                >
                  {showPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                />
                ចងចាំខ្ញុំ
              </label>
              <a href="#" className="text-gray-900 font-medium hover:underline">
                ភ្លេចលេខសម្ងាត់?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>កំពុងចូលប្រព័ន្ធ...</span>
                </div>
              ) : (
                <span>ចូលគណនី</span>
              )}
            </button>
          </form>

          <div className="relative flex items-center justify-center my-8">
            <div className="absolute w-full h-px bg-gray-200"></div>
            <span className="relative bg-white px-4 text-xs text-gray-400">
              ឬបន្តជាមួយ
            </span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>បន្តជាមួយ Google</span>
          </button>

          <div className="flex items-center justify-center gap-2 mt-8 text-sm">
            <p className="text-gray-500">មិនទាន់មានគណនី?</p>
            <Link to="/register">
              <p className="text-gray-900 font-medium hover:underline">
                ចុះឈ្មោះ
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
