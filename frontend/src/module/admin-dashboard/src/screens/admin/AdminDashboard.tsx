import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiUsers,
  FiTruck,
  FiStore,
  FiTrendingUp,
  FiFilter,
  FiDownload,
} from 'react-icons/fi';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

interface AdminStats {
  totalRevenue: number;
  totalUsers: number;
  totalRentals: number;
  totalFranchises: number;
  activeRentals: number;
  pendingPayments: number;
}

interface RevenueBreakdown {
  source: string;
  amount: number;
  percentage: number;
}

interface TopFranchise {
  name: string;
  rentals: number;
  revenue: number;
  rating: number;
  status: 'active' | 'inactive';
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rentals' | 'franchises' | 'users'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const stats: AdminStats = {
    totalRevenue: 185450,
    totalUsers: 2340,
    totalRentals: 1256,
    totalFranchises: 18,
    activeRentals: 47,
    pendingPayments: 89500,
  };

  const revenueBreakdown: RevenueBreakdown[] = [
    { source: 'Bike Rentals', amount: 95230, percentage: 51 },
    { source: 'Scooter Rentals', amount: 67890, percentage: 37 },
    { source: 'Premium Services', amount: 22330, percentage: 12 },
  ];

  const topFranchises: TopFranchise[] = [
    {
      name: 'Downtown Station',
      rentals: 245,
      revenue: 52340,
      rating: 4.8,
      status: 'active',
    },
    {
      name: 'Mall Parking',
      rentals: 189,
      revenue: 38900,
      rating: 4.6,
      status: 'active',
    },
    {
      name: 'Airport Station',
      rentals: 156,
      revenue: 45670,
      rating: 4.9,
      status: 'active',
    },
    {
      name: 'City Center',
      rentals: 128,
      revenue: 28450,
      rating: 4.4,
      status: 'inactive',
    },
  ];

  const filteredFranchises = topFranchises.filter((f) => {
    if (filterStatus === 'all') return true;
    return f.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-blue-100">Complete platform management and analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {(['overview', 'rentals', 'franchises', 'users'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                {
                  label: 'Total Revenue',
                  value: `₹${stats.totalRevenue.toLocaleString()}`,
                  icon: FiDollarSign,
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  label: 'Total Users',
                  value: stats.totalUsers.toLocaleString(),
                  icon: FiUsers,
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  label: 'Total Rentals',
                  value: stats.totalRentals.toLocaleString(),
                  icon: FiTrendingUp,
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  label: 'Total Franchises',
                  value: stats.totalFranchises.toLocaleString(),
                  icon: FiStore,
                  color: 'from-orange-500 to-red-500',
                },
                {
                  label: 'Active Rentals',
                  value: stats.activeRentals.toLocaleString(),
                  icon: FiTruck,
                  color: 'from-yellow-500 to-amber-500',
                },
                {
                  label: 'Pending Payments',
                  value: `₹${stats.pendingPayments.toLocaleString()}`,
                  icon: FiDollarSign,
                  color: 'from-red-500 to-pink-500',
                },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 shadow-lg hover:shadow-xl transition-all`}
                    whileHover={{ y: -5 }}
                  >
                    <Icon className="text-2xl mb-2 text-white opacity-80" />
                    <p className="text-xs text-white opacity-75 font-semibold">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Revenue Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="bg-slate-700 rounded-2xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FiTrendingUp className="text-green-400" />
                  Revenue Breakdown
                </h2>
                <div className="space-y-4">
                  {revenueBreakdown.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold">{item.source}</p>
                        <div className="text-right">
                          <p className="font-bold text-green-400">₹{item.amount.toLocaleString()}</p>
                          <p className="text-xs text-slate-400">{item.percentage}%</p>
                        </div>
                      </div>
                      <div className="bg-slate-600 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Franchises */}
              <motion.div
                className="bg-slate-700 rounded-2xl p-6 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FiStore className="text-purple-400" />
                  Top Franchises
                </h2>
                <div className="space-y-3">
                  {topFranchises.slice(0, 4).map((franchise, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-bold">{franchise.name}</p>
                        <p className="text-xs text-slate-400">
                          {franchise.rentals} rentals • ₹{franchise.revenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold">★ {franchise.rating}</p>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            franchise.status === 'active'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {franchise.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <motion.div
            className="bg-slate-700 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Rentals</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
                <FiDownload size={18} />
                Export
              </button>
            </div>

            {/* Rental Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Active Rentals', value: stats.activeRentals, color: 'text-orange-400' },
                { label: 'Completed Today', value: 12, color: 'text-green-400' },
                { label: 'Cancelled', value: 3, color: 'text-red-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-600 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-1">{item.label}</p>
                  <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Rentals Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-600 border-b border-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">Rental ID</th>
                    <th className="px-6 py-3 text-left font-bold">Rider</th>
                    <th className="px-6 py-3 text-left font-bold">Franchise</th>
                    <th className="px-6 py-3 text-left font-bold">Vehicle</th>
                    <th className="px-6 py-3 text-left font-bold">Amount</th>
                    <th className="px-6 py-3 text-left font-bold">Payment</th>
                    <th className="px-6 py-3 text-left font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: 'R001',
                      rider: 'Raj Kumar',
                      franchise: 'Downtown',
                      vehicle: 'Honda CB 350',
                      amount: 1500,
                      payment: 'Paid',
                      status: 'Completed',
                    },
                    {
                      id: 'R002',
                      rider: 'Priya Singh',
                      franchise: 'Mall Parking',
                      vehicle: 'Bajaj Scooter',
                      amount: 300,
                      payment: 'Paid',
                      status: 'Active',
                    },
                    {
                      id: 'R003',
                      rider: 'Amit Patel',
                      franchise: 'Airport',
                      vehicle: 'Royal Enfield',
                      amount: 4725,
                      payment: 'Paid',
                      status: 'Completed',
                    },
                    {
                      id: 'R004',
                      rider: 'Neha Sharma',
                      franchise: 'City Center',
                      vehicle: 'Bajaj Scooter',
                      amount: 7500,
                      payment: 'Pending',
                      status: 'Active',
                    },
                  ].map((rental, idx) => (
                    <tr key={idx} className="border-b border-slate-600 hover:bg-slate-600 transition-colors">
                      <td className="px-6 py-4 font-semibold">{rental.id}</td>
                      <td className="px-6 py-4">{rental.rider}</td>
                      <td className="px-6 py-4">{rental.franchise}</td>
                      <td className="px-6 py-4">{rental.vehicle}</td>
                      <td className="px-6 py-4 font-bold text-blue-400">₹{rental.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            rental.payment === 'Paid'
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {rental.payment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            rental.status === 'Active'
                              ? 'bg-orange-500 text-white'
                              : 'bg-slate-500 text-white'
                          }`}
                        >
                          {rental.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Franchises Tab */}
        {activeTab === 'franchises' && (
          <motion.div
            className="bg-slate-700 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold">Franchise Management</h2>
              <div className="flex gap-2">
                {(['all', 'active', 'inactive'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                    }`}
                  >
                    {status.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Franchises Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredFranchises.map((franchise, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-600 rounded-xl p-6 hover:bg-slate-500 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{franchise.name}</h3>
                      <p className="text-slate-400">{franchise.rentals} Total Rentals</p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full font-bold ${
                        franchise.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {franchise.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4 pb-4 border-b border-slate-400">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Revenue</span>
                      <span className="font-bold text-green-400">₹{franchise.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Rating</span>
                      <span className="font-bold text-yellow-400">★ {franchise.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
                      Details
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-all">
                      Suspend
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            className="bg-slate-700 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">User Management</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
                <FiDownload size={18} />
                Export
              </button>
            </div>

            {/* User Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Users', value: stats.totalUsers, color: 'text-blue-400' },
                { label: 'Active Today', value: 456, color: 'text-green-400' },
                { label: 'New This Week', value: 89, color: 'text-purple-400' },
                { label: 'Suspended', value: 12, color: 'text-red-400' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-600 p-4 rounded-lg">
                  <p className="text-slate-300 text-sm mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-600 border-b border-slate-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">User ID</th>
                    <th className="px-6 py-3 text-left font-bold">Name</th>
                    <th className="px-6 py-3 text-left font-bold">Phone</th>
                    <th className="px-6 py-3 text-left font-bold">Total Rentals</th>
                    <th className="px-6 py-3 text-left font-bold">Spent</th>
                    <th className="px-6 py-3 text-left font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'U001', name: 'Raj Kumar', phone: '+91 98765 43210', rentals: 15, spent: 8900, status: 'Active' },
                    { id: 'U002', name: 'Priya Singh', phone: '+91 87654 32109', rentals: 8, spent: 3200, status: 'Active' },
                    { id: 'U003', name: 'Amit Patel', phone: '+91 76543 21098', rentals: 23, spent: 15600, status: 'Active' },
                    { id: 'U004', name: 'Neha Sharma', phone: '+91 65432 10987', rentals: 6, spent: 2100, status: 'Suspended' },
                  ].map((user, idx) => (
                    <tr key={idx} className="border-b border-slate-600 hover:bg-slate-600 transition-colors">
                      <td className="px-6 py-4 font-semibold">{user.id}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4 text-slate-300">{user.phone}</td>
                      <td className="px-6 py-4">{user.rentals}</td>
                      <td className="px-6 py-4 font-bold text-blue-400">₹{user.spent.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            user.status === 'Active'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
