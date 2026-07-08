import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BriefcaseBusiness,
  AlertCircle,
  User,
  CheckCircle,
} from "lucide-react";
import { register } from "../../api/Auth/authApi";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import loginAnimation from "../../assets/Login.json";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("លេខសម្ងាត់ទាំងពីរមិនដូចគ្នាទេ");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("លេខសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ ខ្ទង់");
      setLoading(false);
      return;
    }

    const res = await register({
      name,
      email,
      password,
      role: "user",
    });
    setLoading(false);

    if (res.success === false) {
      setError(res.message);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      window.location.href = `/otp?email=${res.email}`;
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center font-khmer justify-center bg-gray-50 px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-12 border-r border-gray-100">
          <div className="w-full max-w-md mx-auto text-center">
            <div className="mb-12 flex justify-center">
              <div className="flex items-center gap-2">
                <div className="bg-gray-900 p-2 rounded-lg">
                  <BriefcaseBusiness size={24} className="text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Srolanh Career
                </span>
              </div>
            </div>

            <div className="mb-12">
              <Player
                autoplay
                loop
                src={loginAnimation}
                style={{
                  height: "300px",
                  width: "300px",
                  margin: "0 auto",
                }}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-gray-900">
                ចូលរួមជាមួយយើងថ្ងៃនេះ!
              </h3>
              <p className="text-gray-500 text-sm">
                បង្កើតគណនីរបស់អ្នកដើម្បីចាប់ផ្តើម
              </p>
              <p className="text-gray-400 text-xs mt-4">
                ភ្ជាប់ទំនាក់ទំនងជាមួយនិយោជកល្អៗនៅកម្ពុជា
              </p>
            </div>

            <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-900">10K+</p>
                <p className="text-xs text-gray-500">ការងារ</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">500+</p>
                <p className="text-xs text-gray-500">ក្រុមហ៊ុន</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">98%</p>
                <p className="text-xs text-gray-500">ជោគជ័យ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
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
              បង្កើតគណនី
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              បំពេញព័ត៌មានរបស់អ្នកដើម្បីចាប់ផ្តើម
            </p>
          </div>

          {success && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800 text-sm">
                    បានចុះឈ្មោះដោយជោគជ័យ!
                  </p>
                  <p className="text-xs text-green-700">
                    កំពុងបញ្ជូនទៅកាន់ទំព័រផ្ទៀងផ្ទាត់...
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && !success && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                ឈ្មោះពេញ
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all bg-white">
                <User size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="បញ្ចូលឈ្មោះពេញរបស់អ្នក"
                  className="w-full bg-transparent px-3 py-2.5 outline-none text-gray-900 text-sm"
                  required
                />
              </div>
            </div>

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
                  className="w-full bg-transparent px-3 py-2.5 outline-none text-gray-900 text-sm"
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
                  placeholder="យ៉ាងហោចណាស់ ៦ ខ្ទង់"
                  className="w-full bg-transparent px-3 py-2.5 outline-none text-gray-900 text-sm"
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

            {/* Confirm Password Field */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                បញ្ជាក់លេខសម្ងាត់
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-all bg-white">
                <Lock size={16} className="text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="បញ្ចូលលេខសម្ងាត់ម្តងទៀត"
                  className="w-full bg-transparent px-3 py-2.5 outline-none text-gray-900 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1 rounded hover:bg-gray-100 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} className="text-gray-400" />
                  ) : (
                    <Eye size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>កំពុងបង្កើតគណនី...</span>
                </div>
              ) : (
                <span>បង្កើតគណនី</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-8">
            <div className="absolute w-full h-px bg-gray-200"></div>
            <span className="relative bg-white px-4 text-xs text-gray-400">
              មានគណនីរួចហើយ?
            </span>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <span>ចូលគណនី</span>
              <ArrowRight size={16} />
            </button>
          </Link>

          {/* Terms */}
          <p className="text-center text-xs text-gray-400 mt-8">
            ដោយការបង្កើតគណនី អ្នកយល់ព្រមនឹង{" "}
            <a href="#" className="text-gray-900 hover:underline">
              លក្ខខណ្ឌប្រើប្រាស់
            </a>{" "}
            និង{" "}
            <a href="#" className="text-gray-900 hover:underline">
              គោលការណ៍ឯកជនភាព
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
