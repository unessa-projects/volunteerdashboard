import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Page5 = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleYes = () => {
    navigate("/dashboard");
  };

  const handleNo = () => {
    setShowMessage(true);
  };

  return (
    <div className="h-screen  bg-[#F4F9F8] bg-cover bg-center flex justify-center items-center">
  {/* Logo */}
  <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2">
    <img
      src="/logo.png"
      alt="Unessa Foundation Logo"
      className="w-20 sm:w-28 md:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Main Content Box */}
  <div className="text-center px-4 sm:px-6 md:px-10 w-[95%] sm:w-[90%] md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl space-y-6 sm:space-y-8">
    <h1 className="text-[#333333] text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
      Would you like to sign up for this Internship?
    </h1>

    {/* Buttons */}
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      <button
        className="bg-[#1ca496] text-[#333333] px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-lg sm:text-xl font-semibold hover:bg-[#85e1d7] transition duration-300"
        onClick={handleYes}
      >
        Yes
      </button>

      <button
        className="bg-gray-400 text-[#333333] px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-lg sm:text-xl font-semibold hover:bg-gray-500 transition duration-300"
        onClick={handleNo}
      >
        No
      </button>
    </div>

    {/* Error Message */}
    {showMessage && (
      <p className="text-red-600 text-base sm:text-lg md:text-xl font-semibold mt-2 sm:mt-4">
        You can’t move forward.
      </p>
    )}
  </div>
</div>

  );
};

export default Page5;
