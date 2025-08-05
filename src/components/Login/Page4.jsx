import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Page4 = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleAccept = () => {
    navigate("/page5");
  };

  const handleReject = () => {
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen  bg-[#F4F9F8] bg-cover bg-center flex justify-center items-center relative px-4 sm:px-6">
  {/* Logo */}
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
    <img
      src="/logo.png"
      alt="Unessa Foundation Logo"
      className="w-24 sm:w-28 md:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Content Box */}
  <div className="text-center w-full max-w-4xl space-y-6 sm:space-y-8 mt-32 sm:mt-40">
    <h4 className="text-[#333333] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
      During this internship, you will be required to reach out to your personal network,<br className="hidden sm:block" />
      tell them about the cause and raise funds.
    </h4>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
      <button
        className="bg-[#21B6A8] text-[#333333] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:bg-[#85e1d7] transition duration-300"
        onClick={handleAccept}
      >
        I Accept
      </button>
      <button
        className="bg-gray-400 text-[#333333] px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold hover:bg-gray-500 transition duration-300"
        onClick={handleReject}
      >
        I Don’t Accept
      </button>
    </div>

    {/* Conditional Message */}
    {showMessage && (
      <p className="text-red-600 text-lg sm:text-xl font-semibold">
        You can’t move forward.
      </p>
    )}
  </div>
</div>

  );
};

export default Page4;
