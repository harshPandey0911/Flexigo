import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiTrendingUp, FiDownload, FiFilter, FiCheckCircle, FiClock, FiAlertCircle, FiMap, FiUsers, FiTruck, FiBarChart } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Payment {
  id: string;
  riderName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  rideId: string;
  rideType: 'ride' | 'rental';
}

interface Vehicle {
  id: string;
  name: string;
  type: 'bike' | 'scooter' | 'car';
  pricePerDay: number;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  available: number;
  total: number;
  bookings: number;
  coords?: { x: number; y: number };
  currentUser?: string | null;
  currentUserPhone?: string;
  pickupLocation?: string;
  dropLocation?: string | null;
  bookingTime?: string;
  estimatedReturn?: string;
  bookingStatus?: 'available' | 'in-use' | 'maintenance';
  currentRating?: number;
  licensePlate?: string;
  fuelStatus?: number;
  km?: number;
}

interface Rider {
  id: string;
  name: string;
  phone: string;
  totalRides: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export const FranchiseDashboard: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const vehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Honda CB 350',
      type: 'bike',
      pricePerDay: 500,
      location: 'Downtown Station',
      rating: 4.8,
      reviews: 234,
      image: 'https://content-cus.rapido.bike/image/bike%20new.webp',
      available: 5,
      total: 10,
      bookings: 156,
      coords: { x: 45, y: 30 },
      currentUser: 'Raj Kumar',
      currentUserPhone: '9876543210',
      pickupLocation: 'Connaught Place, Delhi',
      dropLocation: 'India Gate, Delhi',
      bookingTime: '2026-03-31 10:30 AM',
      estimatedReturn: '2026-03-31 02:30 PM',
      bookingStatus: 'in-use',
      currentRating: 4.9,
      licensePlate: 'DL01AB1234',
      fuelStatus: 85,
      km: 24500,
    },
    {
      id: '2',
      name: 'Bajaj Chetak Scooter',
      type: 'scooter',
      pricePerDay: 300,
      location: 'Mall Parking',
      rating: 4.6,
      reviews: 189,
      image: 'https://content-cus.rapido.bike/image/auto%20new.webp',
      available: 8,
      total: 15,
      bookings: 142,
      coords: { x: 75, y: 55 },
      currentUser: 'Priya Singh',
      currentUserPhone: '9123456789',
      pickupLocation: 'Delhi Mall, Delhi',
      dropLocation: 'Karol Bagh, Delhi',
      bookingTime: '2026-03-31 11:00 AM',
      estimatedReturn: '2026-03-31 03:00 PM',
      bookingStatus: 'in-use',
      currentRating: 4.7,
      licensePlate: 'DL02CD5678',
      fuelStatus: 60,
      km: 18900,
    },
    {
      id: '3',
      name: 'Royal Enfield Bullet',
      type: 'bike',
      pricePerDay: 700,
      location: 'Airport Station',
      rating: 4.9,
      reviews: 456,
      image: 'https://content-cus.rapido.bike/image/bike%20new.webp',
      available: 3,
      total: 8,
      bookings: 89,
      coords: { x: 20, y: 25 },
      currentUser: null,
      pickupLocation: 'IGI Airport, Delhi',
      dropLocation: null,
      bookingStatus: 'available',
      currentRating: 4.9,
      licensePlate: 'DL03EF9012',
      fuelStatus: 100,
      km: 12300,
    },
    {
      id: '4',
      name: 'Hyundai i20',
      type: 'car',
      pricePerDay: 1200,
      location: 'Central Hub',
      rating: 4.7,
      reviews: 312,
      image: 'https://content-cus.rapido.bike/image/cab%20new.webp',
      available: 4,
      total: 6,
      bookings: 98,
      coords: { x: 60, y: 40 },
      currentUser: 'Amit Patel',
      currentUserPhone: '9988776655',
      pickupLocation: 'South Delhi Complex',
      dropLocation: 'Noida City Center',
      bookingTime: '2026-03-31 09:45 AM',
      estimatedReturn: '2026-03-31 04:00 PM',
      bookingStatus: 'in-use',
      currentRating: 4.8,
      licensePlate: 'DL04GH3456',
      fuelStatus: 45,
      km: 45600,
    },
    {
      id: '5',
      name: 'Maruti Swift',
      type: 'car',
      pricePerDay: 1000,
      location: 'Downtown Station',
      rating: 4.6,
      reviews: 267,
      image: 'https://content-cus.rapido.bike/image/cab%20new.webp',
      available: 7,
      total: 12,
      bookings: 156,
      coords: { x: 30, y: 65 },
      currentUser: 'Sarah Khan',
      currentUserPhone: '9876123456',
      pickupLocation: 'Rajouri Garden, Delhi',
      dropLocation: 'Gurugram Sector 15',
      bookingTime: '2026-03-31 08:30 AM',
      estimatedReturn: '2026-03-31 05:30 PM',
      bookingStatus: 'in-use',
      currentRating: 4.7,
      licensePlate: 'DL05IJ7890',
      fuelStatus: 72,
      km: 38200,
    },
    {
      id: '6',
      name: 'Toyota Fortuner',
      type: 'car',
      pricePerDay: 2000,
      location: 'Airport Station',
      rating: 4.9,
      reviews: 189,
      image: 'https://content-cus.rapido.bike/image/cab%20premium%20new.webp',
      available: 2,
      total: 4,
      bookings: 67,
      coords: { x: 80, y: 20 },
      currentUser: null,
      pickupLocation: 'IGI Airport Terminal 3',
      dropLocation: null,
      bookingStatus: 'available',
      currentRating: 4.9,
      licensePlate: 'DL06KL2345',
      fuelStatus: 95,
      km: 28900,
    },
    {
      id: '7',
      name: 'Hero Splendor',
      type: 'bike',
      pricePerDay: 400,
      location: 'City Center',
      rating: 4.5,
      reviews: 145,
      image: 'https://content-cus.rapido.bike/image/bike%20new.webp',
      available: 9,
      total: 20,
      bookings: 198,
      coords: { x: 50, y: 70 },
      currentUser: 'Vikram Desai',
      currentUserPhone: '8765432109',
      pickupLocation: 'Lajpat Nagar, Delhi',
      dropLocation: 'Defence Colony, Delhi',
      bookingTime: '2026-03-31 12:00 PM',
      estimatedReturn: '2026-03-31 02:00 PM',
      bookingStatus: 'in-use',
      currentRating: 4.6,
      licensePlate: 'DL07MN5678',
      fuelStatus: 55,
      km: 31400,
    },
    {
      id: '8',
      name: 'Honda Activa',
      type: 'scooter',
      pricePerDay: 250,
      location: 'Mall Parking',
      rating: 4.4,
      reviews: 98,
      image: 'https://content-cus.rapido.bike/image/auto%20new.webp',
      available: 10,
      total: 15,
      bookings: 112,
      coords: { x: 65, y: 35 },
      currentUser: 'Neha Gupta',
      currentUserPhone: '9999887766',
      pickupLocation: 'Select City Walk Mall',
      dropLocation: 'CP House, Delhi',
      bookingTime: '2026-03-31 11:30 AM',
      estimatedReturn: '2026-03-31 01:00 PM',
      bookingStatus: 'in-use',
      currentRating: 4.5,
      licensePlate: 'DL08OP9012',
      fuelStatus: 80,
      km: 15600,
    },
  ];

  const riders: Rider[] = [
    { id: 'R-101', name: 'Alia Bhatt', phone: '9876543210', totalRides: 42, status: 'active', joinedDate: '2025-11-12' },
    { id: 'R-102', name: 'Ranveer Singh', phone: '8765432109', totalRides: 15, status: 'active', joinedDate: '2026-01-05' },
    { id: 'R-103', name: 'Deepika Padukone', phone: '7654321098', totalRides: 128, status: 'active', joinedDate: '2024-05-20' },
    { id: 'R-104', name: 'Shahrukh Khan', phone: '6543210987', totalRides: 5, status: 'inactive', joinedDate: '2026-02-18' },
  ];

  const payments: Payment[] = [
    {
      id: 'PAY001',
      riderName: 'Raj Kumar',
      amount: 250,
      date: '2026-03-30 09:30',
      status: 'completed',
      method: 'UPI',
      rideId: 'RIDE123',
      rideType: 'ride',
    },
    {
      id: 'PAY002',
      riderName: 'Priya Singh',
      amount: 1500,
      date: '2026-03-30 10:15',
      status: 'completed',
      method: 'Credit Card',
      rideId: 'RENTAL456',
      rideType: 'rental',
    },
    {
      id: 'PAY003',
      riderName: 'Amit Patel',
      amount: 300,
      date: '2026-03-30 08:45',
      status: 'pending',
      method: 'Wallet',
      rideId: 'RIDE789',
      rideType: 'ride',
    },
    {
      id: 'PAY004',
      riderName: 'Sarah Khan',
      amount: 800,
      date: '2026-03-29 15:20',
      status: 'completed',
      method: 'Debit Card',
      rideId: 'RENTAL101',
      rideType: 'rental',
    },
    {
      id: 'PAY005',
      riderName: 'Vikram Desai',
      amount: 450,
      date: '2026-03-29 14:00',
      status: 'failed',
      method: 'UPI',
      rideId: 'RIDE202',
      rideType: 'ride',
    },
    {
      id: 'PAY006',
      riderName: 'Neha Gupta',
      amount: 2000,
      date: '2026-03-29 11:30',
      status: 'completed',
      method: 'Credit Card',
      rideId: 'RENTAL303',
      rideType: 'rental',
    },
    {
      id: 'PAY007',
      riderName: 'Rohan Sharma',
      amount: 350,
      date: '2026-03-29 10:00',
      status: 'completed',
      method: 'Wallet',
      rideId: 'RIDE404',
      rideType: 'ride',
    },
    {
      id: 'PAY008',
      riderName: 'Anjali Verma',
      amount: 600,
      date: '2026-03-28 16:45',
      status: 'pending',
      method: 'Bank Transfer',
      rideId: 'RENTAL505',
      rideType: 'rental',
    },
  ];

  const filteredPayments = payments.filter(
    (p) => filterStatus === 'all' || p.status === filterStatus
  );

  const stats = {
    totalRevenue: payments
      .filter((p) => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    completedPayments: payments.filter((p) => p.status === 'completed').length,
    pendingPayments: payments.filter((p) => p.status === 'pending').length,
    failedPayments: payments.filter((p) => p.status === 'failed').length,
    totalVehicles: vehicles.length,
    totalRiders: riders.length,
    totalBookings: vehicles.reduce((sum, v) => sum + v.bookings, 0),
    avgRating: (vehicles.reduce((sum, v) => sum + v.rating, 0) / vehicles.length).toFixed(1),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="text-green-500" />;
      case 'pending':
        return <FiClock className="text-yellow-500" />;
      case 'failed':
        return <FiAlertCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const growthData = [
    { date: 'Mar 24', revenue: 1200 },
    { date: 'Mar 25', revenue: 1900 },
    { date: 'Mar 26', revenue: 1500 },
    { date: 'Mar 27', revenue: 2200 },
    { date: 'Mar 28', revenue: 2800 },
    { date: 'Mar 29', revenue: 3500 },
    { date: 'Mar 30', revenue: 4900 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 text-gray-900 pb-20">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 relative z-10 shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.h1
            className="text-5xl font-black mb-2 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🏪 Franchise Dashboard
          </motion.h1>
          <motion.p
            className="text-lg font-semibold opacity-90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Complete Business Overview - Vehicles, Riders, Payments & Analytics
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Main Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { icon: FiTrendingUp, label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, color: 'from-green-400 to-emerald-600', dark: 'text-green-600' },
            { icon: FiTruck, label: 'Active Vehicles', value: stats.totalVehicles, color: 'from-blue-400 to-blue-600', dark: 'text-blue-600' },
            { icon: FiUsers, label: 'Total Riders', value: stats.totalRiders, color: 'from-purple-400 to-purple-600', dark: 'text-purple-600' },
            { icon: FiBarChart, label: 'Total Bookings', value: stats.totalBookings, color: 'from-orange-400 to-red-600', dark: 'text-orange-600' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              >
                <div className="absolute top-0 right-0 opacity-10">
                  <Icon size={80} />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold opacity-80 mb-1 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-black">{stat.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Vehicles Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-900">
            <FiTruck className="text-blue-600" /> Active Fleet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles.map((vehicle, idx) => (
              <motion.div
                key={vehicle.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:border-blue-400 transition-all p-6 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className="h-32 flex items-center justify-center mb-4 bg-gray-50 rounded-xl relative">
                  <img src={vehicle.image} alt={vehicle.name} className="h-full object-contain" />
                  <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
                    vehicle.bookingStatus === 'in-use' ? 'bg-red-100 text-red-700' :
                    vehicle.bookingStatus === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {vehicle.bookingStatus === 'in-use' ? '🔴 In Use' : 
                     vehicle.bookingStatus === 'maintenance' ? '🔧 Maintenance' : 
                     '🟢 Available'}
                  </div>
                </div>
                <h3 className="font-black text-lg mb-2 text-gray-900">{vehicle.name}</h3>
                
                {vehicle.currentUser && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
                    <p className="text-xs text-gray-600 font-semibold">CURRENT USER</p>
                    <p className="text-sm font-black text-blue-700">{vehicle.currentUser}</p>
                  </div>
                )}
                
                <div className="space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-bold text-blue-600 capitalize">{vehicle.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <span className="font-bold text-amber-500">⭐ {vehicle.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price/Day:</span>
                    <span className="font-black text-emerald-600">₹{vehicle.pricePerDay}</span>
                  </div>
                  {vehicle.fuelStatus !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel:</span>
                      <span className="font-bold text-green-600">{vehicle.fuelStatus}%</span>
                    </div>
                  )}
                </div>
                <motion.button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transition-all text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Details →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Riders Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-900">
            <FiUsers className="text-purple-600" /> Top Riders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riders.slice(0, 4).map((rider, idx) => (
              <motion.div
                key={rider.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:border-purple-400 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-black text-2xl mb-4 mx-auto shadow-lg">
                  {rider.name.charAt(0)}
                </div>
                <h3 className="font-black text-lg text-center mb-2 text-gray-900">{rider.name}</h3>
                <p className="text-center text-gray-500 font-semibold mb-4">{rider.phone}</p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rides:</span>
                    <span className="font-bold text-blue-600">{rider.totalRides}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-bold ${rider.status === 'active' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {rider.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Joined:</span>
                    <span className="font-semibold text-gray-700">{new Date(rider.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-900">
            <FiMap className="text-red-600" /> Live Fleet Tracking
          </h2>
          <motion.div
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ height: '500px' }}
          >
            <MapContainer
              center={[28.7041, 77.1025]}
              zoom={15}
              style={{ width: '100%', height: '100%' }}
              className="rounded-2xl"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {vehicles.map((v) => {
                const lat = 28.7041 + ((v.coords?.y || 50) - 50) * 0.01;
                const lng = 77.1025 + ((v.coords?.x || 50) - 50) * 0.01;
                
                const customIcon = L.divIcon({
                  html: `
                    <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform cursor-pointer">
                      <img src="${v.image}" alt="${v.name}" class="h-6 object-contain" />
                    </div>
                  `,
                  iconSize: [48, 48],
                  className: 'custom-icon',
                });

                return (
                  <Marker key={v.id} position={[lat, lng]} icon={customIcon}>
                    <Popup>
                      <div className="text-gray-900 text-sm">
                        <p className="font-extrabold text-base mb-1">{v.name}</p>
                        <p className="text-gray-600 capitalize text-xs mb-2">{v.type}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <FiMap size={12} className="text-red-500" />
                          <span className="text-xs text-gray-600">{v.location}</span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{v.available} Avail</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">₹{v.pricePerDay}/d</span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </motion.div>
        </motion.div>

        {/* Recent Payments */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3 text-gray-900">
            <FiCreditCard className="text-emerald-600" /> Recent Payments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPayments.slice(0, 8).map((payment, idx) => (
              <motion.div
                key={payment.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:border-emerald-400 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                onClick={() => setSelectedPayment(payment)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${
                    payment.status === 'completed' ? 'bg-emerald-100' :
                    payment.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {getStatusIcon(payment.status)}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    payment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {payment.status.toUpperCase()}
                  </span>
                </div>
                <p className="font-black text-lg text-gray-900 mb-1">{payment.riderName}</p>
                <p className="text-xs text-gray-500 font-semibold mb-4">{payment.id}</p>
                <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-black text-emerald-600">₹{payment.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-bold text-blue-600">{payment.rideType === 'ride' ? '🚗 Ride' : '🚘 Rental'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-semibold text-gray-700">{payment.method}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{payment.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-emerald-500" /> Revenue Growth
            </h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} tickFormatter={(val: any) => `₹${val}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(value: any) => [`₹${value}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#10B981', strokeWidth: 2 }}
                  activeDot={{ r: 10 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Vehicle Detail Modal */}
        {selectedVehicle && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
            onClick={() => setSelectedVehicle(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-2xl sm:rounded-2xl p-3 sm:p-5 max-w-sm w-full shadow-2xl border-2 border-gray-100"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="flex gap-3 mb-3">
                <div className="h-20 sm:h-24 w-20 sm:w-24 flex-shrink-0 flex justify-center items-center bg-gray-50 rounded-lg">
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-gray-900 line-clamp-2">{selectedVehicle.name}</h2>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedVehicle.bookingStatus === 'in-use' ? 'bg-red-100 text-red-700' :
                        selectedVehicle.bookingStatus === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {selectedVehicle.bookingStatus === 'in-use' ? '🔴 In Use' : 
                         selectedVehicle.bookingStatus === 'maintenance' ? '🔧 Maint' : 
                         '🟢 Ready'}
                      </div>
                      <div className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-bold capitalize">
                        {selectedVehicle.type}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0.5 text-[11px]">
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span className="text-gray-600 truncate">{selectedVehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🛞</span>
                      <span className="text-gray-700 font-bold truncate">{selectedVehicle.licensePlate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                {/* Current User Section */}
                {selectedVehicle.currentUser ? (
                  <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-2.5">
                    <h3 className="text-xs sm:text-sm font-black mb-2 text-blue-900">👤 In Use By</h3>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div>
                        <p className="text-blue-600 font-bold mb-0.5">User</p>
                        <p className="font-bold text-gray-900 truncate">{selectedVehicle.currentUser}</p>
                      </div>
                      <div>
                        <p className="text-blue-600 font-bold mb-0.5">Phone</p>
                        <p className="font-bold text-gray-900 truncate text-[9px]">{selectedVehicle.currentUserPhone}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-blue-600 font-bold mb-0.5">Route</p>
                        <p className="font-bold text-gray-900 truncate text-[9px]">{selectedVehicle.pickupLocation} → {selectedVehicle.dropLocation || 'TBD'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 text-center">
                    <p className="text-emerald-900 font-bold text-xs">✅ Ready for Booking</p>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
                    <p className="text-[7px] font-extrabold text-gray-400 uppercase mb-0.5">Price</p>
                    <p className="text-sm sm:text-base font-black text-emerald-600">₹{selectedVehicle.pricePerDay}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
                    <p className="text-[7px] font-extrabold text-gray-400 uppercase mb-0.5">Bookings</p>
                    <p className="text-sm sm:text-base font-black text-blue-600">{selectedVehicle.bookings}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
                    <p className="text-[7px] font-extrabold text-gray-400 uppercase mb-0.5">Fuel</p>
                    <p className="text-sm sm:text-base font-black text-orange-600">{selectedVehicle.fuelStatus}%</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-center">
                    <p className="text-[7px] font-extrabold text-gray-400 uppercase mb-0.5">KMs</p>
                    <p className="text-sm sm:text-base font-black text-blue-700">{Math.round((selectedVehicle.km || 0) / 1000)}k</p>
                  </div>
                </div>
              </div>

              <button onClick={() => setSelectedVehicle(null)} className="w-full bg-gray-900 text-white hover:bg-gray-800 py-2 sm:py-2.5 rounded-lg font-bold text-sm border border-gray-900 shadow-md mt-3">Close</button>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Detail Modal */}
        {selectedPayment && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPayment(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-gray-100"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">💳</div>
                <h2 className="text-2xl font-black text-gray-900">Payment Details</h2>
              </div>
              <div className="space-y-3 mb-8">
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <p className="text-gray-500 text-xs font-bold mb-1">PAYMENT ID</p>
                  <p className="font-mono font-bold text-gray-900">{selectedPayment.id}</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                  <p className="text-gray-500 text-xs font-bold mb-1">RIDER NAME</p>
                  <p className="font-black text-lg text-gray-900">{selectedPayment.riderName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <p className="text-gray-500 text-xs font-bold mb-1">AMOUNT</p>
                    <p className="font-black text-emerald-600 text-lg">₹{selectedPayment.amount}</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                    <p className="text-gray-500 text-xs font-bold mb-1">TYPE</p>
                    <p className="font-bold text-purple-600 text-lg">{selectedPayment.rideType === 'ride' ? '🚗 Ride' : '🚘 Rental'}</p>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedPayment(null)}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black py-3 rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
