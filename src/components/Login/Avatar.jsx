import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const avatarList = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
];
const Avatar = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const handleSelect = (avatarPath) => {
    setSelected(avatarPath);
    localStorage.setItem("avatar", avatarPath);
  };
  const handleContinue = async () => {
  if (!selected) return;
  const name = localStorage.getItem("name") || "user";
  const baseName = name.replace(/\s+/g, "").toLowerCase();
  const randomStr = Math.random().toString(36).substring(2, 6);
  const username = `${baseName}${randomStr}`;
  const email = localStorage.getItem("email");
  const number = localStorage.getItem("number");
  const userData = {
    email,
    name,
    number,
    avatar: selected,
    username,
  };
  try {
    const response = await fetch("https://unessa-backend.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(":white_check_mark: User saved:", result);
      // Store the username in localStorage
      localStorage.setItem("username", username);
      const userRes = await fetch(`https://unessa-backend.onrender.com/getUser/${email}`);
      const fullUser = await userRes.json();
      localStorage.setItem("googleUser", JSON.stringify(fullUser));
      navigate("/page1");
    } else {
      console.error(":x: Error from server:", result.error);
    }
  } catch (error) {
    console.error(":x: Error saving user:", error);
  }
};
  return (
  <div className="min-h-screen bg-[#F4F9F8] bg-cover bg-center flex flex-col items-center px-4 py-6 relative">
    {/* Logo Section */}
    <div className="w-full flex justify-center mb-6 sm:mb-8">
      <img
        src="/logo.png"
        alt="Unessa Foundation Logo"
        className="w-16 sm:w-20 md:w-24 h-auto opacity-95 drop-shadow-md hover:opacity-100 transition"
      />
    </div>
    {/* Main Content */}
    <div className="w-full max-w-[90%] sm:max-w-3xl mt-2 md:max-w-4xl lg:max-w-5xl space-y-6 sm:space-y-8">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-5xl mt-2 font-bold text-center text-[#333333]">
        Choose Your Avatar
      </h1>
      {/* Avatar Selection Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
        {avatarList.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleSelect(avatar)}
            className={`w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full border-4 cursor-pointer transition duration-300 ${
              selected === avatar
                ? "border-[#333333] scale-110"
                : "border-transparent hover:scale-105"
            }`}
          />
        ))}
      </div>
      {/* Finish Button */}
      <div className="text-center">
        <button
          className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold rounded-xl md:rounded-2xl transition duration-300 ${
            selected
              ? "bg-[#21B6A8] text-[#333333] hover:bg-[#21B6A8]"
              : "bg-[#21B6A8] text-[#333333] cursor-not-allowed"
          }`}
          disabled={!selected}
          onClick={handleContinue}
        >
          Finish
        </button>
      </div>
    </div>
  </div>
);
};
export default Avatar;