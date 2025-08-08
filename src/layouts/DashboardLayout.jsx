import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { Plus, Home, BarChart2, Users, DollarSign, LogOut, X, Menu, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizOverlay from "../components/dashboard/QuizOverlay";
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import './introjs-custom.css'; 

// Create this file for custom styles

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStatus, setQuizStatus] = useState(() => localStorage.getItem("quizStatus") || "notAttempted");
  const [stepsEnabled, setStepsEnabled] = useState(false);

  // Auth check on route change
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("googleUser");
      if (!storedUser) {
        navigate("/login", { replace: true, state: { from: location } });
      }
    };
    checkAuth();
  }, [location, navigate]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem("googleUser");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const response = await fetch(`https://unessa-backend.onrender.com/api/users/${parsedUser.email}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser({ ...userData, hasSeenTour: userData.hasSeenTour || false });
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        localStorage.removeItem("googleUser");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation links
  const navLinks = [
    { path: "/dashboard", icon: Home, label: "Home", introId: "home-step" },
    { path: "/insights", icon: BarChart2, label: "Insights", introId: "insights-step" },
    { path: "/donations", icon: DollarSign, label: "Donations", introId: "donations-step" },
    { path: "/community", icon: Users, label: "Learning" },
    { path: "/certificates", icon: Download, label: "Certificates" }
  ];

  // Tour steps
  const steps = [
    {
      element: '[data-intro-id="avatar-step"]',
      intro: "<h4 class='text-[#FFB823] font-bold mb-2'>Your Profile</h4><p>Manage your account and logout from here</p>",
      position: isMobile ? 'bottom' : 'right'
    },
    {
      element: '[data-intro-id="home-step"]',
      intro: "<h4 class='text-[#FFB823] font-bold mb-2'>Dashboard Home</h4><p>Access your main dashboard view</p>",
      position: isMobile ? 'bottom' : 'right'
    },
    {
      element: '[data-intro-id="insights-step"]',
      intro: "<h4 class='text-[#FFB823] font-bold mb-2'>Analytics</h4><p>View detailed insights about your impact</p>",
      position: isMobile ? 'bottom' : 'right'
    },
    {
      element: '[data-intro-id="donations-step"]',
      intro: "<h4 class='text-[#FFB823] font-bold mb-2'>Donations</h4><p>Track and manage your contributions</p>",
      position: isMobile ? 'bottom' : 'right'
    }
  ];

  // Start tour for new users
  useEffect(() => {
    if (user && !user.hasSeenTour) {
      const timer = setTimeout(() => {
        const allElementsExist = steps.every(step => 
          document.querySelector(step.element)
        );
        if (allElementsExist) setStepsEnabled(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user, steps]);

  const handleTourComplete = () => {
    setStepsEnabled(false);
    if (user?.email && !user.hasSeenTour) {
      const updatedUser = { ...user, hasSeenTour: true };
      setUser(updatedUser);
      localStorage.setItem('googleUser', JSON.stringify(updatedUser));
      
      fetch("https://unessa-backend.onrender.com/api/users/mark-tour-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    localStorage.removeItem("quizStatus");
    navigate("/login");
  };

  const handleQuizComplete = (result) => {
    setQuizStatus(result);
    localStorage.setItem("quizStatus", result);
    if (result === "passed") {
      const storedUser = localStorage.getItem("googleUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
    setShowQuiz(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#043238]">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3 text-xs lg:text-lg rounded-xl transition-all duration-300 ${
      isActive(path)
        ? "text-[#FFB823] bg-[#043238]/70 shadow-[0_0_20px_4px_rgba(236,169,14,0.4)] font-semibold"
        : "text-white hover:text-[#FFB823] hover:bg-[#043238]/40"
    }`;

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#4A9782]">
      {/* Product Tour */}
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={handleTourComplete}
        onComplete={handleTourComplete}
        options={{
          nextLabel: 'Next →',
          prevLabel: '← Back',
          doneLabel: 'Finish',
          skipLabel: 'Skip Tour',
          tooltipClass: 'introjs-theme-custom',
          highlightClass: 'introjs-highlight-custom',
          showBullets: true,
          showProgress: true,
          showStepNumbers: false,
          disableInteraction: false,
          exitOnEsc: true,
          exitOnOverlayClick: false
        }}
      />

      {/* Mobile Header */}
      <motion.header
        className="lg:hidden flex justify-between items-center bg-[#043238] text-white p-4 shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-[#06444f] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold">Welcome, {user?.name?.split(" ")[0] || "User"} 👋</h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/raise-funds"
            className="flex items-center gap-1 bg-[#06444f] border-white border text-white font-bold px-3 py-1 rounded-lg shadow hover:bg-[#f3b838] hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
          </Link>

          <div className="group relative">
            <motion.div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer"
              onClick={() => setShowLogout((prev) => !prev)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-intro-id="avatar-step"
            >
              {user?.avatar && <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />}
            </motion.div>

            <AnimatePresence>
              {showLogout && (
                <motion.button
                  onClick={handleLogout}
                  className="absolute top-full mt-2 right-0 bg-[#4A9782] text-white px-3 py-1 rounded-md shadow-md text-sm z-10 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <LogOut size={14} /> Logout
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.aside
              className="lg:hidden fixed top-0 left-0 h-full w-64 bg-[#06444f] border-r border-orange shadow-xl z-50 p-6 flex-col justify-between"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                    <h2 className="text-white text-lg font-bold">Unessa</h2>
                  </div>
                  <button
                    className="text-white hover:text-[#f3b838] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map(({ path, icon: Icon, label, introId }) => (
                    <Link
                      key={path}
                      to={path}
                      className={linkClass(path)}
                      data-intro-id={introId}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="mt-4 w-full flex items-center gap-2 justify-center border border-white rounded-md px-4 py-2 text-white hover:text-[#f3b838] hover:border-[#f3b838] transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex flex-col bg-[#06444f] border-r border-orange w-72 p-6 justify-between min-h-screen sticky top-0"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <div>
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer mb-4"
              onClick={() => setShowLogout((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-intro-id="avatar-step"
            >
              {user?.avatar && <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />}
            </motion.div>
            <h2 className="text-white font-bold text-xl">{user?.name?.split(" ")[0] || "User"}</h2>
          </div>

          <nav className="flex flex-col gap-3">
            {navLinks.map(({ path, icon: Icon, label, introId }) => (
              <Link
                key={path}
                to={path}
                className={linkClass(path)}
                data-intro-id={introId}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#043238] hover:bg-[#043238]/90 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 bg-[#043238] min-h-screen overflow-y-auto">
        {/* Desktop Header */}
        {!isMobile && (
          <motion.header 
            className="flex justify-between items-center bg-[#06444f] text-white p-4 shadow-md"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.h1 
              className="text-2xl font-bold"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome, {user?.name?.split(" ")[0] || "User"} 👋
            </motion.h1>
          </motion.header>
        )}

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

        {/* Quiz Button */}
        {quizStatus === "notAttempted" && !showQuiz && (
          <button
            onClick={() => setShowQuiz(true)}
            className="fixed bottom-6 right-6 bg-[#FFB823] text-[#043238] font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform z-50 flex items-center gap-2"
          >
            <span>Take Quiz</span>
          </button>
        )}

        {showQuiz && (
          <QuizOverlay
            onClose={() => setShowQuiz(false)}
            onComplete={handleQuizComplete}
          />
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;