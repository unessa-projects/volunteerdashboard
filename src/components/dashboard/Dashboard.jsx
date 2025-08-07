// Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImpactCalculator from "./ImpactCalculator";
import WhatsAppLink from "./StartOrientation";

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

    <a
  href="https://wa.me/916363198779"
  target="_blank"
  rel="noopener noreferrer"
  className="cursor-pointer min-h-[200px] p-3 m-3 text-white bg-[#25D366] rounded-2xl shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-2 hover:border-white w-[180px]"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span className="font-semibold text-base mt-2">WhatsApp Us</span>
  <span className="text-xs text-white/80 mt-1">+91 63631 98779</span>
</a>

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
    <a
  href="https://www.instagram.com/unessafoundation/"
  target="_blank"
  rel="noopener noreferrer"
  data-tour-id="tour-instagram-uneesa"
  className="cursor-pointer min-h-[200px] p-3 m-3 text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-2 hover:border-white w-[180px]"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
  <span className="font-semibold text-base mt-2">Instagram</span>
  <span className="text-xs text-white/80 mt-1">@unessafoundation</span>
</a>
    {/* Social Emotional Learning */}
   <a
  href="https://www.linkedin.com/company/unessafoundation/"
  target="_blank"
  rel="noopener noreferrer"
  className="cursor-pointer min-h-[200px] p-3 m-3 text-white bg-[#0077B5] rounded-2xl shadow-md flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-2 hover:border-white w-[180px]"
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
  <span className="font-semibold text-base mt-2">LinkedIn</span>
  <span className="text-xs text-white/80 mt-1">Follow Us</span>
</a>

    {/* Mental Well Being */}
   
  </div>
</div>
      </section>
    </>
  );
};

export default Dashboard;