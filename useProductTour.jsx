import { useState, useEffect, useMemo } from 'react';

// It's best practice to store URLs in environment variables
const API_URL = "https://unessa-backend.onrender.com/api/users/mark-tour-seen";

export const useProductTour = (user, setUser, isMobile) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const tourSteps = useMemo(() => {
    const steps = isMobile
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

    // Apply common styles to all steps
    return steps.map(step => ({
      ...step,
      disableBeacon: true,
    }));
  }, [isMobile]);

  // Effect to trigger the tour for new users
  useEffect(() => {
    if (user && !user.hasSeenTour) {
      const timer = setTimeout(() => {
        setIsTourOpen(true);
      }, 3000); // Delay to let the user settle
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleTourClose = () => {
    setIsTourOpen(false);
    if (user?.email) {
      // Optimistically update local state and storage for a snappy UI
      const updatedUser = { ...user, hasSeenTour: true };
      setUser(updatedUser);
      localStorage.setItem('googleUser', JSON.stringify(updatedUser));

      // Notify the backend
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      }).catch(error => {
        console.error("Failed to mark tour as seen on the backend:", error);
      });
    }
  };

  return { isTourOpen, tourSteps, handleTourClose };
};

