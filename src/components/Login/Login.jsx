import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const handleCredentialResponse = async (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      const { email, name, picture, sub } = decoded;

      localStorage.setItem("googleUser", JSON.stringify({ 
        email, 
        name, 
        avatar: picture, 
        id: sub 
      }));
  
  
      // Step 1: Check if user exists
      const res = await fetch("https://unessa-backend.onrender.com/api/users/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
  
      if (data.exists) {
        // ✅ Existing user: fetch quiz status
        const quizRes = await fetch(`https://unessa-backend.onrender.com/api/users/quiz-status/${email}`);
        const quizData = await quizRes.json();
        localStorage.setItem("quizStatus", quizData.quizStatus || "notAttempted");
  
        // TOUR-SPECIFIC CHANGES START HERE
        const hasSeenTour = data.user?.hasSeenTour || false;
        localStorage.setItem("isNewUser", hasSeenTour ? "false" : "true");
        
        // If user hasn't seen tour, mark it as seen in backend after showing it
        if (!hasSeenTour) {
          // This will be handled in the Dashboard after tour completes
        }
        // TOUR-SPECIFIC CHANGES END HERE
      
        console.log("✅ Existing user, redirecting to dashboard...");
        navigate("/dashboard");
      } else {
        // First-time user (new)
        localStorage.setItem("quizStatus", "notAttempted");
        
        // TOUR-SPECIFIC CHANGE: Force tour for new users
        localStorage.setItem("isNewUser", "true");
        
        console.log("🆕 New user, redirecting to name setup...");
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
          client_id: "632235295452-q80u7io2eit1gh39vo63euk6dbg6ciij.apps.googleusercontent.com",
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
