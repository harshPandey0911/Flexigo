// src/screens/WalletScreen.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  icon: string;
}

export const WalletScreen: React.FC = () => {
  const [balance, setBalance] = useState(450);
  const [showBalance, setShowBalance] = useState(true);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'debit', amount: 32, description: 'Ride - Pro Scooter', date: '2 hours ago', icon: '🛴' },
    { id: '2', type: 'credit', amount: 100, description: 'Wallet Top-up (UPI)', date: '5 hours ago', icon: '💳' },
    { id: '3', type: 'debit', amount: 45, description: 'Ride - E-Bike', date: '1 day ago', icon: '🚲' },
    { id: '4', type: 'credit', amount: 200, description: 'Wallet Top-up (Card)', date: '2 days ago', icon: '💳' },
    { id: '5', type: 'debit', amount: 18, description: 'Ride - Mini Scooter', date: '3 days ago', icon: '🛴' },
  ]);

  const [chartData] = useState([
    { date: 'Mon', balance: 250 },
    { date: 'Tue', balance: 320 },
    { date: 'Wed', balance: 280 },
    { date: 'Thu', balance: 400 },
    { date: 'Fri', balance: 450 },
    { date: 'Sat', balance: 420 },
    { date: 'Sun', balance: 450 },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const balanceVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      {/* Balance Card */}
      <motion.div
        className="bg-gradient-to-br from-lime-400 to-blue-500 text-black p-8 m-4 rounded-3xl shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute -inset-32 bg-gradient-to-r from-blue-400 to-pink-400 opacity-0 blur-3xl"
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Balance</p>
              <motion.div
                variants={balanceVariants}
                initial="hidden"
                animate="visible"
                className="flex items-baseline gap-2"
              >
                <span className="text-5xl font-bold">
                  {showBalance ? `₹${balance}` : '••••'}
                </span>
              </motion.div>
            </div>
            <motion.button
              onClick={() => setShowBalance(!showBalance)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-md transition-colors"
            >
              {showBalance ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </motion.button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Spent This Month', value: '₹1,240', icon: '📊' },
              { label: 'Lifetime Rides', value: '24', icon: '🚗' },
              { label: 'Points', value: '420', icon: '⭐' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 border border-gray-700 backdrop-blur-md rounded-lg p-3 text-center hover:border-lime-400 transition-colors"
                variants={itemVariants}
              >
                <p className="text-2xl opacity-90 mb-1">{stat.icon}</p>
                <p className="text-xs opacity-75">{stat.label}</p>
                <p className="text-sm font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="px-4 mb-6 flex gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => setShowAddMoneyModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-center gap-2 font-semibold text-lime-400 hover:border-lime-400 transition-colors"
          variants={itemVariants}
        >
          <FiPlus /> Add Money
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-center gap-2 font-semibold text-lime-400 hover:border-lime-400 transition-colors"
          variants={itemVariants}
        >
          💸 Send Money
        </motion.button>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="bg-gray-900 border border-gray-800 rounded-3xl shadow-sm p-6 mx-4 mb-6"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-lg font-bold text-white mb-4">Balance Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Transactions */}
      <motion.div
        className="px-4 mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>

        <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:border-lime-400 transition-colors"
              style={{
                borderColor: tx.type === 'credit' ? '#10b981' : '#ef4444',
              }}
              variants={itemVariants}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="text-3xl">{tx.icon}</div>
                <div>
                  <p className="font-semibold text-white">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>

              <motion.div
                className={`flex items-center gap-1 font-bold text-lg ${
                  tx.type === 'credit' ? 'text-green-600' : 'text-gray-800'
                }`}
                animate={tx.type === 'credit' ? { y: [0, -5, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {tx.type === 'credit' ? <FiArrowDown /> : <FiArrowUp />}
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAddMoneyModal(false)}
        >
          <motion.div
            className="bg-gray-900 border border-gray-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Money</h2>
            <p className="text-gray-600 mb-6">Select amount or enter custom</p>

            {/* Quick Amounts */}
            <motion.div
              className="grid grid-cols-2 gap-3 mb-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {quickAmounts.map((amount, i) => (
                <motion.button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-r from-lime-400 to-blue-500 text-black scale-105'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-lime-400'
                  }`}
                  variants={itemVariants}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ₹{amount}
                </motion.button>
              ))}
            </motion.div>

            {/* Custom Amount */}
            <motion.input
              type="number"
              placeholder="Enter custom amount"
              className="w-full border-2 border-gray-700 bg-gray-800 text-white rounded-xl p-4 mb-6 focus:border-lime-400 outline-none placeholder-gray-500"
              variants={itemVariants}
            />

            {/* Payment Methods */}
            <motion.div
              className="space-y-2 mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {['💳 Debit Card', '📱 UPI', '🏦 Bank Transfer'].map((method) => (
                <motion.button
                  key={method}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-lime-400 transition-colors text-left font-semibold text-white"
                  variants={itemVariants}
                >
                  {method}
                </motion.button>
              ))}
            </motion.div>

            {/* Proceed Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl"
              onClick={() => {
                setShowAddMoneyModal(false);
                setBalance((prev) => prev + (selectedAmount || 0));
              }}
              disabled={!selectedAmount}
            >
              Proceed to Payment
            </motion.button>

            <motion.button
              onClick={() => setShowAddMoneyModal(false)}
              className="w-full text-gray-600 font-semibold py-2 mt-2"
            >
              Cancel
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletScreen;
