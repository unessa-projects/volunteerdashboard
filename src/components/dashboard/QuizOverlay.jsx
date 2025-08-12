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
      setScore(prev => prev + 1);
    }
  };

  const handleNext = async () => {
    const finalScore = score;
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      if (finalScore >= 4) {
        if (loading) return;
        setLoading(true);
        setQuizResult("⏳ Please wait, your offer letter is being generated...");
        
        try {
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
          
          await axios.post("https://unessa-backend.onrender.com/api/users/quiz-status", {
            email: user.email,
            status: "passed",
          });
          
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

  const getOptionClasses = (index) => {
    let classes = "w-full text-left px-5 py-3 rounded-xl border-2 transition-all duration-300 ease-in-out cursor-pointer ";
    
    if (showAnswer) {
      if (index === question.answer) {
        classes += "bg-green-100 border-green-500 text-green-800 font-bold shadow-md";
      } else if (selectedOption === index) {
        classes += "bg-red-100 border-red-500 text-red-800 font-bold shadow-md";
      } else {
        classes += "bg-white border-gray-200 text-gray-400";
      }
    } else {
      classes += "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:border-blue-400";
      if (selectedOption === index) {
        classes += " border-blue-500 bg-blue-50";
      }
    }
    return classes;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white text-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative transform transition-transform duration-300 scale-100">
        <button
          onClick={() => onComplete("failed")}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-light leading-none"
        >
          &times;
        </button>

        {quizResult ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">{quizResult.includes("Congratulations") ? "Quiz Passed!" : "Quiz Failed!"}</h2>
            <p className="text-lg text-gray-600 mb-6">{quizResult}</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        ) : showIntro ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">You Have a Small Task! 📝</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Answer a few questions correctly to receive your official <span className="font-extrabold text-blue-600">Offer Letter</span> and begin your journey.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Quiz Time</h2>
              <span className="text-lg font-medium text-blue-600">
                Question {currentQuestion + 1} of {quizData.length}
              </span>
            </div>

            <p className="text-xl font-semibold mb-6">{question.question}</p>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={showAnswer}
                  className={getOptionClasses(index)}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {showAnswer && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Processing..." : currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
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