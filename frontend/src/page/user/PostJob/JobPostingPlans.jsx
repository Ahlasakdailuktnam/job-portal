import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  CheckCircle,
  Briefcase,
  TrendingUp,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import loadinganimation from "../../../assets/loading.json";
import { getplan } from "../../../api/plan/plan";
import loginAnimation from "../../../assets/Business.json";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import Loading from "../../../components/common/Loading";
import ErrorState from "../../../components/common/ErrorState";
import { useApiState } from "../../../hook/useApiSate";
import LogoutModal from "../../../components/modals/logoutModal";
const JobPostingPlans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [msgLogin, setMsgLogin] = useState(false);
  const [plans, setPlans] = useState([]);

  const navigate = useNavigate();

  const { token } = useAuthStore();
  const { loading, setLoading, error, setError } = useApiState();
  const handleChoosePlan = async (planId) => {
    if (!token) {
      setMsgLogin(true);
      return;
    }

    navigate(`/checkout/${planId}`);
  };
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getplan();
      if (res?.success) {
        setPlans(res.data);
      }
    } catch (err) {
      setError("Faild to load the data from the API");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  const formattedPlans = plans.map((plan) => ({
    ...plan,

    icon: Briefcase,

    period: "/ខែ",

    description: `${plan.job_limit} Jobs Available`,

    buttonText: "ជ្រើសរើសកញ្ចប់",

    features: [
      {
        label: `បង្ហោះការងារបាន ${plan.job_limit} កន្លែង`,
        sub: "ក្នុងមួយខែ",
      },
      {
        label: `រយៈពេល ${plan.duration_days} ថ្ងៃ`,
        sub: "សម្រាប់ការងារនីមួយៗ",
      },

      ...(plan.cv_access
        ? [
            {
              label: "អាចមើល CV បេក្ខជន",
              sub: "Candidate Access",
            },
          ]
        : []),

      ...(plan.featured_job > 0
        ? [
            {
              label: `Featured Job ${plan.featured_job}`,
              sub: "Top Promotion",
            },
          ]
        : []),
    ],
  }));
  const comparisonData = [
    {
      feature: "ចំនួនការងារដែលអាចបង្ហោះបាន",
      basic: "៥ កន្លែង/ខែ",
      professional: "២៥ កន្លែង/ខែ",
      enterprise: "គ្មានដែនកំណត់",
    },
    {
      feature: "រយៈពេលផ្សាយការងារ",
      basic: "៣០ ថ្ងៃ",
      professional: "៦០ ថ្ងៃ",
      enterprise: "៩០ ថ្ងៃ",
    },
    {
      feature: "ការគាំទ្រ",
      basic: "អ៊ីមែល (២៤ ម៉ោង)",
      professional: "អាទិភាព (២-៤ ម៉ោង)",
      enterprise: "២៤/៧ (តាមទូរស័ព្ទ)",
    },
    {
      feature: "ស្ថិតិ និងរបាយការណ៍",
      basic: "មូលដ្ឋាន",
      professional: "កម្រិតខ្ពស់",
      enterprise: "កម្រិតខ្ពស់ + AI",
    },
    {
      feature: "ការផ្សាយបន្ថែម",
      basic: "-",
      professional: "៥ ដង/ខែ",
      enterprise: "គ្មានដែនកំណត់",
    },
    {
      feature: "ស្វែងរកប្រវត្តិរូប",
      basic: "-",
      professional: "✓",
      enterprise: "✓",
    },
    {
      feature: "API សម្រាប់ភ្ជាប់ប្រព័ន្ធ",
      basic: "-",
      professional: "-",
      enterprise: "✓",
    },
    {
      feature: "ចំនួនគណនីបុគ្គលិក",
      basic: "១ នាក់",
      professional: "៥ នាក់",
      enterprise: "១០ នាក់",
    },
  ];

  const faqs = [
    {
      question: "តើខ្ញុំអាចប្តូរកញ្ចប់សេវាកម្មបានទេ?",
      answer:
        "បាទ អ្នកអាចប្តូរកញ្ចប់សេវាកម្មបានគ្រប់ពេលវេលា។ ការប្តូរនឹងមានប្រសិទ្ធភាពភ្លាមៗ។",
    },
    {
      question: "តើការបង់ប្រាក់មានសុវត្ថិភាពប៉ុណ្ណា?",
      answer:
        "យើងប្រើប្រាស់ប្រព័ន្ធទូទាត់តាមស្តង់ដារអន្តរជាតិ និងមានការអ៊ិនគ្រីបទិន្នន័យកម្រិតខ្ពស់។",
    },
    {
      question: "តើអាចលុបចោលកញ្ចប់សេវាកម្មបានទេ?",
      answer:
        "បាទ អ្នកអាចលុបចោលកញ្ចប់សេវាកម្មបានគ្រប់ពេលវេលា។ យើងមិនគិតថ្លៃលុបចោលទេ។",
    },
  ];
  if (loading) return <Loading />;

  if (error) return <ErrorState message={error} onRetry={fetchPlans} />;
  return (
    <div className="min-h-screen">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 ">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight text-gray-900">
                ជ្រើសរើសកញ្ចប់សេវាកម្មសម្រាប់អាជីវកម្មអ្នក
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                ជ្រើសរើសកញ្ចប់ដែលសាកសមនឹងទំហំអាជីវកម្ម និងតម្រូវការរបស់អ្នក
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    គ្មានការគិតថ្លៃលាក់កំបាំង
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    បង់រំលស់បាន
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700 font-medium">
                    លុបចោលបានគ្រប់ពេល
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="rounded-2xl">
                <Player
                  autoplay
                  loop
                  src={loginAnimation}
                  style={{ height: "300px", width: "500px", margin: "0 auto" }}
                />
                <p className="text-center text-gray-500 text-sm mt-2 font-medium">
                  ស្វែងរកបេក្ខជនល្អបំផុត
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      {/* Billing Toggle - Clean Design */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-6">
        <div className="flex justify-center">
          <div className="bg-gray-100 rounded-2xl p-1.5 inline-flex border border-gray-200">
            <button
              className={`px-10 py-3.5 rounded-xl font-semibold transition-colors duration-200 ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              ប្រចាំខែ
            </button>
            <button
              className={`px-10 py-3.5 rounded-xl font-semibold transition-colors duration-200 ${
                billingCycle === "yearly"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              ប្រចាំឆ្នាំ
              <span
                className={`ml-2 text-xs px-2.5 py-1 rounded-full font-medium ${
                  billingCycle === "yearly"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                សន្សំ ២០%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {formattedPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl overflow-hidden ${
                plan.highlight
                  ? "ring-2 ring-gray-500 shadow-xl"
                  : "border border-gray-300 shadow-sm hover:shadow-lg"
              } transition-shadow duration-200`}
            >
              {plan.badge && (
                <div className="bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 text-center tracking-wide">
                  {plan.badge}
                </div>
              )}

              <div
                className={`p-8 ${plan.highlight ? "bg-gray-900" : "bg-white"}`}
              >
                <div
                  className={`inline-flex p-3 rounded-xl mb-4 ${
                    plan.highlight ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  <plan.icon
                    size={28}
                    className={plan.highlight ? "text-white" : "text-gray-900"}
                  />
                </div>

                <h3
                  className={`text-2xl font-bold ${
                    plan.highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-0.5 ${
                    plan.highlight ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {plan.nameEn}
                </p>
                <p
                  className={`text-sm mt-3 ${
                    plan.highlight ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${plan.price}
                  </span>
                  <span
                    className={`text-sm mb-1 ${
                      plan.highlight ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {plan.highlight && billingCycle === "yearly" && (
                  <div className="mt-3">
                    <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full">
                      សន្សំបាន $
                      {(pricingData.monthly[plan.id] -
                        pricingData.yearly[plan.id]) *
                        12}{" "}
                      ក្នុងមួយឆ្នាំ
                    </span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <button
                  onClick={() => handleChoosePlan(plan.id)}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-colors duration-200 ${
                    plan.highlight
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>

              <div className="border-t border-gray-100 px-8 py-6">
                <p className="font-semibold text-gray-900 text-sm uppercase tracking-wider mb-4">
                  អ្វីដែលរួមបញ្ចូល
                </p>
                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle
                        size={16}
                        className="text-gray-700 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          {feature.label}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {feature.sub}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ប្រៀបធៀបកញ្ចប់សេវាកម្មទាំងអស់
            </h2>
            <p className="text-gray-600">
              ស្វែងយល់ពីភាពខុសគ្នារវាងកញ្ចប់នីមួយៗ
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-900 font-bold">
                      លក្ខណៈពិសេស
                    </th>
                    <th className="px-6 py-4 text-center text-gray-900 font-bold">
                      មូលដ្ឋាន
                    </th>
                    <th className="px-6 py-4 text-center text-gray-900 font-bold bg-gray-100">
                      អាជីព
                    </th>
                    <th className="px-6 py-4 text-center text-gray-900 font-bold">
                      សហគ្រាស
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {row.basic}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-900 font-medium bg-gray-50">
                        {row.professional}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              សំណួរដែលគេសួរញឹកញាប់
            </h2>
            <p className="text-gray-600">
              ស្វែងយល់បន្ថែមអំពីកញ្ចប់សេវាកម្មរបស់យើង
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-bold text-gray-900">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    expandedFAQ === index ? "pb-4 max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            នៅមិនទាន់ច្បាស់ថាកញ្ចប់ណាសាកសមនឹងអ្នក?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            ក្រុមការងាររបស់យើងត្រៀមខ្លួនជួយអ្នកជ្រើសរើសកញ្ចប់ដែលសាកសមបំផុត
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition hover:scale-105">
              ទំនាក់ទំនងអ្នកជំនាញ
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition hover:scale-105">
              សាកល្បងប្រើប្រាស់ឥតគិតថ្លៃ
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            * សាកល្បងប្រើប្រាស់កញ្ចប់អាជីពរយៈពេល ៧ ថ្ងៃ មិនគិតថ្លៃ
          </p>
        </div>
      </div>
      <LogoutModal
        isOpen={msgLogin}
        onClose={() => setMsgLogin(false)}
        title="មិនទាន់Login"
        message="សូមLoginជាមុនសិនដើម្បីប្រើប្រាស់នូវមុខងារនេះ"
      />
    </div>
  );
};

export default JobPostingPlans;
