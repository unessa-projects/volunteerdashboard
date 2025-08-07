import React from 'react'
const UnderstandRole = () => {
  return (
    <div className="bg-cyan-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      {/* Main Heading Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h1 className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-5">
          You're not just a volunteer—you're a Fundraising Catalyst.
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Your mission is simple but huge: use your network to power our cause. We trust you to be our voice, our energy, and our connection to a community of supporters. You're the one bringing the Vibe and building the Momentum to make real impact happen.
        </p>
      </div>
      {/* Responsibilities Section */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
          Know your responsibilities in this internship
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          {/* Responsibility 1 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Hit up your network</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Talk to your friends, family, and college crew. They trust you, so they'll listen.</p>
          </div>
          {/* Responsibility 2 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Own your socials</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Post on Instagram, share on LinkedIn, and hit up WhatsApp. Tell your story and our story—make it real.</p>
          </div>
          {/* Responsibility 3 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Keep it real</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">Be authentic and transparent. People are donating because of you, so let's keep it 100.</p>
          </div>
          {/* Responsibility 4 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 bg-cyan-700 rounded-lg hover:bg-cyan-600 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-yellow-300 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 sm:mb-3 md:mb-4">Stay in the loop</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">We're here to back you up. Keep us posted on your wins so we can celebrate them and help you crush your goals.</p>
          </div>
        </div>
      </div>
      {/* Impact Section */}
      <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-lg bg-cyan-800 hover:bg-cyan-700 transition-all duration-300 hover:scale-[1.01] shadow-lg">
        <h2 className="text-yellow-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5">
          Your Impact Matters
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Every connection you make and every conversation you start creates ripples of change. You're not just raising funds—you're building a movement.
        </p>
      </div>
    </div>
  )
}
export default UnderstandRole