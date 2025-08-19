import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AmountSelector from '../components/AmountSelector';
import FormFields from '../components/FormFields';
import ThankYou from "../components/ThankYou";
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { FaRupeeSign } from 'react-icons/fa';

const Form = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
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
              window.location.href = "https://unessafoundation.org/";
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
    <div className="bg-[#F8FAFA] min-h-screen flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg border border-gray-200 p-6 relative animate-fade-in-up">

        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <button className="text-[#00B5AD] text-xl transition-transform duration-300 hover:scale-110">
            <IoIosArrowBack />
          </button>
          <h2 className="text-[#00B5AD] font-semibold text-base">Choose a contribution amount</h2>
          <button className="text-[#00B5AD] text-lg flex items-center gap-1 transition-transform duration-300 hover:scale-110">
            <FaRupeeSign className="text-sm" />
            <IoIosArrowDown className="text-sm" />
          </button>
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
          <span className="text-[#00B5AD] underline cursor-pointer hover:text-[#009C96] transition">Terms of Service</span> and{' '}
          <span className="text-[#00B5AD] underline cursor-pointer hover:text-[#009C96] transition">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default Form;
