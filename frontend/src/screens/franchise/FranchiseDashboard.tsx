import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiTruck, FiUsers, FiCreditCard, FiMap, FiLogOut, FiMenu, FiX, FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp, FiDollarSign, FiBriefcase, FiPhone, FiMail, FiZap, FiBatteryCharging } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Franchise {
  id: string;
  name: string;
  location: string;
  managerName: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

interface Payment {
  id: string;
  riderName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
  rideId: string;
  rideType: 'ride' | 'rental';
  franchiseName: string;
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
  batteryLevel?: number;
  range?: number;
  chargePort?: string;
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'franchises' | 'vehicles' | 'riders' | 'payments' | 'map'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const navigate = useNavigate();

  const franchises: Franchise[] = [
    { id: 'F-001', name: 'Delhi Central Hub', location: 'Connaught Place, Delhi', managerName: 'Rahul Verma', phone: '+91 9876543211', email: 'cp@flexigo.in', status: 'active' },
    { id: 'F-002', name: 'Noida City Center', location: 'Sector 32, Noida', managerName: 'Priya Sharma', phone: '+91 9876543212', email: 'noida@flexigo.in', status: 'active' },
    { id: 'F-003', name: 'Gurugram Sector 15', location: 'Sector 15, Gurugram', managerName: 'Amit Singh', phone: '+91 9876543213', email: 'gurugram@flexigo.in', status: 'active' },
    { id: 'F-004', name: 'IGI Airport Station', location: 'Terminal 3, IGI Airport', managerName: 'Sanjay Dutt', phone: '+91 9876543214', email: 'airport@flexigo.in', status: 'inactive' },
  ];

  const vehicles: Vehicle[] = [
    { id: '1', name: 'Revolt RV400', type: 'bike', pricePerDay: 450, location: 'Downtown Station', rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop', available: 5, total: 10, bookings: 156, coords: { x: 45, y: 30 }, currentUser: 'Raj Kumar', currentUserPhone: '9876543210', pickupLocation: 'Connaught Place, Delhi', dropLocation: 'India Gate, Delhi', bookingTime: '2026-03-31 10:30 AM', estimatedReturn: '2026-03-31 02:30 PM', bookingStatus: 'in-use', currentRating: 4.9, licensePlate: 'DL01AB1234', batteryLevel: 85, range: 120, chargePort: 'Type 2', km: 24500 },
    { id: '2', name: 'Ola S1 Pro', type: 'scooter', pricePerDay: 300, location: 'Mall Parking', rating: 4.9, reviews: 489, image: 'https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce0d5bd70a.jpg', available: 8, total: 15, bookings: 142, coords: { x: 75, y: 55 }, currentUser: 'Priya Singh', currentUserPhone: '9123456789', pickupLocation: 'Delhi Mall, Delhi', dropLocation: 'Karol Bagh, Delhi', bookingTime: '2026-03-31 11:00 AM', estimatedReturn: '2026-03-31 03:00 PM', bookingStatus: 'in-use', currentRating: 4.8, licensePlate: 'DL02CD5678', batteryLevel: 92, range: 135, chargePort: 'Portable', km: 8900 },
    { id: '3', name: 'Ather 450X', type: 'scooter', pricePerDay: 350, location: 'Airport Station', rating: 4.9, reviews: 456, image: 'https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce0d5bd70a.jpg', available: 3, total: 8, bookings: 89, coords: { x: 20, y: 25 }, currentUser: null, pickupLocation: 'IGI Airport, Delhi', dropLocation: null, bookingStatus: 'available', currentRating: 4.9, licensePlate: 'DL03EF9012', batteryLevel: 100, range: 105, chargePort: 'Fast Charge', km: 12300 },
    { id: '4', name: 'Tata Nexon EV', type: 'car', pricePerDay: 1500, location: 'Central Hub', rating: 4.8, reviews: 512, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400', available: 4, total: 6, bookings: 98, coords: { x: 60, y: 40 }, currentUser: 'Amit Patel', currentUserPhone: '9988776655', pickupLocation: 'South Delhi Complex', dropLocation: 'Noida City Center', bookingTime: '2026-03-31 09:45 AM', estimatedReturn: '2026-03-31 04:00 PM', bookingStatus: 'in-use', currentRating: 4.8, licensePlate: 'DL04GH3456', batteryLevel: 45, range: 312, chargePort: 'CCS2', km: 45600 },
    { id: '5', name: 'MG ZS EV', type: 'car', pricePerDay: 1800, location: 'Downtown Station', rating: 4.7, reviews: 267, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400', available: 7, total: 12, bookings: 156, coords: { x: 30, y: 65 }, currentUser: 'Sarah Khan', currentUserPhone: '9876123456', pickupLocation: 'Rajouri Garden, Delhi', dropLocation: 'Gurugram Sector 15', bookingTime: '2026-03-31 08:30 AM', estimatedReturn: '2026-03-31 05:30 PM', bookingStatus: 'in-use', currentRating: 4.7, licensePlate: 'DL05IJ7890', batteryLevel: 72, range: 280, chargePort: 'CCS2', km: 38200 },
    { id: '6', name: 'BYD Atto 3', type: 'car', pricePerDay: 2200, location: 'Airport Station', rating: 4.9, reviews: 189, image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400', available: 2, total: 4, bookings: 67, coords: { x: 80, y: 20 }, currentUser: null, pickupLocation: 'IGI Airport Terminal 3', dropLocation: null, bookingStatus: 'available', currentRating: 4.9, licensePlate: 'DL06KL2345', batteryLevel: 95, range: 480, chargePort: 'CCS2', km: 28900 },
    { id: '7', name: 'Ultraviolette F77', type: 'bike', pricePerDay: 850, location: 'City Center', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop', available: 9, total: 20, bookings: 198, coords: { x: 50, y: 70 }, currentUser: 'Vikram Desai', currentUserPhone: '8765432109', pickupLocation: 'Lajpat Nagar, Delhi', dropLocation: 'Defence Colony, Delhi', bookingTime: '2026-03-31 12:00 PM', estimatedReturn: '2026-03-31 02:00 PM', bookingStatus: 'in-use', currentRating: 4.9, licensePlate: 'DL07GH5678', batteryLevel: 68, range: 220, chargePort: 'CCS2', km: 3400 },
    { id: '8', name: 'EcoScoot (Accessible)', type: 'scooter', pricePerDay: 250, location: 'Mall Parking', rating: 4.4, reviews: 98, image: 'https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce0d5bd70a.jpg', available: 10, total: 15, bookings: 112, coords: { x: 65, y: 35 }, currentUser: 'Neha Gupta', currentUserPhone: '9999887766', pickupLocation: 'Select City Walk Mall', dropLocation: 'CP House, Delhi', bookingTime: '2026-03-31 11:30 AM', estimatedReturn: '2026-03-31 01:00 PM', bookingStatus: 'in-use', currentRating: 4.5, licensePlate: 'DL08OP9012', batteryLevel: 80, range: 60, chargePort: 'Standard', km: 15600 },
  ];

  const riders: Rider[] = [
    { id: 'R-101', name: 'Alia Bhatt', phone: '9876543210', totalRides: 42, status: 'active', joinedDate: '2025-11-12' },
    { id: 'R-102', name: 'Ranveer Singh', phone: '8765432109', totalRides: 15, status: 'active', joinedDate: '2026-01-05' },
    { id: 'R-103', name: 'Deepika Padukone', phone: '7654321098', totalRides: 128, status: 'active', joinedDate: '2024-05-20' },
    { id: 'R-104', name: 'Shahrukh Khan', phone: '6543210987', totalRides: 5, status: 'inactive', joinedDate: '2026-02-18' },
  ];

  const payments: Payment[] = [
    { id: 'PAY001', riderName: 'Raj Kumar', amount: 250, date: '2026-03-30 09:30', status: 'completed', method: 'UPI', rideId: 'RIDE123', rideType: 'ride', franchiseName: 'Delhi Central Hub' },
    { id: 'PAY002', riderName: 'Priya Singh', amount: 1500, date: '2026-03-30 10:15', status: 'completed', method: 'Credit Card', rideId: 'RENTAL456', rideType: 'rental', franchiseName: 'Noida City Center' },
    { id: 'PAY003', riderName: 'Amit Patel', amount: 300, date: '2026-03-30 08:45', status: 'pending', method: 'Wallet', rideId: 'RIDE789', rideType: 'ride', franchiseName: 'Gurugram Sector 15' },
    { id: 'PAY004', riderName: 'Sarah Khan', amount: 800, date: '2026-03-29 15:20', status: 'completed', method: 'Debit Card', rideId: 'RENTAL101', rideType: 'rental', franchiseName: 'Delhi Central Hub' },
    { id: 'PAY005', riderName: 'Vikram Desai', amount: 450, date: '2026-03-29 14:00', status: 'failed', method: 'UPI', rideId: 'RIDE202', rideType: 'ride', franchiseName: 'IGI Airport Station' },
    { id: 'PAY006', riderName: 'Neha Gupta', amount: 2000, date: '2026-03-29 11:30', status: 'completed', method: 'Credit Card', rideId: 'RENTAL303', rideType: 'rental', franchiseName: 'Gurugram Sector 15' },
    { id: 'PAY007', riderName: 'Rohan Sharma', amount: 350, date: '2026-03-29 10:00', status: 'completed', method: 'Wallet', rideId: 'RIDE404', rideType: 'ride', franchiseName: 'Noida City Center' },
    { id: 'PAY008', riderName: 'Anjali Verma', amount: 600, date: '2026-03-28 16:45', status: 'pending', method: 'Bank Transfer', rideId: 'RENTAL505', rideType: 'rental', franchiseName: 'IGI Airport Station' },
  ];

  const stats = {
    totalRevenue: payments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalVehicles: vehicles.length,
    totalRiders: riders.length,
    totalBookings: vehicles.reduce((sum, v) => sum + v.bookings, 0),
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

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'franchises', label: 'All Franchises', icon: FiBriefcase },
    { id: 'vehicles', label: 'Fleet Management', icon: FiTruck },
    { id: 'riders', label: 'Global Riders', icon: FiUsers },
    { id: 'payments', label: 'All Payments', icon: FiCreditCard },
    { id: 'map', label: 'Live Map', icon: FiMap },
  ];

  const handleNavClick = (id: any) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FiCheckCircle size={16} />;
      case 'pending': return <FiClock size={16} />;
      case 'failed': return <FiAlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden w-full relative">
      <div className={`fixed inset-0 bg-black/50 z-[9998] md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />

      {/* Sidebar - Dark Theme */}
      <motion.div
        className={`fixed md:static inset-y-0 left-0 z-[9999] w-64 bg-[#111] shadow-2xl md:shadow-none border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 flex items-center gap-2">
            <span>⚡</span> Admin
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white text-2xl font-bold">✕</button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-md border border-lime-400/30' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-lime-400' : 'text-white/50'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
        {/* Top Header */}
        <header className="bg-[#111] border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between md:justify-end sticky top-0 z-30 shadow-sm shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-white/70 hover:text-white">
            <FiMenu size={24} />
          </button>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">Admin</p>
              <p className="text-xs font-semibold text-lime-400">Operations</p>
            </div>
            <div className="h-10 w-10 aspect-square rounded-full bg-gradient-to-tr from-lime-400 to-green-500 text-black flex items-center justify-center font-black text-lg shadow-md border border-lime-400">
              FM
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                
                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                  <>
                    <div className="mb-8">
                      <h1 className="text-2xl md:text-3xl font-black text-white">Global Overview</h1>
                      <p className="text-sm md:text-base text-white/60 font-semibold mt-1">Monitor all franchise metrics and revenue.</p>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-black/50 border-2 border-lime-400/20 rounded-3xl p-5 shadow-sm">
                        <p className="text-[10px] md:text-xs font-black text-white/50 uppercase tracking-widest mb-1">Total Revenue</p>
                        <p className="text-2xl md:text-3xl font-black text-lime-400">₹{stats.totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-black/50 border-2 border-blue-400/20 rounded-3xl p-5 shadow-sm">
                        <p className="text-[10px] md:text-xs font-black text-white/50 uppercase tracking-widest mb-1">Active Vehicles</p>
                        <p className="text-2xl md:text-3xl font-black text-blue-400">{stats.totalVehicles}</p>
                      </div>
                      <div className="bg-black/50 border-2 border-purple-400/20 rounded-3xl p-5 shadow-sm">
                        <p className="text-[10px] md:text-xs font-black text-white/50 uppercase tracking-widest mb-1">Total Riders</p>
                        <p className="text-2xl md:text-3xl font-black text-purple-400">{stats.totalRiders}</p>
                      </div>
                      <div className="bg-black/50 border-2 border-orange-400/20 rounded-3xl p-5 shadow-sm">
                        <p className="text-[10px] md:text-xs font-black text-white/50 uppercase tracking-widest mb-1">Total Bookings</p>
                        <p className="text-2xl md:text-3xl font-black text-orange-400">{stats.totalBookings}</p>
                      </div>
                    </div>
                    {/* Line Chart */}
                    <div className="bg-black/50 rounded-3xl shadow-sm border-2 border-white/10 p-6 md:p-8">
                      <h2 className="text-xl font-black text-white flex items-center gap-2 mb-6">
                        <FiTrendingUp className="text-blue-400" /> Revenue Growth
                      </h2>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} dx={-10} tickFormatter={(val: any) => `₹${val}`} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)', backgroundColor: '#1F2937', color: '#FFFFFF' }} formatter={(value: any) => [`₹${value}`, 'Revenue']} />
                            <Line type="monotone" dataKey="revenue" stroke="#60A5FA" strokeWidth={4} dot={{ r: 6, fill: '#60A5FA', strokeWidth: 2 }} activeDot={{ r: 10 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </>
                )}

                {/* FRANCHISES TAB */}
                {activeTab === 'franchises' && (
                  <>
                    <div className="mb-6">
                      <h1 className="text-2xl md:text-3xl font-black text-white">Manage Franchises</h1>
                      <p className="text-sm md:text-base text-white/60 font-semibold mt-1">View and contact all your partner franchises across regions.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {franchises.map((franchise) => (
                        <div key={franchise.id} className="bg-black/50 rounded-[2rem] p-6 shadow-sm border-2 border-white/10 hover:border-lime-400/50 transition-all flex flex-col h-full">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-14 h-14 bg-lime-400/10 border border-lime-400/50 text-lime-400 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                              <FiBriefcase />
                            </div>
                            <span className={`px-3 py-1 bg-black/50 shadow-sm border rounded-full text-[10px] font-black uppercase tracking-wider ${franchise.status === 'active' ? 'text-lime-400 border-lime-400/30' : 'text-red-400 border-red-400/30'}`}>
                              {franchise.status === 'active' ? '🟢 Active' : '🔴 Offline'}
                            </span>
                          </div>
                          
                          <h3 className="font-black text-xl text-white mb-1">{franchise.name}</h3>
                          <p className="text-sm font-bold text-white/60 mb-6 flex items-center gap-1">📍 {franchise.location}</p>
                          
                          <div className="bg-white/5 rounded-2xl p-4 mb-6 mt-auto border border-white/10">
                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Manager</p>
                            <p className="font-black text-white mb-3">{franchise.managerName}</p>
                            
                            <div className="space-y-2 mt-2">
                              <div className="flex items-center gap-2 text-xs font-bold text-white/70">
                                <FiPhone className="text-lime-400" /> {franchise.phone}
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-white/70">
                                <FiMail className="text-lime-400" /> {franchise.email}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mt-auto pt-2 shrink-0">
                            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-lime-400 to-green-500 hover:from-lime-500 hover:to-green-600 text-black py-3 rounded-xl font-extrabold text-sm transition-colors shadow-sm" onClick={() => alert(`Initiating call to ${franchise.managerName}...`)}>
                              <FiPhone size={16} /> Call
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-extrabold text-sm transition-colors shadow-sm border border-white/10" onClick={() => alert(`Opening email draft for ${franchise.email}...`)}>
                              <FiMail size={16} /> Email
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* VEHICLES TAB */}
                {activeTab === 'vehicles' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} onClick={() => setSelectedVehicle(vehicle)} className="bg-black/50 rounded-[2rem] p-5 shadow-sm border-2 border-white/10 hover:border-lime-400/50 transition-all cursor-pointer group">
                        <div className="h-40 bg-black/30 rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative shadow-sm border border-white/10">
                          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <span className={`absolute top-2 right-2 px-3 py-1 bg-black/70 shadow-sm rounded-full text-[10px] font-black uppercase tracking-wider ${vehicle.bookingStatus === 'in-use' ? 'text-red-400' : vehicle.bookingStatus === 'maintenance' ? 'text-yellow-400' : 'text-lime-400'}`}>
                            {vehicle.bookingStatus === 'in-use' ? '🔴 In Use' : vehicle.bookingStatus === 'maintenance' ? '🔧 Maint' : '🟢 Ready'}
                          </span>
                        </div>
                        <h3 className="font-black text-lg text-white mb-1">{vehicle.name}</h3>
                        <div className="flex flex-col gap-2 mt-4 text-xs">
                          {vehicle.currentUser && (
                            <div className="bg-lime-400/20 text-lime-400 p-2 rounded-lg font-bold border border-lime-400/30">
                              Current User: {vehicle.currentUser}
                            </div>
                          )}
                          <div className="flex justify-between items-center text-white/60 font-bold p-1">
                            <span>Type</span><span className="capitalize text-white">{vehicle.type}</span>
                          </div>
                          <div className="flex justify-between items-center text-white/60 font-bold p-1">
                            <span>Location</span><span className="text-white">{vehicle.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* RIDERS TAB */}
                {activeTab === 'riders' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {riders.map((rider) => (
                      <div key={rider.id} className="bg-black/50 rounded-[2rem] p-6 shadow-sm border-2 border-white/10 hover:border-lime-400/50 transition-all text-center">
                        <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-lime-400 to-green-500 text-black flex items-center justify-center text-2xl font-black mb-4 shadow-lg">{rider.name.charAt(0)}</div>
                        <h3 className="font-black text-xl text-white mb-1">{rider.name}</h3>
                        <p className="text-sm font-bold text-white/60 mb-4">{rider.phone}</p>
                        <div className="bg-white/5 rounded-2xl p-4 text-left grid grid-cols-2 gap-y-3 border border-white/10">
                          <div><p className="text-[10px] font-bold text-white/50 uppercase">Total Rides</p><p className="font-black text-lime-400">{rider.totalRides}</p></div>
                          <div><p className="text-[10px] font-bold text-white/50 uppercase">Status</p><p className={`font-black uppercase text-[10px] py-1 px-2 inline-block rounded-full mt-1 ${rider.status === 'active' ? 'bg-lime-400/20 text-lime-400' : 'bg-red-400/20 text-red-400'}`}>{rider.status}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* PAYMENTS TAB */}
                {activeTab === 'payments' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {payments.map((payment) => (
                      <div key={payment.id} onClick={() => setSelectedPayment(payment)} className="bg-black/50 rounded-[2rem] p-6 shadow-sm border-2 border-white/10 hover:border-lime-400/50 transition-all cursor-pointer">
                         <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-2xl ${
                            payment.status === 'completed' ? 'bg-lime-400/20 text-lime-400' :
                            payment.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-red-400/20 text-red-400'
                          }`}>
                            <FiDollarSign size={20} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider ${
                            payment.status === 'completed' ? 'bg-lime-400/20 text-lime-400 border border-lime-400/30' :
                            payment.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : 'bg-red-400/20 text-red-400 border border-red-400/30'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-1">₹{payment.amount}</h3>
                        <p className="text-sm font-extrabold text-white/70 mb-3">{payment.riderName}</p>
                        
                        <div className="inline-block bg-lime-400/20 border border-lime-400/30 text-lime-400 text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                          📍 {payment.franchiseName}
                        </div>

                        <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-2xl mt-1 border border-white/10">
                          <div>
                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Method</p>
                            <p className="text-xs font-black text-white">{payment.method}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-0.5">Date</p>
                            <p className="text-xs font-bold text-white/70">{payment.date.split(' ')[0]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MAP TAB */}
                {activeTab === 'map' && (
                  <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-100 overflow-hidden h-[60vh] md:h-[70vh] min-h-[400px]">
                    <MapContainer center={[28.7041, 77.1025]} zoom={15} style={{ width: '100%', height: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                      {vehicles.map((v) => {
                        const lat = 28.7041 + ((v.coords?.y || 50) - 50) * 0.01;
                        const lng = 77.1025 + ((v.coords?.x || 50) - 50) * 0.01;
                        const customIcon = L.divIcon({ html: `<div class="w-10 md:w-12 h-10 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-500"><img src="${v.image}" class="h-5 md:h-6 object-contain" /></div>`, iconSize: [48, 48], className: 'custom-icon'});
                        return (
                          <Marker key={v.id} position={[lat, lng]} icon={customIcon}>
                            <Popup>
                              <div className="text-gray-900 border-none !p-0"><p className="font-extrabold mb-1">{v.name}</p><p className="text-[10px] font-bold text-gray-500 uppercase">{v.type}</p></div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </MapContainer>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-1.5 z-[60]" onClick={() => setSelectedVehicle(null)}>
          <motion.div className="bg-white rounded-xl p-2 w-[97vw] sm:w-[92vw] md:max-w-md text-gray-900 shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            
            {/* Header */}
            <div className="flex justify-between items-center mb-1.5 shrink-0">
              <div className="flex-1">
                <h2 className="text-sm sm:text-base font-black">{selectedVehicle.name}</h2>
                <span className="bg-lime-100 text-lime-800 px-1.5 py-0.5 rounded text-[7px] font-black uppercase">{selectedVehicle.type}</span>
              </div>
              <button onClick={() => setSelectedVehicle(null)} className="text-gray-400 hover:text-gray-800 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center shrink-0 ml-1">✕</button>
            </div>

            {/* Image */}
            <div className="h-20 mb-1.5 flex items-center justify-center bg-gray-100 rounded shrink-0">
              <img src={selectedVehicle.image} alt={selectedVehicle.name} className="h-full object-contain" />
            </div>

            {/* Stats Grid - 2x2 */}
            <div className="grid grid-cols-2 gap-1 shrink-0">
              <div className="bg-emerald-50 border border-emerald-200 rounded p-1 text-center">
                <p className="text-[6px] font-bold text-emerald-700 uppercase">Price</p>
                <p className="font-black text-emerald-700 text-xs">₹{selectedVehicle.pricePerDay}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-1 text-center">
                <p className="text-[6px] font-bold text-blue-700 uppercase">Bookings</p>
                <p className="font-black text-blue-700 text-xs">{selectedVehicle.bookings}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded p-1 text-center">
                <p className="text-[6px] font-bold text-amber-700 uppercase">Battery</p>
                <p className="font-black text-amber-700 text-xs">{selectedVehicle.batteryLevel}%</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded p-1 text-center">
                <p className="text-[6px] font-bold text-purple-700 uppercase">Range</p>
                <p className="font-black text-purple-700 text-xs">{selectedVehicle.range}km</p>
              </div>
            </div>

            {/* Current User - Compact */}
            {selectedVehicle.currentUser && (
              <div className="bg-blue-50 border border-blue-200 rounded p-1 mt-1.5 shrink-0">
                <p className="text-[7px] font-black text-blue-900 mb-0.5">👤 {selectedVehicle.currentUser}</p>
                <div className="text-[10px] text-blue-700 font-semibold">
                  <p>{selectedVehicle.licensePlate}</p>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button onClick={() => setSelectedVehicle(null)} className="w-full bg-lime-400 text-black hover:bg-lime-500 py-1 rounded font-bold text-xs border border-lime-500 mt-1.5 shrink-0">Close</button>
          </motion.div>
        </div>
      )}

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 z-[60]" onClick={() => setSelectedPayment(null)}>
          <motion.div className="bg-white rounded-[2rem] p-6 max-h-[90vh] w-[90vw] max-w-sm text-center shadow-2xl" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><FiCreditCard size={32} /></div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">₹{selectedPayment.amount}</h2>
            <p className="text-gray-500 font-bold mb-6 truncate">{selectedPayment.riderName}</p>
            
            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 mb-6">
              <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Franchise</span><span className="text-xs font-black text-gray-900 text-right">{selectedPayment.franchiseName}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Type</span><span className="text-xs font-black text-gray-900 capitalize">{selectedPayment.rideType}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Method</span><span className="text-xs font-black text-gray-900">{selectedPayment.method}</span></div>
              <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400 uppercase">Status</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${selectedPayment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{selectedPayment.status}</span></div>
            </div>
            <button onClick={() => setSelectedPayment(null)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-extrabold text-sm shadow-md">Close Receipt</button>
          </motion.div>
        </div>
      )}

    </div>
  );
};
