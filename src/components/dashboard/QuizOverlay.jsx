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
  const [showResult, setShowResult] = useState(false);

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
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption(null);
      setShowAnswer(false);
      return;
    }

    // Quiz completed
    setLoading(true);
    const finalScore = score;
    const passed = finalScore >= 4;
    
    try {
      if (passed) {
        setQuizResult("⏳ Generating your offer letter...");
        setShowResult(true);
        
        await axios.post("https://unessa-backend.onrender.com/offer/generate-offer", {
          userId: user.id,
          email: user.email,
          name: user.name,
        }, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
          withCredentials: true
        });
      }

      await axios.post("https://unessa-backend.onrender.com/api/users/quiz-status", {
        email: user.email,
        status: passed ? "passed" : "failed",
      });

      if (passed) {
        const updatedUser = { ...user, quizPassed: true };
        localStorage.setItem("googleUser", JSON.stringify(updatedUser));
        localStorage.setItem("quizStatus", "passed");
        setQuizResult("🎉 Congratulations! Offer letter sent to your email and dashboard.");
        setTimeout(() => onComplete("passed"), 3000);
      } else {
        localStorage.setItem("quizStatus", "failed");
        setQuizResult("❌ Sorry, you failed. Try again later.");
        setShowResult(true);
        setTimeout(() => onComplete("failed"), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to process your result. Please try again.");
      setQuizResult("❌ Something went wrong. Please try again later.");
      setShowResult(true);
      setLoading(false);
    }
  };

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion) / quizData.length) * 100;

  const getOptionClasses = (index) => {
    let classes = "w-full text-left px-3 py-2 rounded-lg border text-sm mb-1 ";
    
    if (showAnswer) {
      if (index === question.answer) {
        classes += "bg-green-50 text-green-800 border-green-200 ";
      } else if (selectedOption === index) {
        classes += "bg-red-50 text-red-800 border-red-200 ";
      } else {
        classes += "bg-gray-50 border-gray-200 text-gray-700";
      }
    } else {
      classes += "bg-white border-gray-300 text-gray-800";
      if (selectedOption === index) {
        classes += " border-blue-500 bg-blue-50";
      }
    }
    return classes;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-gray-900 bg-opacity-75 backdrop-blur-sm">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-xs mx-2 p-3 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => onComplete("failed")}
          disabled={loading}
          className="absolute top-1 right-1 text-gray-400 hover:text-red-500 text-xl font-light"
        >
          &times;
        </button>

        {quizResult && showResult ? (
          <div className="text-center py-3">
            <div className="mb-2">
              {quizResult.includes("Congratulations") ? (
                <div className="text-3xl mb-1">{currentEmoji}</div>
              ) : (
                <div className="text-3xl mb-1">❌</div>
              )}
              <h2 className="text-lg font-bold mb-1">
                {quizResult.includes("Congratulations") ? "Quiz Passed!" : "Quiz Failed!"}
              </h2>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              {quizResult}
            </p>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {quizResult.includes("Congratulations") && (
              <div className="mt-2 animate-bounce">
                <div className="text-xl">{getRandomEmoji()}</div>
              </div>
            )}
          </div>
        ) : showIntro ? (
          <div className="text-center py-3">
            <div className="text-3xl mb-2">📝</div>
            <h2 className="text-lg font-bold mb-1">Quick Quiz!</h2>
            <p className="text-xs text-gray-600 mb-3">
              Answer correctly to get your <span className="font-bold text-blue-600">Offer Letter</span>.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-700"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-bold">Q{currentQuestion + 1}</h2>
              <span className="text-xs text-blue-600">
                {currentQuestion + 1}/{quizData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
              <div 
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm font-medium mb-2">{question.question}</p>
            
            <div className="space-y-1">
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
              <div className="mt-3">
                <div className={`mb-2 p-1.5 rounded text-center text-xs ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {isCorrect ? (
                    <span className="flex items-center justify-center">
                      <span className="text-sm mr-1">{currentEmoji}</span> Correct!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="text-sm mr-1">💡</span> Incorrect
                    </span>
                  )}
                  {!isCorrect && (
                    <p className="mt-0.5 text-2xs">
                      Answer: <strong>{question.options[question.answer]}</strong>
                    </p>
                  )}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className={`w-full py-1.5 rounded-full text-xs font-semibold ${
                    loading ? "bg-gray-400" : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {loading ? "..." : currentQuestion < quizData.length - 1 ? "Next" : "Finish"}
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