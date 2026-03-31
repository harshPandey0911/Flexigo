// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiClock, FiBattery, FiNavigation2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface Vehicle {
  id: string;
  name: string;
  model: string;
  battery: number;
  distance: number;
  price: number;
  type: 'scooter' | 'bike' | 'car';
  image: string;
}

export const HomeScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Pro Scooter',
      model: '60km Range',
      battery: 95,
      distance: 0.8,
      price: 2,
      type: 'scooter',
      image: 'https://content-cus.rapido.bike/image/auto%20new.webp',
    },
    {
      id: '2',
      name: 'E-Bike',
      model: 'Fast Charge',
      battery: 87,
      distance: 1.2,
      price: 3,
      type: 'bike',
      image: 'https://content-cus.rapido.bike/image/bike%20new.webp',
    },
    {
      id: '3',
      name: 'E-Car',
      model: 'Comfort Plus',
      battery: 92,
      distance: 0.5,
      price: 5,
      type: 'car',
      image: 'https://content-cus.rapido.bike/image/cab%20new.webp',
    },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const vehicleCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    },
  };

  const bottomSheetVariants = {
    hidden: { y: 500, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      y: 500,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleRideClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsExpanded(true);
  };

  const handleBookRide = (vehicle: Vehicle) => {
    console.log('Booking vehicle:', vehicle.id);
    navigate('/ride', { state: { vehicle } });
  };

  return (
    <div className="min-h-screen bg-white text-black pb-20">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200 p-6 sticky top-0 z-20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center gap-3 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-3xl">👋</motion.div>
          <div>
            <h1 className="text-2xl font-bold text-black">Welcome Raj</h1>
            <p className="text-gray-400 text-sm">Ready for your next ride?</p>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          className="flex items-center gap-2 bg-gradient-to-r from-lime-500/20 to-blue-500/20 border border-lime-400/30 rounded-lg p-3"
          variants={itemVariants}
        >
          <FiMapPin className="text-lime-400" />
          <div>
            <p className="text-xs text-gray-400">Current Location</p>
            <p className="font-semibold text-white">Bangalore, MG Road</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="px-4 pt-6 pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Rides', value: '24', icon: '🚗' },
            { label: 'Wallet', value: '₹450', icon: '💰' },
            { label: 'This Month', value: 'Active', icon: '⚡' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-gray-100 border border-gray-300 rounded-lg p-4 text-center hover:border-lime-400 transition-colors"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vehicles Section */}
      <motion.div className="px-4 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h2 className="text-xl font-bold text-white mb-4" variants={itemVariants}>
          Available Vehicles Near You
        </motion.h2>

        <div className="space-y-3">
          {vehicles.map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              className="bg-gray-100 border border-gray-300 rounded-2xl p-4 cursor-pointer hover:border-lime-400 transition-colors"
              variants={vehicleCardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.1 }}
              whileHover="hover"
              onClick={() => handleRideClick(vehicle)}
            >
              <div className="flex items-center gap-4">
                {/* Vehicle Image */}
                <motion.div
                  className="w-16 h-16 flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain drop-shadow-lg" />
                </motion.div>

                {/* Vehicle Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">
                    {vehicle.name}
                  </h3>
                  <p className="text-sm text-gray-400">{vehicle.model}</p>

                  {/* Stats Row */}
                  <div className="flex gap-3 mt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <FiNavigation2 className="w-4 h-4 text-lime-400" />
                      <span className="text-gray-400">{vehicle.distance}km</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <FiBattery className="w-4 h-4 text-green-400" />
                      <span className="text-gray-400">{vehicle.battery}%</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <motion.div
                  className="text-right"
                  whileHover={{ scale: 1.1 }}
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-blue-500 bg-clip-text text-transparent">
                    ₹{vehicle.price}
                  </p>
                  <p className="text-xs text-gray-500">/min</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vehicle Details Bottom Sheet */}
      <AnimatePresence>
        {isExpanded && selectedVehicle && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-30"
            onClick={() => setIsExpanded(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        {isExpanded && selectedVehicle && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300 rounded-t-3xl shadow-2xl z-30 max-h-96 overflow-y-auto"
            variants={bottomSheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6">
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-lime-400 to-blue-500 rounded-full" />
              </div>

              {/* Vehicle Details */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-32 h-32 mx-auto mb-4 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5 }}
                >
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-contain drop-shadow-2xl" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedVehicle.name}
                </h2>
                <p className="text-gray-400">{selectedVehicle.model}</p>
              </div>

              {/* Info Cards */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-lime-400 transition-colors"
                  variants={itemVariants}
                >
                  <FiBattery className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Battery</p>
                  <p className="text-xl font-bold text-white">
                    {selectedVehicle.battery}%
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-lime-400 transition-colors"
                  variants={itemVariants}
                >
                  <FiNavigation2 className="w-6 h-6 text-lime-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Distance</p>
                  <p className="text-xl font-bold text-white">
                    {selectedVehicle.distance}km
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-lime-400 transition-colors"
                  variants={itemVariants}
                >
                  <FiClock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Avg Time</p>
                  <p className="text-xl font-bold text-white">15 min</p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center hover:border-lime-400 transition-colors"
                  variants={itemVariants}
                >
                  <p className="text-2xl mb-2 text-lime-400">₹{selectedVehicle.price}</p>
                  <p className="text-sm text-gray-400">Price/min</p>
                </motion.div>
              </motion.div>

              {/* Book Button */}
              <motion.button
                onClick={() => {
                  handleBookRide(selectedVehicle);
                  setIsExpanded(false);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-lime-400 to-blue-500 text-black font-bold py-4 rounded-xl text-lg shadow-lg"
              >
                Book Now
              </motion.button>

              <motion.button
                onClick={() => setIsExpanded(false)}
                className="w-full text-gray-400 font-semibold py-3 mt-2 hover:text-white transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
