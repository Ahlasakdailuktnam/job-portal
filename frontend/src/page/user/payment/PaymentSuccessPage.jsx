import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { checkPayment } from "../../../api/payment/payment";
import useAuthStore from "../../../store/authStore";
import { getMe } from "../../../api/Auth/authApi";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(
    "សូមរង់ចាំ ខណៈពេលប្រព័ន្ធកំពុងផ្ទៀងផ្ទាត់ការទូទាត់របស់អ្នក...",
  );
  const [message, setMessage] = useState("Confirming your payment...");
  const updateUser = useAuthStore((state) => state.updateUser);
  useEffect(() => {
    const transactionId =
      searchParams.get("transaction_id") || searchParams.get("tran_id");

    if (!transactionId) {
      setStatus("failed");
      setMessage("Missing transaction id. Payment cannot be confirmed.");
      return;
    }

    confirmPayment(transactionId);
  }, [searchParams]);

  const confirmPayment = async (transactionId) => {
    try {
      const res = await checkPayment(transactionId);

      if (res.payment?.status === "paid") {
        const me = await getMe(); 
        updateUser(me.user);
        setStatus("paid");
        setMessage("Your subscription is active now.");
        return;
      }

      setStatus("failed");
      setMessage(
        res.khqr_response?.message ||
          res.message ||
          "Payment is not confirmed yet.",
      );
    } catch (err) {
      setStatus("failed");
      setMessage(
        err.response?.data?.message ||
          "Payment confirmation failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          {status === "checking" ? (
            <div className="h-24 w-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          ) : status === "paid" ? (
            <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-5xl">✓</span>
            </div>
          ) : (
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-5xl">✕</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className={`text-3xl font-bold ${
            status === "paid"
              ? "text-green-600"
              : status === "failed"
                ? "text-red-600"
                : "text-blue-600"
          }`}
        >
          {status === "checking"
            ? "កំពុងផ្ទៀងផ្ទាត់ការទូទាត់"
            : status === "paid"
              ? "ការទូទាត់បានជោគជ័យ"
              : "ការទូទាត់មិនទាន់ត្រូវបានបញ្ជាក់"}
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          {status === "paid"
            ? "ការទូទាត់របស់អ្នកត្រូវបានបញ្ជាក់រួចរាល់។ គម្រោងរបស់អ្នកបានដំណើរការ និងអាចប្រើប្រាស់បានភ្លាមៗ។"
            : message}
        </p>

        {/* Success Box */}
        {status === "paid" && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="font-bold text-green-700">សូមអរគុណសម្រាប់ការជាវ</h3>

            <p className="text-green-600 mt-2">
              ឥឡូវនេះអ្នកអាចប្រើប្រាស់មុខងារទាំងអស់ដែលមាននៅក្នុងគម្រោងរបស់អ្នកបាន។
            </p>
          </div>
        )}

        {status === "failed" && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-5">
            <p className="text-red-600">
              ប្រសិនបើអ្នកបានទូទាត់រួច សូមរង់ចាំបន្តិច ហើយព្យាយាមម្ដងទៀត។
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8">
          {status === "paid" ? (
            <Link
              to="/recruiter/dashboard"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង
            </Link>
          ) : status === "failed" ? (
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              ត្រឡប់ទៅទំព័រដើម
            </Link>
          ) : null}
        </div>

        <p className="text-xs text-gray-400 mt-8">
          ការទូទាត់មានសុវត្ថិភាព និងត្រូវបានការពារដោយប្រព័ន្ធ KHQR
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
