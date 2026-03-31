// src/screens/RideScreen.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiClock,
  FiZap,
  FiPhone,
  FiX,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface RideState {
  status: 'active' | 'ending';
  duration: number;
  distance: number;
  fare: number;
  battery: number;
  speed: number;
  lat: number;
  lng: number;
}

export const RideScreen: React.FC = () => {
  const navigate = useNavigate();
  const [ride, setRide] = useState<RideState>({
    status: 'active',
    duration: 0,
    distance: 0,
    fare: 0,
    battery: 95,
    speed: 0,
    lat: 13.0827,
    lng: 80.2707,
  });

  const [showEndModal, setShowEndModal] = useState(false);

  // Simulate ride updates
  useEffect(() => {
    if (ride.status !== 'active') return;

    const interval = setInterval(() => {
      setRide((prev) => ({
        ...prev,
        duration: prev.duration + 1,
        distance: prev.distance + Math.random() * 0.05,
        fare: Math.floor(prev.distance * 2),
        battery: Math.max(prev.battery - 0.5, 20),
        speed: Math.floor(Math.random() * 50),
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [ride.status]);

  const minutes = Math.floor(ride.duration / 60);
  const seconds = ride.duration % 60;

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    tap: {
      scale: 0.95,
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    },
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Live Map Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27%3E%3Cpath fill=%27%23fff%27 d=%27M0,50 Q25,25 50,50 T100,50%27 stroke=%27%23000%27 stroke-width=%270.5%27/%3E%3C/svg%3E")',
        }}
      />

      {/* Status Header */}
      <motion.div
        className="relative z-20 bg-gray-900/80 backdrop-blur-md p-4 text-white border-b border-gray-800"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm opacity-90">Ride in Progress</p>
            <h1 className="text-3xl font-bold">🛴 Pro Scooter</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/home')}
            className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
          >
            <FiX size={24} />
          </motion.button>
        </div>

        {/* Timer */}
        <motion.div
          className="text-4xl font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
        >
          {String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col gap-4 p-4 overflow-y-auto">
        {/* Live Location Tracker */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Map Placeholder */}
          <div className="relative h-80 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            {/* Map animation */}
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Vehicle Location Pulse */}
            <motion.div className="relative z-10 flex items-center justify-center">
              <motion.div
                className="absolute w-20 h-20 bg-blue-500 rounded-full opacity-20"
                variants={pulseVariants}
                animate="pulse"
                transition={{ duration: 2 }}
              />
              <motion.div
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📍
              </motion.div>
            </motion.div>

            {/* Navigation Arrows */}
            <motion.div
              className="absolute top-4 right-4 text-white bg-blue-600 rounded-full p-3"
              animate={{ rotate: 45 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              ↑
            </motion.div>
          </div>

          {/* Ride Info */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <FiClock />
                  <p className="text-sm font-semibold">Duration</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {minutes}m {seconds}s
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-green-600">
                  <FiMapPin />
                  <p className="text-sm font-semibold">Distance</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {ride.distance.toFixed(2)}km
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-purple-600">
                  <FiZap />
                  <p className="text-sm font-semibold">Speed</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {ride.speed} km/h
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-amber-600">
                  <p className="text-sm font-semibold">🔋 Battery</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(ride.battery)}%
                </p>
              </motion.div>
            </div>

            {/* Fare Display */}
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-4 flex justify-between items-center"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0.7)',
                  '0 0 0 20px rgba(59, 130, 246, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div>
                <p className="text-sm opacity-90">Current Fare</p>
                <p className="text-3xl font-bold">₹{ride.fare}</p>
              </div>
              <motion.div
                className="text-5xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                ⚡
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-md text-white rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
          >
            <FiPhone /> Call Support
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-md text-white rounded-2xl p-4 font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-colors"
          >
            📞 Share Location
          </motion.button>
        </div>
      </div>

      {/* End Ride Button */}
      <motion.div
        className="relative z-20 p-4 bg-white"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => setShowEndModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4 rounded-2xl text-lg shadow-lg"
        >
          End Ride
        </motion.button>
      </motion.div>

      {/* End Ride Modal */}
      {showEndModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.div
              className="text-6xl text-center mb-4"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            >
              ✨
            </motion.div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Ride Completed!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Great ride! Let's see the summary.
            </p>

            <div className="space-y-3 mb-6 bg-gray-50 rounded-xl p-4">
              <motion.div
                className="flex justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-gray-600">Distance</span>
                <span className="font-bold">{ride.distance.toFixed(2)} km</span>
              </motion.div>
              <motion.div
                className="flex justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-gray-600">Duration</span>
                <span className="font-bold">
                  {minutes}m {seconds}s
                </span>
              </motion.div>
              <motion.div
                className="flex justify-between"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-gray-600">Total Fare</span>
                <span className="font-bold text-2xl text-green-600">
                  ₹{ride.fare}
                </span>
              </motion.div>
            </div>

            <motion.button
              onClick={() => {
                setShowEndModal(false);
                setRide((prev) => ({ ...prev, status: 'ending' }));
                setTimeout(() => navigate('/rate'), 1000);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl mb-2"
            >
              Continue
            </motion.button>
            <button
              onClick={() => setShowEndModal(false)}
              className="w-full text-gray-600 font-semibold py-2"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
