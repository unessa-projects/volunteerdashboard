// src/pages/CertificatesPage.jsx
import React, { useState, useEffect } from "react";
import QuizOverlay from "../dashboard/QuizOverlay";
import axios from "axios";

const CertificatesPage = () => {
//   const user = JSON.parse(localStorage.getItem("googleUser") || "{}");
//   const [quizStatus, setQuizStatus] = useState(localStorage.getItem("quizStatus") || "notAttempted");
  const [showQuiz, setShowQuiz] = useState(false);

  const user = JSON.parse(localStorage.getItem("googleUser") || "{}");
  const storageKey = `quizStatus_${user._id}`;
  const [quizStatus, setQuizStatus] = useState(localStorage.getItem(storageKey) || "notAttempted");
  

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/api/users/quiz-status/${user.email}`)
        .then(res => setQuizStatus(res.data.quizStatus))
        .catch(() => setQuizStatus("notAttempted"));
    }
  }, [user]);

  const handleQuizComplete = (result) => {
    setQuizStatus(result);
    localStorage.setItem(storageKey, result);
    setShowQuiz(false);
  };

  const hasPassed = quizStatus === "passed";
  const hasFailed = quizStatus === "failed";
  const notAttempted = quizStatus === "notAttempted";

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Certificates</h1>

      {/* Offer Letter Section */}
      <div className="bg-[#06444f] p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold">Offer Letter</h2>

        {hasPassed ? (
          // Show Download Button if Passed
          <a
            href={`http://localhost:5000/offer-${user._id}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            🎉 Download Offer Letter
          </a>
        ) : (
          // Show Locked Message if Not Passed
          <div className="mt-2 text-gray-300">
            🔒 Locked — Complete the quiz to unlock.
          </div>
        )}

        {/* Start or Retry Quiz Button */}
        {(notAttempted || hasFailed) && (
          <button
            onClick={() => setShowQuiz(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {hasFailed ? "Retry Quiz" : "Start Quiz"}
          </button>
        )}
      </div>

      {/* Other Certificates (Locked by default) */}
      <div className="bg-[#06444f] p-4 rounded-lg shadow-lg mb-4 text-gray-400">
        <h2 className="text-xl font-semibold">Completion Certificate</h2>
        <p className="mt-2">🔒 Locked — Available after internship completion.</p>
      </div>

      <div className="bg-[#06444f] p-4 rounded-lg shadow-lg text-gray-400">
        <h2 className="text-xl font-semibold">Experience Letter</h2>
        <p className="mt-2">🔒 Locked — Available after internship completion.</p>
      </div>

      {/* Quiz Overlay */}
      {showQuiz && <QuizOverlay user={user} onComplete={handleQuizComplete} />}
    </div>
  );
};

export default CertificatesPage;
