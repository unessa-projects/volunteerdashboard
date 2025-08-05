import React, { useEffect, useState } from "react";

const FullCircleProgressBar = ({ percentage }) => {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#334155"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="url(#glowGradient)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 1s ease-out" }}
      />
      <defs>
        <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#eca90e" />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#ECA90E"
        fontSize="40"
        fontWeight="bold"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const ImpactCalculator = () => {
  const [progress, setProgress] = useState(0);
  const [amount, setAmount] = useState(0);
  const [copied, setCopied] = useState(false);
  const target = 36000;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user?.amount) {
      setAmount(user.amount);
      const calculated = Math.min(Math.round((user.amount / target) * 100), 100);

      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        setProgress(start);
        if (start >= calculated) clearInterval(interval);
      }, 15);
    }
  }, []);

  const handleCopyLink = () => {
    const baseURL = "http://localhost:5173/form";
    const refName = localStorage.getItem("username");
    const finalURL = `${baseURL}?ref=${encodeURIComponent(refName)}`;
    navigator.clipboard.writeText(finalURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const baseURL = "http://localhost:5173/form";
    const refName = localStorage.getItem("username");
    const finalURL = `${baseURL}?ref=${encodeURIComponent(refName)}`;

    const message = `Hello!\nI’m volunteering with Unessa Foundation...\n🔗 Donate now: ${finalURL}\nThank you for believing in this mission. 💖`;

    const whatsappURL = `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#096d7d33]  shadow-lg overflow-hidden text-white p-9 md:p-10">
      {/* Left: Text & Buttons */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-start gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Impact Calculator</h2>
        <p className="text-lg">You're <span className="font-semibold">{progress}%</span> closer to your impact goal.</p>
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

      {/* Right: Full Circle Chart */}
      <div className="md:w-1/2 w-full flex text-[#ECA90E] justify-center  items-center mt-8 md:mt-0">
        <div className="w-[180px] h-[180px] text-[#ECA90E]">
          <FullCircleProgressBar percentage={progress} />
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;
