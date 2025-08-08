import React, { useEffect, useState, useMemo  } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { Plus, Home, BarChart2, Users, DollarSign, LogOut, X, Menu, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuizOverlay from "../components/dashboard/QuizOverlay";
import { Tour } from '@reactour/tour';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize user state from localStorage (parsed JSON or null)
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("googleUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      // If JSON parsing fails, clear corrupted storage and return null
      localStorage.removeItem("googleUser");
      return null;
    }
  });

  // Loading is true if user data missing, false otherwise
  const [isLoading, setIsLoading] = useState(() => !user);

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user data
      navigate("/login", { replace: true });
    } else {
      // User exists, stop loading state
      setIsLoading(false);
    }
  }, [user, navigate]);

  // Extract first name from full name safely, fallback "User"
  const username = user?.name ? user.name.split(" ")[0] : "User";

  // User avatar or null fallback
  const avatar = user?.avatar || null;

  // Other states
  const [showLogout, setShowLogout] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Centralized navigation links
  const navLinks = [
    { path: "/dashboard", icon: Home, label: "Home", tourId: { mobile: "tour-home-mobile", desktop: "tour-home-desktop" } },
    { path: "/insights", icon: BarChart2, label: "Insights", tourId: { mobile: "tour-insights-mobile", desktop: "tour-insights-desktop" } },
    { path: "/donations", icon: DollarSign, label: "Donations", tourId: { mobile: "tour-donations-mobile", desktop: "tour-donations-desktop" } },
    { path: "/community", icon: Users, label: "Learning" },
    { path: "/certificates", icon: Download, label: "Certificates" }
  ];

  const [quizStatus, setQuizStatus] = useState(() => localStorage.getItem("quizStatus") || "notAttempted");

  // Define tour steps based on device
  const steps = useMemo(() => {
    const tourSteps = isMobile // Use the 'isMobile' state variable from the component's scope
      ? [
          { selector: '[data-tour-id="tour-avatar-mobile"]', content: "This is your profile avatar. Click here to manage your account and logout." },
          { selector: '[data-tour-id="tour-home-mobile"]', content: "Go back to your dashboard anytime by clicking Home." },
          { selector: '[data-tour-id="tour-insights-mobile"]', content: "Check analytics and insights about your impact here." },
          { selector: '[data-tour-id="tour-donations-mobile"]', content: "Track and manage donations here." },
        ]
      : [
          { selector: '[data-tour-id="tour-avatar-desktop"]', content: "This is your profile avatar. Click here to manage your account and logout." },
          { selector: '[data-tour-id="tour-home-desktop"]', content: "Go back to your dashboard anytime by clicking Home." },
          { selector: '[data-tour-id="tour-insights-desktop"]', content: "Check analytics and insights about your impact here." },
          { selector: '[data-tour-id="tour-donations-desktop"]', content: "Track and manage donations here." },
        ];

    return tourSteps.map(step => ({
      ...step,
      disableBeacon: true,
      styles: {
        backgroundColor: "#043238",
        color: "white"
      }
    }));
  }, [isMobile]);

  // Sync user state on localStorage change (e.g., from another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("googleUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Trigger tour for new user when user data and steps are ready
  useEffect(() => {
    // A new user is one who has not seen the tour yet.
    if (user && !user.hasSeenTour) {
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [user, steps]);

  const handleTourClose = () => {
    setShowTour(false);
    if (user?.email) {
      // Optimistically update the user state to prevent re-showing the tour on refresh
      const updatedUser = { ...user, hasSeenTour: true };
      setUser(updatedUser);
      localStorage.setItem('googleUser', JSON.stringify(updatedUser));

      // Then, notify the backend that the tour has been seen
      fetch("https://unessa-backend.onrender.com/api/users/mark-tour-seen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
    }
  };

  // Example logout handler
  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    localStorage.removeItem("quizStatus");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  
  const handleQuizComplete = (result) => {
    setQuizStatus(result);
    localStorage.setItem("quizStatus", result);
    if (result === "passed") {
      // Just re-read from storage to update the single 'user' state
      const storedUser = localStorage.getItem("googleUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }
    setShowQuiz(false);
  };





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
     
 <Tour
        steps={steps}
        isOpen={showTour}
        onRequestClose={handleTourClose}
        styles={{
          popover: (base) => ({
            ...base,
            backgroundColor: '#043238',
            color: 'white',
            zIndex: 9999,
          }),
          mask: (base) => ({
            ...base,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }),
          maskArea: (base) => ({
            ...base,
            rx: 10,
          }),
          badge: (base) => ({
            ...base,
            backgroundColor: '#FFB823',
          }),
          controls: (base) => ({
            ...base,
            marginTop: 20,
          }),
          close: (base) => ({
            ...base,
            color: '#FFB823',
          }),
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
            {isMobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
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
              whilehover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-tour-id="tour-avatar-mobile"
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

      {/* Mobile Menu (appears from left) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
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
                        data-tour-id={link.tourId?.mobile}
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
                  whilehover={{ scale: 1.02 }}
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
        data-tour-id="sidebar"
      >
        <div>
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
             data-tour-id="logo"
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
                data-tour-id={item.tourId?.desktop}
              >
                <Link to={item.path} className={linkClass(item.path)}>
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
            whilehover={{ scale: 1.02 }}
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
              
            </motion.div>

            <motion.div 
              className="group relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer"
                onClick={() => setShowLogout((prev) => !prev)}
                whilehover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-tour-id="tour-avatar-desktop"
              >
                {avatar && <img  src={avatar} alt="avatar" className="w-full h-full object-cover" />}
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
            data-tour-id={item.tourId?.mobile}
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
