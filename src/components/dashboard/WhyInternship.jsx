import React from 'react';
const WhyInternship = () => {
  return (
    <div className="bg-cyan-900 text-white p-4 sm:p-6 md:p-8">
      {/* Hero Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h1 className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Honestly? Forget the boring internships.
        </h1>
        <p className="text-base sm:text-lg md:text-xl">
          This is a chance to be the main character in a mission that actually matters. You get to flex your influence for good, building a community and making a real-world impact—all on your own time, from anywhere. It's remote, it's flexible, and it's a vibe.
        </p>
      </div>
      {/* Future Impact Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
          How this experience will shape your future
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6">
          This is how you level up your resume for real. This experience isn't just a bullet point—it's a launchpad.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {/* Skill 1 */}
          <div className="p-3 sm:p-4 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Networking</h3>
            <p className="text-sm sm:text-base">Master the art of the persuasive DM and build a network that's actually valuable.</p>
          </div>
          {/* Skill 2 */}
          <div className="p-3 sm:p-4 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Digital Strategy</h3>
            <p className="text-sm sm:text-base">Learn how to go viral for a good cause and build a killer online presence.</p>
          </div>
          {/* Skill 3 */}
          <div className="p-3 sm:p-4 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Leadership</h3>
            <p className="text-sm sm:text-base">Develop the confidence to drive change and lead the way.</p>
          </div>
        </div>
      </div>
      {/* Resume Section */}
      <div className="p-4 sm:p-5 md:p-6 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
          Your resume will be full of wins, not just words.
        </h2>
        <p className="text-base sm:text-lg md:text-xl">
          This is your chance to stand out from the crowd and show everyone you're ready to do big things.
        </p>
      </div>
    </div>
  );
}
export default WhyInternship;