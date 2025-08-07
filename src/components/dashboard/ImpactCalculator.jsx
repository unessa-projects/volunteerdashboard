import React, { useEffect, useState } from "react";
import FullCircleProgressBar from "./FullCircleProgressBar"; // Make sure this component exists

const ImpactCalculator = () => {
  const [progress, setProgress] = useState(0);
  const [amount, setAmount] = useState(0);
  const [copied, setCopied] = useState(false);
  const target = 36000;

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleShare = () => {
    const message = `Support my cause and help me reach my donation goal! 💛\n${window.location.href}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    const updateProgress = (newAmount: number) => {
      const calculated = Math.min(Math.round((newAmount / target) * 100), 100);
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        setProgress(start);
        if (start >= calculated) clearInterval(interval);
      }, 15);
    };

    const syncAmount = () => {
      const user = JSON.parse(localStorage.getItem("googleUser") || "{}");
      if (user?.amount && user.amount !== amount) {
        setAmount(user.amount);
        updateProgress(user.amount);
      }
    };

    syncAmount(); // initial run on mount
    const interval = setInterval(syncAmount, 3000); // check every 3 seconds for updates
    return () => clearInterval(interval);
  }, [amount]);

  return (
    <div className="flex flex-col md:flex-row bg-[#096d7d33] shadow-lg overflow-hidden text-white p-9 md:p-10">
      {/* Left Side - Text and Buttons */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Impact Calculator</h2>
        <p className="text-lg">
          You're <span className="font-semibold">{progress}%</span> closer to your impact goal.
        </p>
        <p className="text-lg">
          ₹{amount} <span className="opacity-70">raised of</span> ₹{target}
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={handleCopyLink}
            className="bg-[#ECA90E] px-5 py-2 rounded-md font-medium hover:scale-105 hover:shadow-xl transition"
          >
            Copy Link
          </button>
          <button
            onClick={handleShare}
            className="bg-green-600 px-5 py-2 text-white rounded-md font-medium hover:scale-105 hover:shadow-xl transition"
          >
            Share on WhatsApp
          </button>
        </div>

        {copied && (
          <span className="text-green-300 text-sm mt-2">✅ Link copied to clipboard!</span>
        )}
      </div>

      {/* Right Side - Progress Chart */}
      <div className="md:w-1/2 w-full flex text-[#ECA90E] justify-center items-center mt-8 md:mt-0">
        <div className="w-[180px] h-[180px] text-[#ECA90E]">
          <FullCircleProgressBar percentage={progress} />
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;
