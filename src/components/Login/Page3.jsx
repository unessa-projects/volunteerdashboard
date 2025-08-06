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
    Be the Voice of <span className="italic">Unessa</span>
    </h1>

    {/* Subheading */}
    <p className="text-base sm:text-lg md:text-xl text-[#333333] font-medium">
    This is more than a role — it’s a <span className="font-bold">responsibility </span>to champion hope, education, and emotional well-being for those who need it most.

    </p>

    {/* Disclaimer */}
    <p className="text-sm sm:text-base md:text-lg text-[#333333]">
    If you're ready to lead with <span className="font-bold">passion, empathy, and purpose,</span> let’s create change together.
    </p>


    <p className="text-sm sm:text-base md:text-lg text-[#333333]">
    But if you're unsure, no worries — our cause needs commitment, not half-measures.
    </p>

    {/* Button */}
    <button
      onClick={handleNext}
      className="bg-[#21B6A8] text-[#333333]
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
