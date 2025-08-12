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
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelectedOption(index);
    const correct = index === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    setShowAnswer(true);
    if (correct) {
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
  const progress = ((currentQuestion) / quizData.length) * 100;

  const getOptionClasses = (index) => {
    let classes = "w-full text-left px-5 py-3 rounded-lg border-2 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 mb-3 ";
    
    if (showAnswer) {
      if (index === question.answer) {
        classes += "bg-green-100 text-green-800 border-green-300 font-bold shadow-md relative ";
      } else if (selectedOption === index) {
        classes += "bg-red-100 text-red-800 border-red-300 font-bold shadow-md relative ";
      } else {
        classes += "bg-gray-50 border-gray-200 text-gray-500";
      }
    } else {
      classes += "bg-white border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-500";
      if (selectedOption === index) {
        classes += " border-blue-500 ring-4 ring-blue-200";
      }
    }
    return classes;
  };

  const renderOptionIcon = (index) => {
    if (!showAnswer) return null;
    
    if (index === question.answer) {
      return (
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-500">
          ✓
        </span>
      );
    } else if (selectedOption === index) {
      return (
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500">
          ✕
        </span>
      );
    }
    return null;
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
            <div className="mb-6">
              {quizResult.includes("Congratulations") ? (
                <div className="text-6xl mb-4">🎉</div>
              ) : (
                <div className="text-6xl mb-4">❌</div>
              )}
              <h2 className="text-3xl font-bold mb-4">
                {quizResult.includes("Congratulations") ? "Quiz Passed!" : "Quiz Failed!"}
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-6 px-4">{quizResult}</p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {quizResult.includes("Congratulations") && (
              <div className="mt-6 animate-bounce">
                <div className="text-4xl">✨</div>
              </div>
            )}
          </div>
        ) : showIntro ? (
          <div className="text-center py-10">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4">You Have a Small Task!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Answer a few questions correctly to receive your official <span className="font-extrabold text-blue-600">Offer Letter</span> and begin your journey.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Quiz Time</h2>
              <span className="text-lg font-medium text-blue-600">
                {currentQuestion + 1} / {quizData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xl font-semibold mb-6">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="relative">
                  {renderOptionIcon(index)}
                  <button
                    onClick={() => handleOptionClick(index)}
                    disabled={showAnswer}
                    className={getOptionClasses(index)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
            
            {showAnswer && (
              <div className="mt-8">
                <div className={`mb-6 p-4 rounded-lg text-center ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="font-bold text-lg">
                    {isCorrect ? (
                      <span className="flex items-center justify-center">
                        <span className="text-2xl mr-2">🎉</span> Correct! Well done!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="text-2xl mr-2">💡</span> Oops! That's not correct
                      </span>
                    )}
                  </p>
                  {!isCorrect && (
                    <p className="mt-2">The correct answer is: <strong>{question.options[question.answer]}</strong></p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={loading}
                    className={`px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors transform hover:scale-105 ${
                      loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Processing..." : currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
    
export default QuizOverlay;