import React from "react";

const PaymentFailedPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600">
        Payment Failed
      </h1>

      <p className="mt-4">
        Please try again.
      </p>
    </div>
  );
};

export default PaymentFailedPage;