import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiUsers, FiTruck, FiDownload, FiFilter } from 'react-icons/fi';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

interface Rental {
  id: string;
  riderName: string;
  riderPhone: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  duration: string;
  rentalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  vehicleReturned: boolean;
}

interface DashboardStats {
  totalEarnings: number;
  totalRentals: number;
  activeRentals: number;
  totalRiders: number;
}

export const FranchisePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rentals' | 'payments'>('dashboard');
  const [filterPayment, setFilterPayment] = useState<'all' | 'paid' | 'pending'>('all');

  const rentalData: Rental[] = [
    {
      id: 'R001',
      riderName: 'Raj Kumar',
      riderPhone: '+91 98765 43210',
      vehicleName: 'Honda CB 350',
      startDate: '2026-03-25',
      endDate: '2026-03-28',
      duration: '3 Days',
      rentalAmount: 1500,
      paymentStatus: 'paid',
      vehicleReturned: true,
    },
    {
      id: 'R002',
      riderName: 'Priya Singh',
      riderPhone: '+91 87654 32109',
      vehicleName: 'Bajaj Scooter',
      startDate: '2026-03-27',
      endDate: '2026-03-28',
      duration: '1 Day',
      rentalAmount: 300,
      paymentStatus: 'paid',
      vehicleReturned: false,
    },
    {
      id: 'R003',
      riderName: 'Amit Patel',
      riderPhone: '+91 76543 21098',
      vehicleName: 'Royal Enfield',
      startDate: '2026-03-20',
      endDate: '2026-03-27',
      duration: '7 Days',
      rentalAmount: 4725,
      paymentStatus: 'paid',
      vehicleReturned: true,
    },
    {
      id: 'R004',
      riderName: 'Neha Sharma',
      riderPhone: '+91 65432 10987',
      vehicleName: 'Bajaj Scooter',
      startDate: '2026-03-28',
      endDate: '2026-04-28',
      duration: '1 Month',
      rentalAmount: 7500,
      paymentStatus: 'pending',
      vehicleReturned: false,
    },
    {
      id: 'R005',
      riderName: 'Vikram Singh',
      riderPhone: '+91 54321 09876',
      vehicleName: 'Hero Access Scooter',
      startDate: '2026-03-25',
      endDate: '2026-04-01',
      duration: '7 Days',
      rentalAmount: 1750,
      paymentStatus: 'pending',
      vehicleReturned: false,
    },
  ];

  const stats: DashboardStats = {
    totalEarnings: rentalData
      .filter((r) => r.paymentStatus === 'paid')
      .reduce((sum, r) => sum + r.rentalAmount, 0),
    totalRentals: rentalData.length,
    activeRentals: rentalData.filter((r) => !r.vehicleReturned).length,
    totalRiders: new Set(rentalData.map((r) => r.riderPhone)).size,
  };

  const filteredRentals = rentalData.filter((rental) => {
    if (filterPayment === 'all') return true;
    return rental.paymentStatus === filterPayment;
  });

  const pendingAmount = rentalData
    .filter((r) => r.paymentStatus === 'pending')
    .reduce((sum, r) => sum + r.rentalAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Franchise Dashboard</h1>
          <p className="opacity-90">Manage your vehicle rentals and earnings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {(['dashboard', 'rentals', 'payments'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Total Earnings</p>
                    <p className="text-4xl font-bold text-green-600">
                      ₹{stats.totalEarnings.toLocaleString()}
                    </p>
                  </div>
                  <FiDollarSign className="text-4xl text-green-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-2">From completed rentals</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Total Rentals</p>
                    <p className="text-4xl font-bold text-blue-600">{stats.totalRentals}</p>
                  </div>
                  <FiTrendingUp className="text-4xl text-blue-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-2">All time rentals</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Active Rentals</p>
                    <p className="text-4xl font-bold text-orange-600">{stats.activeRentals}</p>
                  </div>
                  <FiTruck className="text-4xl text-orange-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Currently on rent</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold mb-1">Total Riders</p>
                    <p className="text-4xl font-bold text-purple-600">{stats.totalRiders}</p>
                  </div>
                  <FiUsers className="text-4xl text-purple-500 opacity-20" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Unique customers</p>
              </motion.div>
            </div>

            {/* Pending Payments Alert */}
            {pendingAmount > 0 && (
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-red-700 font-bold">
                  ⚠️ Pending Payments: ₹{pendingAmount.toLocaleString()}
                </p>
                <p className="text-red-600 text-sm">
                  {rentalData.filter((r) => r.paymentStatus === 'pending').length} rental(s) awaiting payment
                </p>
              </motion.div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Rentals</h2>
              <div className="space-y-3">
                {rentalData.slice(0, 5).map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{rental.riderName}</p>
                      <p className="text-sm text-gray-600">{rental.vehicleName} - {rental.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-800">₹{rental.rentalAmount.toLocaleString()}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          rental.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {rental.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Rentals</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <FiDownload size={18} />
                  Export
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Rental ID</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Rider Name</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Vehicle</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Duration</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Amount</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left font-bold text-gray-700">Returned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentalData.map((rental) => (
                      <tr key={rental.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-800">{rental.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{rental.riderName}</p>
                            <p className="text-sm text-gray-600">{rental.riderPhone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-800">{rental.vehicleName}</td>
                        <td className="px-6 py-4 text-gray-800">{rental.duration}</td>
                        <td className="px-6 py-4 font-bold text-blue-600">₹{rental.rentalAmount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              rental.paymentStatus === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : rental.paymentStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {rental.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {rental.vehicleReturned ? (
                            <RiCheckLine className="text-green-600 text-xl" />
                          ) : (
                            <RiCloseLine className="text-red-600 text-xl" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Payment Status</h2>
                <div className="flex gap-2">
                  {(['all', 'paid', 'pending'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterPayment(status)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        filterPayment === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payments List */}
              <div className="space-y-4">
                {filteredRentals.map((rental) => (
                  <motion.div
                    key={rental.id}
                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="text-sm text-gray-600">Rental ID</p>
                        <p className="font-bold text-gray-800">{rental.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rider</p>
                        <p className="font-semibold text-gray-800">{rental.riderName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="font-bold text-blue-600 text-lg">₹{rental.rentalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            rental.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {rental.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      {rental.paymentStatus === 'pending' && (
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all">
                          Collect
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payment Summary */}
              <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-gray-200">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold mb-2">Collected</p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{rentalData
                      .filter((r) => r.paymentStatus === 'paid')
                      .reduce((sum, r) => sum + r.rentalAmount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold mb-2">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">₹{pendingAmount.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-semibold mb-2">Total Expected</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{rentalData.reduce((sum, r) => sum + r.rentalAmount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
