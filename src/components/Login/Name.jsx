import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Name = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user?.name) {
      setUsername(user.name); // pre-fill name from email login
    }
  }, []);
  // Validation function for name
  const validateName = (name) => {
    if (name.trim().length < 3) {
      return "Name must be at least 3 characters long";
    }
    if (/[^a-zA-Z\s]/.test(name)) {
      return "Name cannot contain digits or special characters";
    }
    return "";
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    const validationError = validateName(value);
    setError(validationError);
  };
  const handleSubmit = () => {
    const validationError = validateName(username);
    if (validationError) {
      setError(validationError);
      return;
    }
    localStorage.setItem("name", username);
    console.log("Saved name:", username);
    navigate("/number");
  };
  return (
    <div className="min-h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Logo */}
      <div className="mb-10 sm:mb-12 md:mb-16 flex justify-center">
        <img
          src="/llogo.png"
          alt="Unessa Foundation Logo"
          className="object-contain w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
        />
      </div>
      {/* Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                      bg-transparent border-none shadow-none
                      text-center
                      px-4 sm:px-6 md:px-8 lg:px-12
                      py-6 sm:py-8 md:py-10 lg:py-14
                      flex flex-col gap-6 sm:gap-8">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333]">
          Welcome to Unessa Foundation
        </h1>
        {/* Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={handleChange}
          className={`w-full border rounded-xl px-4 py-3 sm:px-5 sm:py-4
                      text-base sm:text-lg md:text-xl
                      focus:outline-none focus:ring-2
                      ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-[#21B6A8]"}
                      bg-white bg-opacity-40 placeholder-gray-600 text-[#333333]`}
        />
        {/* Error message */}
        {error && (
          <p className="text-red-600 text-sm sm:text-base">{error}</p>
        )}
        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!!error || username.trim() === ""}
          className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg md:text-xl font-semibold
                      text-[#333333]
                      ${!!error || username.trim() === ""
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#21B6A8] hover:bg-[#1CA496] transition duration-300"
                      }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default Name;