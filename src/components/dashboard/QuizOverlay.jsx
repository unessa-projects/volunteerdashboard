import React, { useState, useEffect } from "react";
import axios from "axios";

const quizData = [
  { question: "What is the duration of the Fundraising Volunteer role?", options: ["15 Days", "30 Days", "45 Days", "60 Days"], answer: 1 },
  { question: "Where will you be working from?", options: ["Assigned center", "College campus", "Remote – anytime, anywhere", "Specific city assigned by the foundation"], answer: 2 },
  { question: "💡 What is your main mission as a volunteer?", options: ["Attend daily team meetings", "Design fundraising posters", "Leverage your personal network to raise funds", "Conduct research on child education"], answer: 2 },
  { question: "🏆 What is the name of the highest fundraising tier?", options: ["LEGEND", "HERO", "ICON", "IMPACTOR"], answer: 0 },
  { question: "📈 How much will you earn as a stipend?", options: ["Flat ₹1,000 regardless of funds", "30% of funds raised", "20% of funds raised", "No stipend"], answer: 3 },
];

const successEmojis = ["🎉", "🌟", "✨", "🏆", "👏", "👍", "💯"];
const getRandomEmoji = () => successEmojis[Math.floor(Math.random() * successEmojis.length)];

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
  const [currentEmoji, setCurrentEmoji] = useState("🎉");

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
      setCurrentEmoji(getRandomEmoji());
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
    let classes = "w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 mb-2 text-sm ";
    
    if (showAnswer) {
      if (index === question.answer) {
        classes += "bg-green-100 text-green-800 border-green-300 font-medium ";
      } else if (selectedOption === index) {
        classes += "bg-red-100 text-red-800 border-red-300 font-medium ";
      } else {
        classes += "bg-gray-50 border-gray-200 text-gray-700";
      }
    } else {
      classes += "bg-white border-gray-300 text-gray-800 hover:bg-blue-50";
      if (selectedOption === index) {
        classes += " border-blue-500 bg-blue-50";
      }
    }
    return classes;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white text-gray-800 rounded-xl shadow-xl w-full max-w-sm mx-2 p-4 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => onComplete("failed")}
          disabled={loading}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-light"
        >
          &times;
        </button>

        {quizResult ? (
          <div className="text-center py-4">
            <div className="mb-3">
              {quizResult.includes("Congratulations") ? (
                <div className="text-4xl mb-2">
                  {currentEmoji}
                </div>
              ) : (
                <div className="text-4xl mb-2">
                  ❌
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">
                {quizResult.includes("Congratulations") ? "Quiz Passed!" : "Quiz Failed!"}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-3 px-2">
              {quizResult}
            </p>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {quizResult.includes("Congratulations") && (
              <div className="mt-3 animate-bounce">
                <div className="text-2xl">{getRandomEmoji()}</div>
              </div>
            )}
          </div>
        ) : showIntro ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">📝</div>
            <h2 className="text-xl font-bold mb-2">You Have a Small Task!</h2>
            <p className="text-sm text-gray-600 mb-4 px-2">
              Answer a few questions correctly to receive your official <span className="font-bold text-blue-600">Offer Letter</span>.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-700"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Question {currentQuestion + 1}</h2>
              <span className="text-sm font-medium text-blue-600">
                {currentQuestion + 1}/{quizData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-base font-medium mb-3">{question.question}</p>
            
            <div className="space-y-2">
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
              <div className="mt-4">
                <div className={`mb-3 p-2 rounded-lg text-center ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  <p className="font-medium text-sm">
                    {isCorrect ? (
                      <span className="flex items-center justify-center">
                        <span className="text-lg mr-1">{currentEmoji}</span> Correct!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="text-lg mr-1">💡</span> Incorrect
                      </span>
                    )}
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 text-xs">
                      Correct answer: <strong>{question.options[question.answer]}</strong>
                    </p>
                  )}
                </div>
                
                {/* Next/Finish button - mobile optimized */}
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`w-full py-2 rounded-full text-sm font-semibold shadow transition-colors ${
                    loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Processing..." : currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizOverlay;