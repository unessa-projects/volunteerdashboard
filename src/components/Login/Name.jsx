import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Name = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user?.name) {
      setUsername(user.name); // pre-fill name from email login
    }
  }, []);

  const handleSubmit = () => {
    if (username.trim() === "") return;
    localStorage.setItem("name", username); 
    console.log("Saved name:", username);
    navigate("/number");
  };

  return (
    <div className="relative h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center px-4">

  {/* Logo */}
  <div className="absolute top-8 sm:top-10 md:top-12 left-1/2 transform -translate-x-1/2">
    <img
      src="/llogo.png"
      alt="Unessa Foundation Logo"
      className="object-contain w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
    />
  </div>

  {/* Card */}
  <div className="relative bg-transparent border-none shadow-none 
                  w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
                  text-center 
                  p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 
                  flex flex-col gap-6 sm:gap-8 mt-32 sm:mt-36 md:mt-40">

    {/* Heading */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#333333]">
      Welcome to Unessa Foundation
    </h1>

    {/* Input */}
    <input
      type="text"
      placeholder="Enter your name"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full border border-gray-300 rounded-xl 
                 px-4 py-3 sm:px-5 sm:py-4 
                 text-base sm:text-lg md:text-xl 
                 focus:outline-none focus:ring-2 focus:ring-[#21B6A8] 
                 bg-white bg-opacity-40 placeholder-gray-600 text-[#333333]"
    />

    {/* Button */}
    <button
      onClick={handleSubmit}
      className="bg-[#21B6A8] hover:bg-[#1ca496] transition duration-300 text-[#333333]
                 px-6 py-3 sm:px-8 sm:py-4 
                 rounded-xl text-base sm:text-lg md:text-xl font-semibold"
    >
      Submit
    </button>

  </div>
</div>


  );
};

export default Name;
