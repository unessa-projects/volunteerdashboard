import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Number = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

 const handleSubmit = () => {
  if (!/^\d{10}$/.test(number)) {
    setError("Please enter a valid 10-digit number.");
  } else {
    setError("");
    localStorage.setItem("number", number); 
    console.log("Saved number:", number);
    navigate("/avatar");
  }
};



  return (
    <div className="relative h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center px-4">

    {/* Logo */}
    <div className="absolute top-8 sm:top-10 md:top-12 left-1/2 transform -translate-x-1/2">
      <img
        src="/logo.png"
        alt="Unessa Foundation Logo"
        className="object-contain w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
      />
    </div>
  
    {/* Card */}
    <div className="relative bg-transparent border-none shadow-none
                    w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                    text-center flex flex-col gap-6 sm:gap-8 md:gap-10
                    p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16
                    mt-32 sm:mt-36 md:mt-40">
  
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#333333]">
        Enter Your Number
      </h1>
  
      {/* Input */}
      <input
        type="text"
        placeholder="Enter number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="w-full border border-gray-300 rounded-2xl
                   px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5
                   text-base sm:text-lg md:text-xl lg:text-2xl
                   focus:outline-none focus:ring-4 focus:ring-[#21B6A8]
                   bg-white bg-opacity-40 placeholder-gray-600 text-[#333333]"
      />
  
      {/* Error Text */}
      {error && (
        <p className="text-red-600 text-base sm:text-lg md:text-xl font-medium">
          {error}
        </p>
      )}
  
      {/* Button */}
      <button
        onClick={handleSubmit}
        className="bg-[#21B6A8] hover:bg-[#1ca496] transition duration-300 text-[#333333]
                   px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5
                   text-base sm:text-lg md:text-xl lg:text-2xl font-bold rounded-2xl
                   disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!number}
      >
        Submit
      </button>
  
    </div>
  </div>
  

  );
};

export default Number;
