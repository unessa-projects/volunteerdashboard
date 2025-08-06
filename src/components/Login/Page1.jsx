import React from "react";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page3");
  };

  return (
    <div className="relative h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">

    {/* Logo */}
    <div className="absolute top-6 sm:top-8 lg:top-10 left-1/2 transform -translate-x-1/2">
      <img
        src="/llogo.png"
        alt="Unessa Foundation Logo"
        className="object-contain w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
      />
    </div>
  
    {/* Text and Button */}
    <div className="relative text-center max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-28 sm:mt-32 md:mt-36">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#333333] leading-relaxed px-2">
      
        <span className="font-bold">Step Into Purpose. Speak for Change.</span>,{" "}
        <span>Join a powerful movement to uplift</span> {" "}
        <span className="font-bold">1500+ underprivileged children</span> &{" "}
        <span>through</span>{" "}
        <span className="font-bold">quality education, emotional wellness,</span> and {" "}
        <span className="font-bold">self-expression.
        </span> plus master the{" "} <br />
        <span>This isn’t just an internship—it’s your chance to</span>{" "}
        <span className="font-bold">build real-world impact,</span> grow the {" "}
        <span className="font-bold">skill of storytelling,</span>  and become the {" "}
        <span className="font-bold">voice that drives transformation in the 21st century.</span>.<br />
        <span className="font-bold">💙 Let your journey of impact begin now.</span>
      </p>
  
      <button
        onClick={handleNext}
        className="bg-[#21B6A8] hover:bg-[#1ca496] transition duration-300 text-[#333333]
                   text-lg sm:text-xl md:text-2xl font-bold
                   py-3 sm:py-4 px-6 sm:px-10
                   rounded-xl sm:rounded-2xl"
      >
        I'm In
      </button>
    </div>
  </div>
  

  );
};

export default Page1;
