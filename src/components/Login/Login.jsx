import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// The Login component handles user authentication via Google Sign-In.
const Login = () => {
  // `useNavigate` is a React Hook from `react-router-dom` used for programmatic navigation.
  const navigate = useNavigate();

  // `handleCredentialResponse` processes the response from Google's sign-in flow.
  const handleCredentialResponse = async (response) => {
    try {
      // Decode the JWT token to get user information.
      const decoded = jwtDecode(response.credential);
      const email = decoded.email;
      const googleUser = {
        name: decoded.name,
        email,
        avatar: decoded.picture
      };
      
      // Store the Google user data in local storage temporarily.
      localStorage.setItem("googleUser", JSON.stringify(googleUser));

      // Step 1: Check if the user already exists in the backend.
      const checkRes = await fetch("https://unessa-backend.onrender.com/api/users/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const checkData = await checkRes.json();

      if (checkData.exists) {
        // If the user exists, fetch their full profile from the backend.
        const userRes = await fetch(`https://unessa-backend.onrender.com/api/users/${email}`);
        const userData = await userRes.json();
        console.log(":inbox_tray: Backend user data:", userData);

        // Update local storage with data from the backend, which is more complete.
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

        // Step 2: Fetch the user's quiz status.
        const quizRes = await fetch(`https://unessa-backend.onrender.com/api/users/quiz-status/${email}`);
        const quizData = await quizRes.json();
        localStorage.setItem("quizStatus", quizData.quizStatus || "notAttempted");

        // Step 3: Handle the product tour flag for new/returning users.
        if (!localStorage.getItem("hasSeenTour")) {
          localStorage.setItem("isNewUser", "true");
          localStorage.setItem("hasSeenTour", "true");
        } else {
          localStorage.setItem("isNewUser", "false");
        }
        console.log(":scroll: Quiz Status:", quizData.quizStatus);
        
        // Redirect to the dashboard.
        navigate("/dashboard");
      } else {
        // If the user is new, save their email and redirect them to the name registration page.
        console.log(":new: No user found, redirecting to /name");
        localStorage.setItem("email", email);
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

  // `useEffect` hook to initialize the Google Sign-In button on component mount.
  useEffect(() => {
    const initializeGoogle = () => {
      // Check if the Google accounts library is available.
      if (window?.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: "632235295452-q80u7io2eit1gh39vo63euk6dbg6ciij.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          scope: "email profile",
          context: "signin"
        });

        // Render the Google Sign-In button into the specified div.
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInDiv"),
          { theme: "outline", size: "large", width: 300 }
        );
      } else {
        // If the library is not yet loaded, try again after a short delay.
        setTimeout(initializeGoogle, 100);
      }
    };

    initializeGoogle();
  }, []); // The empty dependency array ensures this effect runs only once.

  return (
    // Main container is responsive, taking up the full screen height and using flexbox for centering.
    // The `lg:p-8` class adds padding on large screens for better spacing.
    <div className="h-screen bg-[#F4F9F8] flex justify-center items-center relative lg:p-8">
      {/* Logo is positioned absolutely at the top center. */}
      <img
        src="/llogo.png"
        alt="Unessa Foundation Logo"
        className="w-32 h-auto absolute top-6 left-1/2 transform -translate-x-1/2 opacity-95"
      />

      {/* Login Card Container */}
      {/* - `max-w-md` ensures the card doesn't get too wide on large screens.
        - `w-full` makes it take up the full width on smaller screens, preventing a "right side space".
        - The font size and padding are now controlled by responsive Tailwind classes instead of a problematic `scale` transform.
      */}
      <div className="bg-transparent text-center space-y-6 max-w-sm w-full p-6 sm:p-10">
        {/* Responsive text size for the welcome message. */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#333333]">Welcome to Unessa Foundation</h1>

        {/* Google Sign-In Button Container */}
        <div id="googleSignInDiv" className="flex justify-center pt-5"></div>
      </div>
    </div>
  );
};

export default Login;
