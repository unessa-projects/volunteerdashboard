import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AmountSelector from '../components/AmountSelector';
import FormFields from '../components/FormFields';
import axios from 'axios';
import { IoIosArrowBack, } from 'react-icons/io';


const Form = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // NEW
  const [searchParams] = useSearchParams();
  const refName = searchParams.get("ref");

  useEffect(() => {
    if (refName) {
      console.log("Reference Name:", refName);
    }
  }, [refName]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    anonymous: false,
  });

  const baseAmount = +customAmount || amount;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const isInvalid =
      formData.name.trim() === '' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
      !/^[6-9]\d{9}$/.test(formData.phone);

    if (isInvalid) return;

    try {
      const res = await axios.post('https://internapi.unessafoundation.org/create-order', {
        ...formData,
        amount: baseAmount,
      });

      const { orderId, amount, currency, key } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: formData.anonymous ? 'Anonymous Donor' : formData.name,
        order_id: orderId,
        handler: async function (response) {
          try {
            await axios.post('https://internapi.unessafoundation.org/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              anonymous: formData.anonymous,
              amount: baseAmount,
            });

            await axios.post('https://internapi.unessafoundation.org/save-payment', {
              refName: localStorage.getItem("username"),
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              anonymous: formData.anonymous,
              amount: baseAmount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });

            setShowThankYou(true);
            setTimeout(() => {
              setShowThankYou(false);
              window.location.href = " https://unessafoundation.org/donor-profile-form/
";
            }, 2000);
          } catch (err) {
            console.error('❌ Payment Verification Failed:', err);
            alert('❌ Payment Verification Failed. Please try again.');
          }
        },
        prefill: {
          ...(formData.anonymous
            ? {}
            : {
                name: formData.name,
                email: formData.email,
              }),
          contact: formData.phone,
        },
        notes: {
          ...(formData.anonymous ? {} : { address: formData.address }),
        },
        theme: {
          color: '#00B5AD',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Razorpay Order Error:', err);
      alert('❌ Failed to create order. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background iframe */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
  <iframe
    src="https://unessafoundation.org/donate/"
    className="w-full h-full border-none filter blur-md"
    title="Donation Background"
  ></iframe>
  {/* Dark overlay for contrast */}
  <div className="absolute inset-0 bg-black/30"></div>
</div>

      {/* Form container */}
      <div className="relative z-20 flex justify-center items-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 p-6 animate-fade-in-up">

          {/* Header */}
          <div className="relative flex items-center mb-4 border-b pb-3">
  {/* Back button (absolute left) */}
  <button
    className="absolute left-0 text-[#00B5AD] text-xl transition-transform duration-300 hover:scale-110"
    onClick={() => setShowConfirmation(true)}
  >
    <IoIosArrowBack />
  </button>

  {/* Center heading */}
  <h2 className="mx-auto text-[#00B5AD] font-semibold text-base">
    Choose a contribution amount
  </h2>
</div>

          {/* Hint */}
          <p className="text-center text-sm text-gray-500 mb-4 animate-fade-in">
            Most Contributors give around{' '}
            <span className="text-[#00B5AD] font-semibold">₹2500</span>
          </p>

          {/* Amount Selector */}
          <AmountSelector
            presetAmounts={[1000, 2500, 4000]}
            amount={amount}
            setAmount={setAmount}
            customAmount={customAmount}
            setCustomAmount={setCustomAmount}
          />

          {/* Form Fields */}
          <FormFields
            formData={formData}
            onChange={handleFormChange}
            submitted={submitted}
          />

          {/* Success Message */}
          {showThankYou && (
            <div className="p-3 mt-4 text-center text-green-700 font-semibold bg-green-100 border border-green-300 rounded-md animate-pulse">
              ✅ Payment successful. Redirecting...
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-[#00B5AD] text-white font-semibold py-3 mt-4 rounded-full hover:bg-[#009C96] transition duration-300 hover:shadow-lg active:scale-95"
            onClick={handleSubmit}
          >
            Proceed To Contribute ₹{baseAmount}
          </button>

          {/* Footer */}
          <p className="text-xs text-center text-gray-400 mt-4">
            By continuing, you agree to our{' '}
            <a
  href="https://unessafoundation.org/terms-and-conditions/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-[#00B5AD] underline cursor-pointer hover:text-[#009C96] transition"
>
Terms and conditions
</a>
          </p>
        </div>
      </div>

      {/* Confirmation Overlay */}
      {showConfirmation && (
        <div className="absolute inset-0 z-40 flex justify-center items-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center animate-fade-in-up">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-[#00B5AD]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-700 mb-6">
              <strong>Please don’t go yet!</strong> <br />
              Just your small donation can help one-year students with study, stationery, or living expenses. <br />
              Your contribution can make a difference.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="w-full bg-[#00B5AD] text-white font-semibold py-2 rounded-lg hover:bg-[#009C96] transition"
                onClick={() => setShowConfirmation(false)}
              >
                Yes, I will help
              </button>
              <button
                className="w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
                onClick={() => {
                  window.location.href = "https://unessafoundation.org/donate/";
                }}
              >
                Sorry, not today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

