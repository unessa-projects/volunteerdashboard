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
      <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2">
        <img
          src="/llogo.png"
          alt="Unessa Foundation Logo"
          className="object-contain w-16 sm:w-20 md:w-24 lg:w-28 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition duration-300"
        />
      </div>
  
      {/* Main Card */}
      <div className="relative w-full max-w-[95%] sm:max-w-2xl lg:max-w-3xl text-center mt-32 sm:mt-40 md:mt-44 flex flex-col gap-6 sm:gap-8 px-4 sm:px-6 md:px-8">
  
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] leading-snug">
          Be the Voice of <span className="italic">Unessa</span>
        </h1>
  
        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-[#333333] font-medium leading-relaxed">
          This is more than a role — it’s a <span className="font-bold">responsibility</span> to champion hope, education, and emotional well-being for those who need it most.
        </p>
  
        {/* Disclaimer */}
        <p className="text-sm sm:text-base md:text-lg text-[#333333] leading-relaxed">
          If you're ready to lead with <span className="font-bold">passion, empathy, and purpose,</span> let’s create change together.
        </p>
  
        <p className="text-sm sm:text-base md:text-lg text-[#333333] leading-relaxed">
          But if you're unsure, no worries — our cause needs commitment, not half-measures.
        </p>
  
        {/* Button */}
        <button
          onClick={handleNext}
          className="bg-[#21B6A8] text-white
                     px-6 py-3 sm:px-8 sm:py-4
                     rounded-xl text-base sm:text-lg md:text-xl font-semibold
                     hover:bg-[#1ca496] hover:scale-105 transition duration-300"
        >
          Yes, I’m All In
        </button>
      </div>
    </div>
  );
  
};

export default Page3;
