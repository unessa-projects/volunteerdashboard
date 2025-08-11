import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

const handleCredentialResponse = async (response) => {
  try {
    const decoded = jwtDecode(response.credential);
    const email = decoded.email; // ✅ define it here

    const googleUser = {
      name: decoded.name,
      email,
      avatar: decoded.picture // ✅ store profile pic
    };

    localStorage.setItem("googleUser", JSON.stringify(googleUser));

    // Step 1: Check if user exists
    const checkRes = await fetch("http://localhost:5000/api/users/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // ✅ now email exists
    });

    const checkData = await checkRes.json();

    if (checkData.exists) {
      // ✅ Step 2: Get user details from backend
      const userRes = await fetch(`http://localhost:5000/api/users/${email}`);
      const userData = await userRes.json();

      console.log("📥 Backend user data:", userData);

      // ✅ Store in localStorage (backend overrides Google fields if available)
      localStorage.setItem("email", email);
      localStorage.setItem("name", userData.name);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("avatar", userData.avatar);

      localStorage.setItem(
        "googleUser",
        JSON.stringify({
          ...userData,
          email
        })
      );

      // ✅ Step 3: Get quiz status
      const quizRes = await fetch(`http://localhost:5000/api/users/quiz-status/${email}`);
      const quizData = await quizRes.json();
      localStorage.setItem("quizStatus", quizData.quizStatus || "notAttempted");

      // ✅ Step 4: Handle product tour flag
      if (!localStorage.getItem("hasSeenTour")) {
        localStorage.setItem("isNewUser", "true");
        localStorage.setItem("hasSeenTour", "true");
      } else {
        localStorage.setItem("isNewUser", "false");
      }

      console.log("📜 Quiz Status:", quizData.quizStatus);

      navigate("/dashboard");
    } else {
      // First-time user
      console.log("🆕 No user found, redirecting to /name");
      localStorage.setItem("googleUser", JSON.stringify({ email }));
      localStorage.setItem("quizStatus", "notAttempted");
      localStorage.setItem("isNewUser", "true");
      localStorage.setItem("hasSeenTour", "true");
      navigate("/name");
    }

  } catch (err) {
    console.error("Google login error:", err);
  }
};




  useEffect(() => {
    const initializeGoogle = () => {
      if (window?.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: "576101733937-te217ttgfveqn2jk9misk91d2po77p64.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large", width: 300 }
        );
      } else {
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []);

  return (
    <div className="h-screen bg-[#F4F9F8] flex justify-center items-center relative">
      {/* Logo */}
      <img
        src="/llogo.png"
        alt="Unessa Foundation Logo"
        className="w-32 h-auto absolute top-6 left-1/2 transform -translate-x-1/2 opacity-95"
      />

      {/* Login Card */}
      <div className="bg-transparent px-6 py-10 text-center space-y-6 scale-[1.2]">
        <h1 className="text-4xl font-bold text-[#333333]">Welcome to Unessa Foundation</h1>

        {/* Google Sign-In */}
        <div id="googleSignInDiv" className="flex justify-center pt-5"></div>
      </div>
    </div>
  );
};

export default Login;
