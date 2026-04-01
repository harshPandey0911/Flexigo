import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiBarChart, FiMap, FiDollarSign, FiUsers } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  handicap?: boolean;
}

interface Rider {
  id: string;
  name: string;
  phone: string;
  totalRides: number;
  status: 'active' | 'inactive';
  joinedDate: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'riders' | 'map'>('vehicles');
  const [filterType, setFilterType] = useState<'all' | 'bike' | 'scooter' | 'car'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const riders: Rider[] = [
    { id: 'R-101', name: 'Alia Bhatt', phone: '9876543210', totalRides: 42, status: 'active', joinedDate: '2025-11-12' },
    { id: 'R-102', name: 'Ranveer Singh', phone: '8765432109', totalRides: 15, status: 'active', joinedDate: '2026-01-05' },
    { id: 'R-103', name: 'Deepika Padukone', phone: '7654321098', totalRides: 128, status: 'active', joinedDate: '2024-05-20' },
    { id: 'R-104', name: 'Shahrukh Khan', phone: '6543210987', totalRides: 5, status: 'inactive', joinedDate: '2026-02-18' },
    { id: 'R-105', name: 'Priyanka Chopra', phone: '5432109876', totalRides: 67, status: 'active', joinedDate: '2025-08-30' },
  ];

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
    },
    {
      id: '4',
      name: 'Hero Access Scooter',
      type: 'scooter',
      pricePerDay: 250,
      location: 'City Center',
      rating: 4.5,
      reviews: 123,
      image: 'https://content-cus.rapido.bike/image/auto%20new.webp',
      available: 12,
      total: 20,
      bookings: 176,
      coords: { x: 50, y: 70 },
    },
    {
      id: '5',
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
    },
    {
      id: '6',
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
    },
    {
      id: '7',
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
    },
    {
      id: '8',
      name: 'Accessible Bike (Handicap)',
      type: 'bike',
      pricePerDay: 400,
      location: 'Accessible Hub',
      rating: 4.7,
      reviews: 142,
      image: 'https://content-cus.rapido.bike/image/bike%20new.webp',
      available: 6,
      total: 10,
      bookings: 84,
      handicap: true,
      coords: { x: 40, y: 50 },
    },
    {
      id: '9',
      name: 'Accessible Scooter (Handicap)',
      type: 'scooter',
      pricePerDay: 200,
      location: 'Accessible Hub',
      rating: 4.6,
      reviews: 98,
      image: 'https://content-cus.rapido.bike/image/auto%20new.webp',
      available: 10,
      total: 15,
      bookings: 112,
      handicap: true,
      coords: { x: 65, y: 35 },
    },
  ];

  const filteredVehicles = vehicles.filter((v) => filterType === 'all' || v.type === filterType);

  const stats = {
    totalVehicles: vehicles.length,
    totalBookings: vehicles.reduce((sum, v) => sum + v.bookings, 0),
    revenue: vehicles.reduce((sum, v) => sum + v.bookings * v.pricePerDay * 3, 0),
    avgRating: (vehicles.reduce((sum, v) => sum + v.rating, 0) / vehicles.length).toFixed(1),
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
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
        className="bg-white text-black p-6 relative z-10 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <motion.h1
              className="text-4xl font-extrabold mb-2 text-black drop-shadow-sm flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              🏪 Franchise Management
            </motion.h1>
            <motion.p
              className="text-base font-semibold text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Manage all your vehicles and riders
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            {
              icon: FiBarChart,
              label: 'Total Vehicles',
              value: stats.totalVehicles,
              color: 'text-blue-600',
              bgIconColor: 'bg-blue-100/50',
            },
            {
              icon: FiUsers,
              label: 'Total Bookings',
              value: stats.totalBookings,
              color: 'text-purple-600',
              bgIconColor: 'bg-purple-100/50',
            },
            {
              icon: FiDollarSign,
              label: 'Est. Revenue',
              value: `₹${(stats.revenue / 100000).toFixed(1)}L`,
              color: 'text-emerald-600',
              bgIconColor: 'bg-emerald-100/50',
            },
            {
              icon: FiBarChart,
              label: 'Avg Rating',
              value: `${stats.avgRating} ⭐`,
              color: 'text-yellow-600',
              bgIconColor: 'bg-yellow-100/50',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-white via-lime-50 to-emerald-50 rounded-3xl p-6 shadow-xl border-2 border-lime-200"
                whileHover={{ y: -5, boxShadow: '0 20px 25px rgba(0,0,0,0.1)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-4 rounded-2xl ${stat.bgIconColor}`}>
                     <Icon size={32} className={`${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise Management</h2>
          <p className="text-gray-600 text-lg">Vehicle and rider management dashboard coming soon!</p>
        </div>
      </div>
    </div>
  );
};
