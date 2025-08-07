import React from "react";
import { motion } from "framer-motion";

const rewards = [
  {
    title: "VIBE",
    amount: "₹1,000 - ₹5,000",
    perks: [
      "- Setting the tone for change",
      "20% Stipend",
      "Certificate of completion",
    ],
    bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
    borderColor: "border-yellow-300",
    textColor: "text-gray-900",
  },
  {
    title: "MOMENTUM",
    amount: "₹5,000 - ₹15,000",
    perks: [
      "- Building serious impact",
      "20% Stipend",
      "Certificate of completion",
      "LinkedIn recommendation from our President",
      "Certificate for Crowdfunding course",
    ],
    bgColor: "bg-gradient-to-br from-indigo-500 to-purple-500",
    borderColor: "border-purple-300",
    textColor: "text-white",
  },
  {
    title: "CATALYST",
    amount: "₹15,000 - ₹30,000",
    perks: [
      "- You're the game-changer",
      "20% Stipend",
      "Certificate of completion",
      "LinkedIn recommendation from our President",
      "Certificate for Crowdfunding course",
      "Social Media Shoutout",
      "Internship Opportunity (As per intern's qualifications and vacancy)",
    ],
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-400",
    borderColor: "border-blue-300",
    textColor: "text-white",
  },
  {
    title: "ICON",
    amount: "₹30,000+",
    perks: [
      "- A true legend, inspiring ultimate change",
      "20% Stipend",
      "Certificate of completion",
      "LinkedIn recommendation from our President",
      "Certificate for Crowdfunding course",
      "Social Media Shoutout",
      "Internship Opportunity (As per intern's qualifications and vacancy)",
      "Letter of Recommendation from Founder of Unessa",
    ],
    bgColor: "bg-gradient-to-br from-pink-500 to-red-400",
    borderColor: "border-pink-300",
    textColor: "text-white",
  },
];


const Rewards = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="px-4 py-10 bg-[#06444f]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-4xl font-bold text-[#eca90e] mb-2">
          REWARDS
        </h1>
        <p className="text-white max-w-2xl  text-2xl mx-auto">
          Earn exciting rewards based on your fundraising achievements
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`rounded-xl p-6  rext-2xl shadow-lg border ${reward.borderColor} ${reward.bgColor} transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h2 className={`text-3xl font-medium ${reward.textColor}`}>
                  {reward.title}
                </h2>
                <p className="text-black text-2xl font-medium mt-1">
                  {reward.amount}
                </p>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-2">
                  {reward.perks.map((perk, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className={`w-4 h-4 mt-1 mr-2 flex-shrink-0 ${reward.textColor}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Rewards;