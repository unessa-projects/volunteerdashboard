import React from "react";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page4");
  };

  return (
    <div className="relative min-h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-10">

  {/* Logo */}
  <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2">
    <img
      src="/llogo.png"
      alt="Unessa Foundation Logo"
      className="object-contain w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Main Card */}
  <div className="relative bg-transparent border-none shadow-none
                  p-6 sm:p-10 md:p-12 lg:p-14 
                  w-full max-w-xl sm:max-w-2xl text-center
                  flex flex-col gap-6 sm:gap-8 mt-28 sm:mt-32 md:mt-36">

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] leading-snug">
      Be the face of <span className="italic">Unessa</span>
    </h1>

    {/* Subheading */}
    <p className="text-base sm:text-lg md:text-xl text-[#333333] font-medium">
      Represent our cause with enthusiasm, sincerity, and professionalism.
    </p>

    {/* Disclaimer */}
    <p className="text-sm sm:text-base md:text-lg text-[#333333]">
      If you are not ready to give it your best shot, no hard feelings — but this might not be for you.
    </p>

    {/* Button */}
    <button
      onClick={handleNext}
      className="bg-[#21B6A8] text-[#333333]
                 px-6 py-3 sm:px-8 sm:py-4
                 rounded-xl text-base sm:text-lg md:text-xl font-semibold
                 hover:bg-[#1ca496] hover:scale-105 transition duration-300"
    >
      I am ready
    </button>

  </div>
</div>


  );
};

export default Page3;
