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
    <div className="relative h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center">

    {/* Logo */}
    <div className="absolute top-6 sm:top-8 md:top-10 left-1/2 transform -translate-x-1/2">
      <img
        src="/llogo.png"
        alt="Unessa Foundation Logo"
        className="object-contain w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
      />
    </div>
  
    {/* Main Content Box */}
    <div className="relative text-center px-4 sm:px-6 md:px-10 
                    w-[95%] sm:w-[90%] md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl
                    flex flex-col gap-6 sm:gap-8 mt-28 sm:mt-32 md:mt-36">
      
      {/* Heading */}
      <h1 className="text-[#333333] text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
        Would you like to sign up for this Internship?
      </h1>
  
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        <button
          onClick={handleYes}
          className="bg-[#1ca496] text-[#333333]
                     px-6 sm:px-8 py-3 sm:py-4
                     rounded-lg sm:rounded-xl
                     text-lg sm:text-xl font-semibold
                     hover:bg-[#21B6A8] hover:scale-105
                     transition duration-300"
        >
          Yes
        </button>
  
        <button
          onClick={handleNo}
          className="bg-gray-400 text-[#333333]
                     px-6 sm:px-8 py-3 sm:py-4
                     rounded-lg sm:rounded-xl
                     text-lg sm:text-xl font-semibold
                     hover:bg-gray-500 hover:scale-105
                     transition duration-300"
        >
          No
        </button>
      </div>
  
      {/* Error Message */}
      {showMessage && (
        <p className="text-red-600 text-base sm:text-lg md:text-xl font-semibold">
          You can’t move forward.
        </p>
      )}
    </div>
  </div>
  

  );
};

export default Page5;
