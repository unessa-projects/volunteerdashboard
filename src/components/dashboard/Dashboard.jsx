// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImpactCalculator from "./ImpactCalculator";

const Dashboard = () => {
  const navigate = useNavigate();
  const [, setDaysLeft] = useState(30);

  useEffect(() => {
    const savedStartDate = localStorage.getItem("startDate");
    let startDate = savedStartDate ? new Date(savedStartDate) : new Date();
    if (!savedStartDate) localStorage.setItem("startDate", startDate.toISOString());

    const today = new Date();
    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setDaysLeft(Math.max(1, 30 - diffInDays));
  }, []);

  return (
    <>
      <ImpactCalculator />

      <section data-tour-id="tour-internship-journey" className="py-10 ">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Your Internship Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
    {/* Why this Internship */}
  <div
  onClick={() => navigate("/internship")}
  className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2" 
>
  <div className="w-16 h-16  bg-[#E0F7FA] rounded-md  border-[#ECA90E] flex items-center justify-center mr-4">
    <svg viewBox="0 0 64 64" fill="#EF6C00" className="w-10 h-10">
      <rect x="2" y="2" width="60" height="60" rx="8" fill="#E0F7FA" />
      <path
        d="M20 44V36H28V44H36V28H44V44"
        stroke="#005577"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="20" r="4" fill="#005577" />
    </svg>
  </div>
  <div>
    <h3 className="text-lg font-semibold text-white">Why this Internship</h3>
    <p className="text-base text-white">
      How this experience will shape your future.
    </p>
  </div>
</div>

    {/* Understand Your Role */}
    <Link data-tour-id="Understand-Your-Role"
      to="/role"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <div className="w-16 h-16 text-white bg-[#FFF4E6] rounded-md flex items-center justify-center mr-4">
        <svg viewBox="0 0 64 64" fill="#EF6C00" className="w-10 h-10">
          <rect x="2" y="2" width="60" height="60" rx="8" fill="#FFF4E6" />
          <circle cx="20" cy="22" r="6" fill="#CC6600" />
          <rect x="14" y="32" width="12" height="12" rx="3" fill="#CC6600" />
          <path d="M32 24H48M32 32H48M32 40H48" stroke="#CC6600" strokeWidth="2" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Understand Your Role</h3>
        <p className="text-base text-white">Know your responsibilities in this internship.</p>
      </div>
    </Link>

    {/* Start Orientation */}
    <Link
      to="/orientation"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <div className="w-16 h-16 text-[#2E7D32] bg-[#E8F5E9] rounded-md flex items-center justify-center mr-4">
        <svg viewBox="0 0 64 64" fill="#EF6C00" className="w-10 h-10">
          <path d="M34 2C34 2 18 10 18 26C18 30 21 34 21 34L8 48L16 56L30 43C30 43 34 46 38 46C54 46 62 30 62 30C62 30 62 2 34 2Z" fill="#2E7D32" />
          <circle cx="42" cy="22" r="4" fill="white" />
          <path d="M12 52L18 58" stroke="#888" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Start Orientation</h3>
        <p className="text-base text-white">Begin your journey the right way.</p>
      </div>
    </Link>

    {/* Rewards */}
    <Link 
      to="/rewards"
     className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <div className="w-16 h-16 text-[#880E4F] bg-[#FCE4EC] rounded-md flex items-center justify-center mr-4">
        <svg viewBox="0 0 64 64" fill="#EF6C00" className="w-10 h-10">
          <rect x="10" y="22" width="44" height="32" rx="2" fill="#880E4F" />
          <path d="M10 26H54" stroke="white" strokeWidth="2" />
          <path d="M32 22V54" stroke="white" strokeWidth="2" />
          <path d="M24 14C24 10 30 10 30 14C30 18 24 18 24 14ZM40 14C40 10 34 10 34 14C34 18 40 18 40 14Z" fill="#880E4F" />
          <path d="M30 14H34" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Rewards</h3>
        <p className="text-base text-white">Perks and bonuses await you!</p>
      </div>
    </Link>
  </div>
      </section>

      <section data-tour-id="tour-our-credentials" className="p-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our Credentials</h2>
        <div className="p-4">
  

  <div  className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#FFB823]">
    {/* Trust Certificate */}
    <a
  href="/certificate.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="cursor-pointer min-h-[200px] p-3 m-3 text-white bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
>
  <div className="w-16 h-16 bg-[#E0F7FA] text-[#FFB823] rounded-md flex items-center justify-center mr-4">
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <path d="M32 4L12 12V28C12 44 32 60 32 60C32 60 52 44 52 28V12L32 4Z" stroke="#00796B" strokeWidth="2" fill="#EF6C00" />
      <path d="M24 32L30 38L42 26" stroke="#00796B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
  <div>
    <h3 className="text-lg font-semibold">Certificate of Incorporation</h3>
    <p className="text-base text-white">Proof of credibility and transparency.</p>
  </div>
</a>


    {/* Audit Report */}
    <a data-tour-id="G80-certificate"
  href="/80G certificate.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="cursor-pointer min-h-[200px] p-3 m-3 text-white bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
>
  <div className="w-16 h-16 bg-[#FFF3E0] text-[#EF6C00] rounded-md flex items-center justify-center mr-4">
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <rect x="12" y="8" width="40" height="48" rx="4" stroke="#EF6C00" strokeWidth="2" fill="#EF6C00" />
      <path d="M20 20H44M20 28H44M20 36H36" stroke="#EF6C00" strokeWidth="2" />
      <path d="M24 44L28 48L40 36" stroke="#EF6C00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
  <div>
    <h3 className="text-lg font-semibold">80G Certificate</h3>
    <p className="text-base text-white">Review of financial transparency.</p>
  </div>
</a>

  </div>
</div>
      </section>

      <section className="my-0 px-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Learn about Uneesa</h2>
        <div className="my-8 px-4">
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Project Keytaab */}
    <Link
      to="/keytaab"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#EF6C00" viewBox="0 0 24 24" className="w-12 h-12 mb-3">
        <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 .6.4 1 1 1s1-.4 1-1V4h11v16H8.8l.2 1.2c.2 1.1 1.2 1.8 2.3 1.8h7.7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <span className="font-semibold text-base">Project Sneh</span>
    </Link>

    {/* Academic Learning */}
    <Link data-tour-id="tour-learn-uneesa"
      to="/learning"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#EF6C00" viewBox="0 0 24 24" className="w-12 h-12 mb-3">
        <path d="M12 2L1 7l11 5 9-4.1v9.2c0 1.1-.9 2-2 2h-2v-3H8v3H6c-1.1 0-2-.9-2-2v-4l8 3.6 11-5L12 2z"/>
      </svg>
      <span className="font-semibold text-base">Academic Learning</span>
    </Link>

    {/* Social Emotional Learning */}
    <Link
      to="/emotional"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#EF6C00" viewBox="0 0 24 24" className="w-12 h-12 mb-3">
        <path d="M12 12c2.7 0 5.4 1.3 6 4H6c.6-2.7 3.3-4 6-4zm0-2c-1.1 0-2-.9-2-2s.9-2 2-2 
          2 .9 2 2-.9 2-2 2zm-6 2c0-3.3 2.7-6 6-6s6 2.7 6 6v6H6v-6z"/>
      </svg>
      <span className="font-semibold text-base">Social Emotional Learning</span>
    </Link>

    {/* Mental Well Being */}
    <Link
      to="/mental"
      className="cursor-pointer min-h-[200px] p-3 m-3  text-white bg-[#096d7d33]  rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#EF6C00" viewBox="0 0 24 24" className="w-12 h-12 mb-3">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
          2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 
          5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 
          8.5c0 3.78-3.4 6.86-8.55 
          11.54L12 21.35z"/>
      </svg>
      <span className="font-semibold text-base">Mental Well Being</span>
    </Link>
  </div>
</div>
      </section>
    </>
  );
};

export default Dashboard;
