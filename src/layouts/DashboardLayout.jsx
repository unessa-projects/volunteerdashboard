import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { Plus, Home, BarChart2, Users, DollarSign, LogOut, X, Menu, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizOverlay from "../components/dashboard/QuizOverlay";
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize user state from localStorage (parsed JSON or null)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStatus, setQuizStatus] = useState(() => localStorage.getItem("quizStatus") || "notAttempted");
  const [stepsEnabled, setStepsEnabled] = useState(false);

  useEffect(() => {
    const storedUserString = localStorage.getItem("googleUser");
    let email = null;

    if (storedUserString) {
      try {
        const parsedUser = JSON.parse(storedUserString);
        email = parsedUser.email;
      } catch {
        localStorage.removeItem("googleUser");
      }
    }

    if (!email) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://unessa-backend.onrender.com/api/users/${email}`);

        if (!response.ok) {
          if (response.status === 404) {
            navigate("/login", { replace: true });
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
        localStorage.setItem("googleUser", JSON.stringify(userData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login", { replace: true });
      }
    };

    fetchUserData();
  }, [navigate]);

  const username = user?.name ? user.name.split(" ")[0] : "User";
  const avatar = user?.avatar || null;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { path: "/dashboard", icon: Home, label: "Home", introId: "home-step" },
    { path: "/insights", icon: BarChart2, label: "Insights", introId: "insights-step" },
    { path: "/donations", icon: DollarSign, label: "Donations", introId: "donations-step" },
    { path: "/community", icon: Users, label: "Learning" },
    { path: "/certificates", icon: Download, label: "Certificates" }
  ];

  const steps = [
    {
      element: '[data-intro-id="avatar-step"]',
      intro: "This is your profile avatar. Click here to manage your account and logout.",
      position: 'bottom'
    },
    {
      element: '[data-intro-id="home-step"]',
      intro: "Go back to your dashboard anytime by clicking Home.",
      position: isMobile ? 'bottom' : 'right'
    },
    {
      element: '[data-intro-id="insights-step"]',
      intro: "Check analytics and insights about your impact here.",
      position: isMobile ? 'bottom' : 'right'
    },
    {
      element: '[data-intro-id="donations-step"]',
      intro: "Track and manage donations here.",
      position: isMobile ? 'bottom' : 'right'
    }
  ];

  useEffect(() => {
    if (user && !user.hasSeenTour) {
      const timer = setTimeout(() => {
        setStepsEnabled(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleTourComplete = () => {
    setStepsEnabled(false);
    if (user?.email) {
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
    return <div>Loading...</div>;
  }

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3 text-xs lg:text-lg rounded-xl transition-all duration-300 ${
      isActive(path)
        ? "text-[#FFB823] bg-[#043238]/70 shadow-[0_0_20px_4px_rgba(236,169,14,0.4)] font-semibold"
        : "text-white hover:text-[#FFB823] hover:bg-[#043238]/40"
    }`;

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const popIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#4A9782]">
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={handleTourComplete}
        options={{
          nextLabel: 'Next →',
          prevLabel: '← Back',
          doneLabel: 'Got it!',
          skipLabel: 'Skip',
          hideNext: false,
          tooltipClass: 'bg-[#043238] text-white',
          highlightClass: 'tour-highlight',
          showStepNumbers: false,
          showBullets: true,
          showProgress: true,
          disableInteraction: false,
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
          <h1 className="text-xl font-bold">Welcome, {username} 👋</h1>
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
              {avatar && <img src={avatar} alt="avatar" className="w-full h-full object-cover" />}
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
                    <img src="/logo.png" alt="Unessa Logo" className="w-12 h-12 object-contain" />
                    <h2 className="text-white text-lg font-bold">Unessa Foundation</h2>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-white hover:text-[#FFB823]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map(link => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.path}
                        data-intro-id={link.introId}
                        to={link.path}
                        className={linkClass(link.path)}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent size={18} /> {link.label === 'Certificates' ? 'Download Certificates' : link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="text-center mt-6">
                <motion.button
                  onClick={handleLogout}
                  className="w-full bg-[#ECA90E] shadow-[0_0_20px_4px_rgba(236,169,14,0.4)] text-white px-4 py-2 rounded-md text-sm hover:bg-[#d6990d] transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut size={16} /> Logout
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside 
        className="hidden lg:flex fixed top-0 left-0 h-full w-72 bg-[#06444f] border-r border-orange shadow-xl z-50 p-6 flex-col justify-between"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <img src="/logo.png" alt="Unessa Logo" className="w-16 h-16 object-contain" />
            <h2 className="text-white text-xl font-bold">Unessa Foundation</h2>
          </motion.div>

          <nav className="flex flex-col gap-3">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.path}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  className={linkClass(item.path)}
                  data-intro-id={item.introId}
                >
                  <item.icon size={20} />
                  {' '}
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        <motion.div 
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleLogout}
            className="w-full bg-[#ECA90E] shadow-[0_0_20px_4px_rgba(236,169,14,0.4)] text-white px-4 py-2 rounded-md text-sm hover:bg-[#d6990d] transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} /> Logout
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 min-h-screen pb-20 lg:pb-0">
        {/* Desktop Header */}
        <motion.header 
          className="hidden lg:flex justify-between items-center bg-[#043238] text-white p-4 shadow-md"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-xl lg:text-3xl font-bold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome, {username} 👋
          </motion.h1>

          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer"
                onClick={() => setShowLogout((prev) => !prev)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-intro-id="avatar-step"
              >
                {avatar && <img src={avatar} alt="avatar" className="w-full h-full object-cover" />}
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
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <motion.main 
          className="p-4 bg-[#043238] min-h-[calc(100vh-80px)]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Outlet />
          {showQuiz && <QuizOverlay user={user} onComplete={handleQuizComplete} />}
        </motion.main>
      </div>

      {/* Footer Navigation (mobile only) */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#06444f] border-t border-orange shadow-lg flex justify-around items-center p-2 z-50"
        initial="hidden"
        animate="visible"
        variants={popIn}
      >
        {navLinks.filter(link => link.path !== '/certificates').map((item, index) => (
          <motion.div
            key={item.path}
            initial="hidden"
            animate="visible"
            variants={popIn}
            transition={{ delay: index * 0.1 }}
            className="flex-1"
            data-intro-id={item.introId}
          >
            <Link to={item.path} className={linkClass(item.path)}>
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.nav>
    </div>
  );
};

export default DashboardLayout;