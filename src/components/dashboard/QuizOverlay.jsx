import React, { useState, useEffect } from "react";
import axios from "axios";

const quizData = [
  { question: "What is the duration of the Fundraising Volunteer role?", options: ["15 Days", "30 Days", "45 Days", "60 Days"], answer: 1 },
  { question: "Where will you be working from?", options: ["Assigned center", "College campus", "Remote – anytime, anywhere", "Specific city assigned by the foundation"], answer: 2 },
  { question: "💡 What is your main mission as a volunteer?", options: ["Attend daily team meetings", "Design fundraising posters", "Leverage your personal network to raise funds", "Conduct research on child education"], answer: 2 },
  { question: "🏆 What is the name of the highest fundraising tier?", options: ["LEGEND", "HERO", "ICON", "IMPACTOR"], answer: 0 },
  { question: "📈 How much will you earn as a stipend?", options: ["Flat ₹1,000 regardless of funds", "30% of funds raised", "20% of funds raised", "No stipend"], answer: 3 },
];

const QuizOverlay = ({ user, onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleOptionClick = (index) => {
    if (showAnswer) return; 
    setSelectedOption(index);
    setShowAnswer(true);
    if (index === quizData[currentQuestion].answer) {
      setScore(prev => prev + 1);;
    }
  };

  const handleNext = async () => {
    // The previous logic for calculating the final score and handling the last question was slightly off.
    // It's better to update the score inside the handleOptionClick and just use the final score here.
    const finalScore = score; // The score is already updated.
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      // Logic for when the quiz is finished
      if (finalScore >= 4) { // Assuming the pass criteria is still 4 out of 5
        if (loading) return;
        setLoading(true);
        setQuizResult("⏳ Please wait, your offer letter is being generated...");
        
        try {
          // Generate offer letter
          await axios.post("https://unessa-backend.onrender.com/offer/generate-offer", {
            userId: user.id,
            email: user.email,
            name: user.name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`
            },
            withCredentials: true
          });
          
          // If the offer generation is successful, then call the next API
          await axios.post("https://unessa-backend.onrender.com/api/users/quiz-status", {
            email: user.email,
            status: "passed",
          });
          
          // Update local storage
          const updatedUser = { ...user, quizPassed: true };
          localStorage.setItem("googleUser", JSON.stringify(updatedUser));
          localStorage.setItem("quizStatus", "passed");
          
          setQuizResult("🎉 Congratulations! Offer letter sent to your email and also you can download it from dashboard.");
          setTimeout(() => onComplete("passed"), 5000);
          
        } catch (err) {
          console.error("Error generating offer letter:", err);
          setError("Failed to generate offer letter. Please try again.");
          setLoading(false);
          setQuizResult("❌ Something went wrong. Failed to generate your offer letter.");
        }
      } else {
        // Save failed status
        await axios.post("https://unessa-backend.onrender.com/api/users/quiz-status", {
          email: user.email,
          status: "failed",
        });
        localStorage.setItem("quizStatus", "failed");
        
        setQuizResult("❌ Sorry, you failed. Try again later.");
        onComplete("failed");
      }
    }
  };

  const question = quizData[currentQuestion];

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-lg w-full max-w-2xl p-8 relative">
        <button
          onClick={() => onComplete("failed")}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        {quizResult ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-black">Quiz Completed</h2>
            <p className="text-lg mb-6 text-gray-700">{quizResult}</p>
          </div>
        ) : showIntro ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-black">You Have a Small Task!</h2>
            <p className="text-lg mb-6 text-gray-700">
              Answer a few questions correctly to receive your{" "}
              <span className="font-bold text-blue-600">Offer Letter</span>.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-black">Quiz Time</h2>
            <p className="text-lg font-medium mb-4 text-black">
              Question {currentQuestion + 1}: {question.question}
            </p>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={showAnswer}
                  className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                    selectedOption === index
                      ? index === question.answer
                        ? "bg-green-100 border-green-500 text-green-800"
                        : "bg-red-100 border-red-500 text-red-800"
                      : "hover:bg-gray-100 border-gray-300 text-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showAnswer && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`px-6 py-2 rounded-lg text-white ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Generating..." : currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
    
export default QuizOverlay;