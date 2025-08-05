import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartOrientation = () => {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    navigate('/orientation'); // Adjust route as needed
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        WELCOME TO
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
        Unessa Foundation
      </h2>
      <p className="text-gray-600 max-w-xl mb-10">
        We've designed an interactive journey to give you an in-depth understanding about Unessa Foundation and your internship.
      </p>
      <div
        onClick={handleResumeClick}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full cursor-pointer transition"
      >
        Resume Your Journey
      </div>
    </div>
  );
};

export default StartOrientation;
