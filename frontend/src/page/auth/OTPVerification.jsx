import { useEffect, useState, useRef } from "react";
import {
  Mail,
  Key,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Eye,
  EyeOff,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  BriefcaseBusiness,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../api/Auth/authApi";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(300);
  const [showOtp, setShowOtp] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    if (paste.length === 6) {
      setOtp(paste);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("សូមបញ្ចូលកូដ ៦ ខ្ទង់");
      return;
    }

    setLoading(true);
    setError("");

    const res = await verifyOtp({
  email,
  otp: otpCode,
});

    setLoading(false);

    if (res.token) {
      setSuccess(true);

      loginStore(res.user, res.token);

      setTimeout(() => {
        if (res.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (res.user.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/");
        }
      }, 2000);
    } else {
      setError(res.message || "កូដ OTP មិនត្រឹមត្រូវ");
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setLoading(true);
      setError("");
      const res = await resendOtp({ email });
      if (res.success || res.message) {
        setTimer(60);
        setError("");
      } else {
        setError(res.message || "មិនអាចផ្ញើកូដបានទេ");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "មិនអាចផ្ញើកូដបានទេ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = () => {
    setIsEditingEmail(false);
  };

  const otpString = otp.join("");
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, first, middle, last) => {
        return first + "*".repeat(Math.min(middle.length, 5)) + last;
      })
    : "";

  return (
    <div className="min-h-screen flex items-center font-khmer justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden px-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="relative w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail size={36} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              ផ្ទៀងផ្ទាត់កូដ OTP
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              សូមបញ្ចូលកូដដែលយើងបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក
            </p>
          </div>

          {/* Email Display Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-8 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Mail size={22} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">
                  កំពុងផ្ញើទៅកាន់
                </p>
                {isEditingEmail ? (
                  <div className="flex gap-2 mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={handleUpdateEmail}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                    >
                      រួចរាល់
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-gray-900 text-sm">
                      {maskedEmail || "example@email.com"}
                    </p>
                    <button
                      onClick={() => setIsEditingEmail(true)}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                    >
                      កែប្រែអ៊ីមែល
                    </button>
                  </>
                )}
              </div>
              <Send size={16} className="text-blue-400" />
            </div>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">
                    ផ្ទៀងផ្ទាត់ដោយជោគជ័យ!
                  </p>
                  <p className="text-sm text-green-700">កំពុងចូលប្រព័ន្ធ...</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !success && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-800">
                    កូដ OTP មិនត្រឹមត្រូវ!
                  </p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* OTP Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
              បញ្ចូលកូដ ៦ ខ្ទង់
            </label>

            {/* OTP Boxes */}
            <div className="flex gap-3 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type={showOtp ? "text" : "password"}
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none transition-all duration-200 ${
                    error && !success
                      ? "border-red-500 bg-red-50"
                      : otpString.length === 6 && !error && !success
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                  }`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Show/Hide Toggle */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowOtp(!showOtp)}
                className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition"
              >
                {showOtp ? <EyeOff size={14} /> : <Eye size={14} />}
                {showOtp ? "លាក់កូដ" : "បង្ហាញកូដ"}
              </button>
            </div>
          </div>

          {/* Timer & Resend Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm text-gray-500">
                កូដ OTP ផុតកំណត់ក្នុង{" "}
                <span className="font-semibold text-blue-600">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </span>{" "}
                នាទី
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={handleResend}
                disabled={timer > 0 || loading}
                className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw
                  size={14}
                  className={
                    timer > 0 ? "" : "group-hover:rotate-180 transition"
                  }
                />
                {timer > 0 ? `សូមរង់ចាំ ${timer} វិនាទី` : "ផ្ញើកូដម្តងទៀត"}
              </button>
            </div>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || otpString.length !== 6 || success}
            className="relative w-full py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <RefreshCw size={18} className="animate-spin" />
                <span>កំពុងផ្ទៀងផ្ទាត់...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={18} />
                <span>បញ្ជាក់កូដ OTP</span>
              </div>
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <a
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-600 flex items-center justify-center gap-1 mx-auto transition"
            >
              <ArrowLeft size={14} />
              ត្រឡប់ទៅទំព័រចូលប្រព័ន្ធ
            </a>
          </div>

          {/* Security Note */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={12} className="text-gray-400" />
              <p className="text-xs text-gray-400 text-center">
                កូដ OTP មានសុវត្ថិភាព និងផុតកំណត់ក្នុងរយៈពេល 5 នាទី
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
