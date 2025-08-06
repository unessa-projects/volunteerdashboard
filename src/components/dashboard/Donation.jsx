import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImpactCalculator from './ImpactCalculator';
import { motion } from 'framer-motion';

function Donation() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPayments = async () => {
    try {
      const username = localStorage.getItem("username"); // Get username directly from localStorage
      
      if (!username) {
        console.log("No username found in localStorage");
        setLoading(false);
        return;
      }

      const res = await axios.get(`https://unessa-backend.onrender.com/api/donations`, {
        params: { username }
      });

      setPayments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setLoading(false);
    }
  };

  fetchPayments();
}, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 md:p-6 bg-[#043238] min-h-screen"
    >
      <ImpactCalculator />
      
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-white mb-6"
        variants={itemVariants}
      >
        Donation Records
      </motion.h2>

      {loading ? (
        <motion.div 
          className="flex justify-center items-center h-40"
          variants={itemVariants}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ECA90E]"></div>
        </motion.div>
      ) : payments.length === 0 ? (
        <motion.p 
          className="text-white text-center py-10"
          variants={itemVariants}
        >
          No donations found.
        </motion.p>
      ) : (
        <>
          {/* Desktop Table */}
          <motion.div 
            className="hidden md:block overflow-x-auto"
            variants={itemVariants}
          >
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#ECA90E] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody className="bg-[#06444f] divide-y divide-[#043238]">
                {payments.map((payment) => (
                  <motion.tr 
                    key={payment._id}
                    className="hover:bg-[#043238]/50 transition-colors"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-white">{payment.formattedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">₹{payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{payment.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{payment.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">{payment.phone}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile Cards */}
          <motion.div 
            className="md:hidden space-y-4"
            variants={containerVariants}
          >
            {payments.map((payment) => (
              <motion.div
                key={payment._id}
                className="bg-[#06444f] rounded-lg p-4 shadow-md border border-[#ECA90E]/20"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#ECA90E]">Date</p>
                    <p className="text-white">{payment.formattedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#ECA90E]">Amount</p>
                    <p className="text-white font-medium">₹{payment.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#ECA90E]">Name</p>
                    <p className="text-white">{payment.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#ECA90E]">Email</p>
                    <p className="text-white truncate">{payment.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-[#ECA90E]">Phone</p>
                    <p className="text-white">{payment.phone}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Donation;