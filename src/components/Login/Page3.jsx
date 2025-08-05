import React from "react";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page4");
  };

  return (
    <div className="min-h-screen  bg-[#F4F9F8] bg-cover bg-center flex justify-center items-center px-4 sm:px-6 md:px-10">
  {/* Logo */}
  <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2">
    <img
      src="/logo.png"
      alt="Unessa Foundation Logo"
      className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Main Card */}
  <div className="bg-transparent border-none shadow-none p-6 sm:p-10 md:p-12 lg:p-14 w-full max-w-xl sm:max-w-2xl text-center space-y-6 sm:space-y-8 scale-100 sm:scale-105 md:scale-110 lg:scale-125">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] leading-snug">
      Be the face of <span className="italic">Unessa </span>
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-[#333333] font-medium">
      Represent our cause with enthusiasm, sincerity, and professionalism.
    </p>

    <p className="text-sm sm:text-base md:text-lg text-[#333333]">
      If you are not ready to give it your best shot, no hard feelings — but this might not be for you.
    </p>

    <button
      className="bg-[#21B6A8] text-[#333333] px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg md:text-xl font-semibold hover:bg-[#1ca496] transition duration-300"
      onClick={handleNext}
    >
      I am ready
    </button>
  </div>
</div>

  );
};

export default Page3;
