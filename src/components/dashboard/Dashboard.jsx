
// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImpactCalculator from "./ImpactCalculator";

const Dashboard = () => {
  const navigate = useNavigate();
  const [daysLeft, setDaysLeft] = useState(30);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    const savedStartDate = localStorage.getItem("startDate");
    let startDate = savedStartDate ? new Date(savedStartDate) : new Date();
    if (!savedStartDate) localStorage.setItem("startDate", startDate.toISOString());

    const today = new Date();
    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    setDaysLeft(Math.max(1, 30 - diffInDays));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card data for better maintainability
  const journeyCards = [
    {
      title: "Why this Internship",
      description: "How this experience will shape your future",
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M20 44V36H28V44H36V28H44V44" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="20" r="4" fill="currentColor" />
        </svg>
      ),
      link: "/internship",
      color: "from-[#096d7d33] to-[#00557766]"
    },
    {
      title: "Understand Your Role",
      description: "Know your responsibilities in this internship",
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-8 md:h-8">
          <circle cx="20" cy="22" r="6" fill="currentColor" />
          <rect x="14" y="32" width="12" height="12" rx="3" fill="currentColor" />
          <path d="M32 24H48M32 32H48M32 40H48" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      link: "/role",
      color: "from-[#096d7d33] to-[#00557766]"
    },
    {
      title: "Project Sneh",
      description: "Explore our flagship initiative",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 .6.4 1 1 1s1-.4 1-1V4h11v16H8.8l.2 1.2c.2 1.1 1.2 1.8 2.3 1.8h7.7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      ),
      link: "/keytaab",
      color: "from-[#096d7d33] to-[#00557766]"
    },
    {
      title: "Rewards",
      description: "Perks and bonuses await you!",
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M32 4L12 12V28C12 44 32 60 32 60C32 60 52 44 52 28V12L32 4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M24 32L30 38L42 26" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      link: "/rewards",
      color: "from-[#096d7d33] to-[#00557766]"
    }
  ];

  const credentialCards = [
    {
      title: "Certificate of Incorporation",
      description: "Proof of credibility and transparency",
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M32 4L12 12V28C12 44 32 60 32 60C32 60 52 44 52 28V12L32 4Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      link: "/certificate.pdf",
      color: "from-[#096d7d33] to-[#00557766]"
    },
    {
      title: "80G Certificate",
      description: "Review of financial transparency",
      icon: (
        <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-8 md:h-8">
          <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20H44M20 28H44M20 36H36" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      link: "/80G certificate.pdf",
      color: "from-[#096d7d33] to-[#00557766]"
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001F3F] to-[#003366] p-4 md:p-8">
      {/* Progress Tracker */}
      <div data-tour-id="tour-progress" className="mb-8 bg-[#ffffff10] backdrop-blur-sm rounded-xl p-4 border border-[#ffffff10]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white font-medium">Internship Progress</h3>
          <span className="text-[#ECA90E] font-bold">{daysLeft} days remaining</span>
        </div>
        <div className="w-full bg-[#ffffff20] rounded-full h-2.5">
          <div 
            className="bg-[#ECA90E] h-2.5 rounded-full" 
            style={{ width: `${((30 - daysLeft) / 30) * 100}%` }}
          ></div>
        </div>
      </div>
<div data-tour-id="tour-impact">
      <ImpactCalculator />
      </div>

      {/* Internship Journey Section */}
      <section className="my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8">
          Your Internship Journey
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {journeyCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-xl p-4 md:p-6 border border-[#ffffff10] 
                         transition-all hover:scale-[1.02] hover:shadow-lg hover:border-[#ECA90E66] group`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-[#ffffff15] rounded-lg group-hover:bg-[#ECA90E] transition-colors text-white">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-[#ffffffaa] text-sm md:text-base mt-1">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Credentials Section */}
      <section className="my-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8">
          Our Credentials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {credentialCards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-br ${card.color} backdrop-blur-sm rounded-xl p-4 md:p-6 border border-[#ffffff10] 
                         transition-all hover:scale-[1.02] hover:shadow-lg hover:border-[#ECA90E66] group`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2 md:p-3 bg-[#ffffff15] rounded-lg group-hover:bg-[#ECA90E] transition-colors text-white">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-[#ffffffaa] text-sm md:text-base mt-1">{card.description}</p>
                  <span className="text-xs text-[#ECA90E] mt-2 inline-block">Click to view PDF</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
<section className="my-8 flex justify-center items-center space-x-6">
  {/* WhatsApp Icon */}
  <a
    href="https://wa.me/916363198779"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="text-[#25D366] hover:text-[#128C7E] transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-10 sm:h-10"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </a>

  {/* Instagram Icon */}
  <a
    href="https://www.instagram.com/unessafoundation/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="text-pink-500 hover:text-pink-600 transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-10 sm:h-10"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
      <path
        fill="url(#instaGradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  </a>

  {/* LinkedIn Icon */}
  <a
    href="https://www.linkedin.com/company/unessafoundation/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="text-[#0077B5] hover:text-[#005582] transition-colors"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-10 sm:h-10"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.002-4.125 2.062 2.062 0 01-.002 4.125zm1.779 13.019H3.559V9h3.557v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.726v20.549C0 23.227.792 24 1.771 24h20.451c.98 0 1.778-.773 1.778-1.725V1.726C24 .774 23.204 0 22.225 0z" />
    </svg>
  </a>
</section>


    </div>
  );
};

export default Dashboard;
