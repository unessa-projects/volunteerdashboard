import { useState, useCallback } from 'react';

export const useQuiz = (setUser) => {
  // State to control the visibility of the QuizOverlay component
  const [showQuiz, setShowQuiz] = useState(false);

  // State to track the quiz result, initialized from localStorage
  const [quizStatus, setQuizStatus] = useState(
    () => localStorage.getItem("quizStatus") || "notAttempted"
  );

  // Handles the completion of the quiz
  const handleQuizComplete = useCallback((result) => {
    setQuizStatus(result);
    localStorage.setItem("quizStatus", result);

    // If the user passed, we need to update the main user state
    // because the QuizOverlay might have updated user data in localStorage.
    if (result === "passed") {
      const storedUser = localStorage.getItem("googleUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setShowQuiz(false); // Hide the overlay after completion
  }, [setUser]);

  // Clears quiz status from storage, typically on logout
  const clearQuizStatusOnLogout = useCallback(() => {
    localStorage.removeItem("quizStatus");
  }, []);

  return { showQuiz, setShowQuiz, handleQuizComplete, clearQuizStatusOnLogout };
};

