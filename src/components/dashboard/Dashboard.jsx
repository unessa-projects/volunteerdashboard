import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImpactCalculator from "./ImpactCalculator";
import axios from "axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [, setDaysLeft] = useState(30);
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch donation data
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const res = await axios.get("https://unessa-backend.onrender.com/api/donations", {
          params: { username },
        });

        const donationsData = res.data;
        setDonations(donationsData);
        const totalAmount = donationsData.reduce((sum, d) => sum + d.amount, 0);
        setTotal(totalAmount);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Days left logic
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

      {/* 🎯 Donation Summary Card */}
      <section className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#ECA90E] text-white rounded-lg shadow-md p-6 text-center"
        >
          <h3 className="text-xl font-semibold">Total Donations</h3>
          {loading ? (
            <p className="mt-2 text-lg">Loading...</p>
          ) : (
            <p className="text-3xl font-bold mt-1">₹{total}</p>
          )}
        </motion.div>
      </section>

      {/* 🌱 Internship Journey */}
      <section className="py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Your Internship Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
          {/* Why this Internship */}
          <div
            onClick={() => navigate("/internship")}
            className="cursor-pointer min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
          >
            <div className="w-16 h-16 bg-[#E0F7FA] rounded-md flex items-center justify-center mr-4">
              <svg viewBox="0 0 64 64" fill="#EF6C00" className="w-10 h-10">
                <rect x="2" y="2" width="60" height="60" rx="8" fill="#E0F7FA" />
                <path d="M20 44V36H28V44H36V28H44V44" stroke="#005577" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="32" cy="20" r="4" fill="#005577" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Why this Internship</h3>
              <p className="text-base text-white">How this experience will shape your future.</p>
            </div>
          </div>

          {/* Understand Your Role */}
          <Link
            to="/role"
            className="cursor-pointer min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
          >
            <div className="w-16 h-16 bg-[#FFF4E6] rounded-md flex items-center justify-center mr-4">
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
            className="cursor-pointer min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
          >
            <div className="w-16 h-16 bg-[#E8F5E9] rounded-md flex items-center justify-center mr-4">
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
            className="cursor-pointer min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2"
          >
            <div className="w-16 h-16 bg-[#FCE4EC] text-[#880E4F] rounded-md flex items-center justify-center mr-4">
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

      {/* 📄 Credentials */}
      <section className="p-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our Credentials</h2>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-[#FFB823]">
          <a href="/certificate.pdf" target="_blank" rel="noopener noreferrer" className="min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
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

          <a href="/80G certificate.pdf" target="_blank" rel="noopener noreferrer" className="min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
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
      </section>

      {/* 📚 Projects */}
      <section className="my-0 px-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Learn about Uneesa</h2>
        <div className="my-8 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/keytaab" className="cursor-pointer min-h-[200px] p-3 m-3 bg-[#096d7d33] rounded-2xl shadow-md flex items-center hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:z-10 hover:border-[#ECA90E] hover:border-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#EF6C00" viewBox="0 0 24 24" className="w-12 h-12 mb-3">
                <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 .6.4 1 1 1s1-.4 1-1V4h11v16H8.8l.2 1.2c.2 1.1 1.2 1.8 2.3 1.8h7.7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <span className="font-semibold text-base">Project Sneh</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
