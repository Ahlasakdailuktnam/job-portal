import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createPayment } from "../../../api/payment/payment";
import { getPlanById } from "../../../api/plan/plan";
import Loading from "../../../components/common/Loading";

const CheckoutPage = () => {
  const { planId } = useParams();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlan();
  }, []);

  const fetchPlan = async () => {
    try {
      const res = await getPlanById(planId);

      if (res.success) {
        setPlan(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayNow = async () => {
    try {
      setLoading(true);

      const paymentRes = await createPayment({
        plan_id: plan.id,
      });

      // Redirect KHQR
      window.location.href = paymentRes.checkout_url;
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
 const banking = [
  {
    img : "https://zand.sgp1.cdn.digitaloceanspaces.com/catalog/logo/aba-payway/aba-pay.png"
  },
  {
    img : "https://zand.sgp1.cdn.digitaloceanspaces.com/catalog/logo/wing/web-sdk/Wing.png"
  },
  {
    img : "https://zand.sgp1.cdn.digitaloceanspaces.com/catalog/logo/aba-payway/V2/credit-debit-card.png"
  },
  {
    img : "https://zand.sgp1.cdn.digitaloceanspaces.com/catalog/banner/2025/TEN11-GLOBAL/tt-and-bank-transfer%20%E2%80%93%20V2.png"
  },
 ]
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">
      
        <div className=" bg-gray-800 p-8 text-white text-center">
          <h1 className="text-3xl font-bold">បញ្ជាក់ការទូទាត់</h1>

          <p className="mt-2 text-blue-100">
            សូមពិនិត្យព័ត៌មានការទូទាត់របស់អ្នក
          </p>
        </div>
        <div className="p-8">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              សង្ខេបការទូទាត់
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">តម្លៃគម្រោង</span>

                <span className="font-semibold">${plan.price}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">ថ្លៃសេវាកម្ម</span>

                <span className="font-semibold">$0.00</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-00">
                <span>សរុប</span>
                <span>${plan.price}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              អាចទូទាត់បានតាម
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {banking.map((item)=> (
              <div>
                <img className="w-70" src={item.img} alt=""/>
              </div>
             ))}
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">របៀបទូទាត់</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex gap-3">
                <span className="font-bold text-blue-600">1.</span>

                <p>
                  ចុចប៊ូតុង <strong>« ទូទាត់ឥឡូវនេះ »</strong>
                  ដើម្បីបង្កើត QR Code សម្រាប់ការទូទាត់។
                </p>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-blue-600">2.</span>

                <p>បើកកម្មវិធី Mobile Banking របស់អ្នក។</p>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-blue-600">3.</span>

                <p>ស្កេន KHQR និងបញ្ជាក់ការទូទាត់។</p>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-blue-600">4.</span>

                <p>
                  ប្រព័ន្ធនឹងធ្វើការផ្ទៀងផ្ទាត់
                  និងដំណើរការគម្រោងរបស់អ្នកដោយស្វ័យប្រវត្តិ។
                </p>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-amber-700 leading-relaxed">
              អ្នកអាចធ្វើការទូទាត់តាមធនាគារណាមួយដែលគាំទ្រ KHQR។
              បន្ទាប់ពីការទូទាត់ជោគជ័យ
              គម្រោងរបស់អ្នកនឹងត្រូវបានដំណើរការដោយស្វ័យប្រវត្តិ។
            </p>
          </div>

          {/* Button */}
          <button
            onClick={handlePayNow}
            disabled={loading}
            className="mt-8 w-full bg-gray-700 hover:bg-black transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
          >
            {loading ? "កំពុងដំណើរការ..." : "ទូទាត់ឥឡូវនេះ"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
             ការទូទាត់មានសុវត្ថិភាព និងត្រូវបានការពារដោយប្រព័ន្ធ KHQR
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default CheckoutPage;
