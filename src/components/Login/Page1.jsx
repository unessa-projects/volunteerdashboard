import React from "react";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/page2");
  };

  return (
    <div className="h-screen  bg-[#F4F9F8] bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
  {/* Logo */}
  <div className="absolute top-4 sm:top-6 lg:top-8 left-1/2 transform -translate-x-1/2">
    <img
      src="/logo.png"
      alt="Unessa Foundation Logo"
      className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Text and Button */}
  <div className="text-center max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#333333] leading-relaxed px-2">
      this is an opportunity to support{" "}
      <span className="font-bold">quality education</span>,{" "}
      <span className="font-bold">social emotional learning</span> &{" "}
      <span className="font-bold">mental well-being</span> of over{" "}
      <span className="font-bold">1500 underprivileged children</span>{" "}
      plus master the <span className="font-bold">art of expression</span> to
      learn a <span className="font-bold">21st century must-have skill</span> & become the{" "}
      <span className="font-bold">voice of our cause</span>.
    </p>

    <button
      className="bg-[#21B6A8] hover:bg-[#1ca496] transition duration-300 text-[#333333] text-lg sm:text-xl md:text-2xl font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-xl sm:rounded-2xl"
      onClick={handleNext}
    >
      I'm In
    </button>
  </div>
</div>

  );
};

export default Page1;
