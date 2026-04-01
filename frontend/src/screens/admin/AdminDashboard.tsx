import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus, FiBarChart, FiMap, FiDollarSign, FiUsers, FiMenu, FiX, FiLogOut, FiHome, FiCreditCard, FiZap, FiBatteryCharging } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

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
  batteryLevel?: number;
  range?: number;
  chargePort?: string;
}

interface Payment {
  id: string;
  riderName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

interface Rider {
  id: string;
  name: string;
  phone: string;
  totalRides: number;
  status: 'active' | 'inactive';
  joinedDate: string;
  assignedVehicleId?: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vehicles' | 'riders' | 'vehicle-status' | 'map' | 'payments'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'bike' | 'scooter' | 'car'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Vehicle>>({});
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicleForm, setNewVehicleForm] = useState<Partial<Vehicle>>({
    name: '',
    type: 'bike',
    pricePerDay: 0,
    location: '',
    rating: 4.5,
    reviews: 0,
    image: '',
    available: 0,
    total: 0,
    bookings: 0,
    batteryLevel: 50,
    range: 100,
    chargePort: 'Type 2',
  });
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isAddingRider, setIsAddingRider] = useState(false);
  const [newRiderForm, setNewRiderForm] = useState<Partial<Rider>>({ name: '', phone: '', status: 'active', totalRides: 0 });
  const [selectedVehicleForRider, setSelectedVehicleForRider] = useState<string | null>(null);
  const [ridersData, setRidersData] = useState<Rider[]>([
    { id: 'R-101', name: 'Alia Bhatt', phone: '9876543210', totalRides: 42, status: 'active', joinedDate: '2025-11-12' },
    { id: 'R-102', name: 'Ranveer Singh', phone: '8765432109', totalRides: 15, status: 'active', joinedDate: '2026-01-05' },
    { id: 'R-103', name: 'Deepika Padukone', phone: '7654321098', totalRides: 128, status: 'active', joinedDate: '2024-05-20' },
    { id: 'R-104', name: 'Shahrukh Khan', phone: '6543210987', totalRides: 5, status: 'inactive', joinedDate: '2026-02-18' },
    { id: 'R-105', name: 'Priyanka Chopra', phone: '5432109876', totalRides: 67, status: 'active', joinedDate: '2025-08-30' },
  ]);
  const navigate = useNavigate();
  const bikeImage = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=400&fit=crop';
  const scooterImage = 'https://cdn.bikedekho.com/processedimages/ola-electric/2025-s1-pro/source/2025-s1-pro679ce0d5bd70a.jpg';
  const carImage = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400';

  const vehicles: Vehicle[] = [
    { id: '1', name: 'Revolt RV400', type: 'bike', pricePerDay: 450, location: 'Downtown Station', rating: 4.8, reviews: 234, image: bikeImage, available: 5, total: 10, bookings: 156, coords: { x: 45, y: 30 }, batteryLevel: 85, range: 120, chargePort: 'Type 2' },
    { id: '2', name: 'Ola S1 Pro', type: 'scooter', pricePerDay: 300, location: 'Mall Parking', rating: 4.9, reviews: 489, image: scooterImage, available: 12, total: 15, bookings: 142, coords: { x: 75, y: 55 }, batteryLevel: 92, range: 135, chargePort: 'Portable' },
    { id: '3', name: 'Ather 450X', type: 'scooter', pricePerDay: 350, location: 'Airport Station', rating: 4.9, reviews: 456, image: scooterImage, available: 8, total: 8, bookings: 89, coords: { x: 20, y: 25 }, batteryLevel: 68, range: 105, chargePort: 'Fast Charge' },
    { id: '4', name: 'Ultraviolette F77', type: 'bike', pricePerDay: 850, location: 'City Center', rating: 4.7, reviews: 123, image: bikeImage, available: 2, total: 20, bookings: 176, coords: { x: 50, y: 70 }, batteryLevel: 100, range: 307, chargePort: 'CCS2' },
    { id: '5', name: 'Tata Nexon EV', type: 'car', pricePerDay: 1500, location: 'Central Hub', rating: 4.8, reviews: 512, image: carImage, available: 6, total: 6, bookings: 98, coords: { x: 60, y: 40 }, batteryLevel: 78, range: 312, chargePort: 'CCS2' },
    { id: '6', name: 'MG ZS EV', type: 'car', pricePerDay: 1800, location: 'Downtown Station', rating: 4.7, reviews: 267, image: carImage, available: 4, total: 12, bookings: 156, coords: { x: 30, y: 65 }, batteryLevel: 54, range: 280, chargePort: 'CCS2' },
    { id: '7', name: 'BYD Atto 3', type: 'car', pricePerDay: 2200, location: 'Airport Station', rating: 4.9, reviews: 189, image: carImage, available: 2, total: 4, bookings: 67, coords: { x: 80, y: 20 }, batteryLevel: 95, range: 480, chargePort: 'CCS2' },
    { id: '8', name: 'EcoBike (Accessible)', type: 'bike', pricePerDay: 300, location: 'Accessible Hub', rating: 4.7, reviews: 142, image: bikeImage, available: 6, total: 10, bookings: 84, handicap: true, coords: { x: 40, y: 50 }, batteryLevel: 80, range: 90, chargePort: 'Standard' },
    { id: '9', name: 'EcoScoot (Accessible)', type: 'scooter', pricePerDay: 250, location: 'Accessible Hub', rating: 4.6, reviews: 98, image: scooterImage, available: 10, total: 15, bookings: 112, handicap: true, coords: { x: 65, y: 35 }, batteryLevel: 45, range: 60, chargePort: 'Standard' },
  ];

  const payments: Payment[] = [
    { id: 'PAY001', riderName: 'Raj Kumar', amount: 250, date: 'Mar 31, 09:30 AM', status: 'completed', method: 'UPI' },
    { id: 'PAY002', riderName: 'Priya Singh', amount: 1500, date: 'Mar 31, 10:15 AM', status: 'completed', method: 'Credit Card' },
    { id: 'PAY003', riderName: 'Amit Patel', amount: 300, date: 'Mar 30, 08:45 AM', status: 'pending', method: 'Wallet' },
    { id: 'PAY004', riderName: 'Sarah Khan', amount: 800, date: 'Mar 30, 03:20 PM', status: 'completed', method: 'Debit Card' },
    { id: 'PAY005', riderName: 'Vikram Desai', amount: 450, date: 'Mar 29, 02:00 PM', status: 'failed', method: 'UPI' },
    { id: 'PAY006', riderName: 'Neha Gupta', amount: 2000, date: 'Mar 29, 11:30 AM', status: 'completed', method: 'Credit Card' },
    { id: 'PAY007', riderName: 'Rohan Sharma', amount: 350, date: 'Mar 28, 10:00 AM', status: 'completed', method: 'Wallet' },
    { id: 'PAY008', riderName: 'Anjali Verma', amount: 600, date: 'Mar 28, 04:45 PM', status: 'pending', method: 'Bank Transfer' },
  ];

  const [vehiclesData, setVehiclesData] = useState<Vehicle[]>(vehicles);

  const filteredVehicles = vehiclesData.filter((v) => filterType === 'all' || v.type === filterType);

  const stats = {
    totalVehicles: vehiclesData.length,
    totalBookings: vehiclesData.reduce((sum, v) => sum + v.bookings, 0),
    revenue: vehiclesData.reduce((sum, v) => sum + v.bookings * v.pricePerDay * 3, 0),
    avgRating: (vehiclesData.reduce((sum, v) => sum + v.rating, 0) / vehiclesData.length).toFixed(1),
  };

  const handleSaveVehicle = () => {
    if (selectedVehicle) {
      const updated = vehiclesData.map(v => v.id === selectedVehicle.id ? { ...v, ...editForm } as Vehicle : v);
      setVehiclesData(updated);
      setSelectedVehicle({ ...selectedVehicle, ...editForm } as Vehicle);
      setIsEditingVehicle(false);
    }
  };

  const handleAddVehicle = () => {
    if (newVehicleForm.name && newVehicleForm.pricePerDay && newVehicleForm.location) {
      const newVehicle: Vehicle = {
        id: String(vehiclesData.length + 1),
        name: newVehicleForm.name,
        type: newVehicleForm.type || 'bike',
        pricePerDay: newVehicleForm.pricePerDay,
        location: newVehicleForm.location,
        rating: newVehicleForm.rating || 4.5,
        reviews: newVehicleForm.reviews || 0,
        image: newVehicleForm.image || '',
        available: newVehicleForm.available || 1,
        total: newVehicleForm.total || 1,
        bookings: newVehicleForm.bookings || 0,
        coords: newVehicleForm.coords || { x: 50, y: 50 },
        batteryLevel: newVehicleForm.batteryLevel || 50,
        range: newVehicleForm.range || 100,
        chargePort: newVehicleForm.chargePort || 'Type 2',
        handicap: newVehicleForm.handicap || false,
      };
      setVehiclesData([...vehiclesData, newVehicle]);
      setIsAddingVehicle(false);
      setNewVehicleForm({
        name: '',
        type: 'bike',
        pricePerDay: 0,
        location: '',
        rating: 4.5,
        reviews: 0,
        image: '',
        available: 0,
        total: 0,
        bookings: 0,
        batteryLevel: 50,
        range: 100,
        chargePort: 'Type 2',
      });
    }
  };

  const handleAddRider = () => {
    if (newRiderForm.name && newRiderForm.phone) {
      const newRider: Rider = {
        id: `R-${Date.now().toString().slice(-4)}`,
        name: newRiderForm.name,
        phone: newRiderForm.phone,
        totalRides: 0,
        status: (newRiderForm.status as 'active' | 'inactive') || 'active',
        joinedDate: new Date().toISOString().split('T')[0],
        assignedVehicleId: selectedVehicleForRider || undefined,
      };
      setRidersData([...ridersData, newRider]);
      setIsAddingRider(false);
      setNewRiderForm({ name: '', phone: '', status: 'active', totalRides: 0 });
      setSelectedVehicleForRider(null);
    }
  };

  const handleDeleteRider = (riderId: string) => {
    if (confirm('Are you sure you want to delete this rider?')) {
      setRidersData(ridersData.filter(r => r.id !== riderId));
      setSelectedRider(null);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'vehicles', label: 'Vehicles', icon: FiZap },
    { id: 'riders', label: 'Riders', icon: FiUsers },
    { id: 'vehicle-status', label: 'Vehicle Status', icon: FiBatteryCharging },
    { id: 'payments', label: 'Payments', icon: FiCreditCard },
    { id: 'map', label: 'Live Map', icon: FiMap },
  ];

  const handleNavClick = (id: any) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden w-full relative">
      {/* Add Rider Modal */}
      {isAddingRider && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[70]" onClick={() => setIsAddingRider(false)}>
          <motion.div className="bg-[#111] rounded-[2rem] border border-white/10 p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2"><FiPlus className="text-lime-400" /> Add New Rider</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Full Name</label>
                <input type="text" placeholder="Enter rider name" value={newRiderForm.name} onChange={(e) => setNewRiderForm({...newRiderForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-lime-400 placeholder-white/20 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Phone Number</label>
                <input type="tel" placeholder="98765 43210" value={newRiderForm.phone} onChange={(e) => setNewRiderForm({...newRiderForm, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-lime-400 placeholder-white/20 transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Status</label>
                <select value={newRiderForm.status} onChange={(e) => setNewRiderForm({...newRiderForm, status: e.target.value as 'active' | 'inactive'})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-lime-400 transition-all">
                  <option value="active" className="bg-[#111]">Active</option>
                  <option value="inactive" className="bg-[#111]">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">Assign Vehicle (Optional)</label>
                <select value={selectedVehicleForRider || ''} onChange={(e) => setSelectedVehicleForRider(e.target.value || null)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-white focus:border-lime-400 transition-all">
                  <option value="" className="bg-[#111]">-- Select a vehicle --</option>
                  {vehiclesData.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id} className="bg-[#111]">
                      {vehicle.name} {vehicle.available > 0 ? '✓ Available' : '✗ Not Available'}
                    </option>
                  ))}
                </select>
              </div>
              {selectedVehicleForRider && vehiclesData.find(v => v.id === selectedVehicleForRider) && (
                <div className={`p-3 rounded-xl border ${vehiclesData.find(v => v.id === selectedVehicleForRider)!.available > 0 ? 'bg-lime-400/10 border-lime-400/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><p className="text-white/60">Type</p><p className="font-bold text-white capitalize">{vehiclesData.find(v => v.id === selectedVehicleForRider)?.type}</p></div>
                    <div><p className="text-white/60">Location</p><p className="font-bold text-white">{vehiclesData.find(v => v.id === selectedVehicleForRider)?.location}</p></div>
                    <div><p className="text-white/60">Available</p><p className={`font-bold ${vehiclesData.find(v => v.id === selectedVehicleForRider)!.available > 0 ? 'text-lime-400' : 'text-red-400'}`}>{vehiclesData.find(v => v.id === selectedVehicleForRider)?.available} / {vehiclesData.find(v => v.id === selectedVehicleForRider)?.total}</p></div>
                    <div><p className="text-white/60">Price/Day</p><p className="font-bold text-white">₹{vehiclesData.find(v => v.id === selectedVehicleForRider)?.pricePerDay}</p></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsAddingRider(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors border border-white/10">Cancel</button>
              <button onClick={handleAddRider} className="flex-1 bg-lime-400 hover:bg-lime-500 text-black py-3 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(163,230,53,0.3)]">Add Rider</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Immersive EV Background Glow */}
      <motion.div className="absolute top-0 left-0 w-[500px] h-[500px] bg-lime-400/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" animate={{ x: [0, 50, 0], y: [0, 100, 0] }} transition={{ duration: 10, repeat: Infinity, repeatType: 'loop' }} />
      <motion.div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none" animate={{ x: [0, -50, 0], y: [0, -100, 0] }} transition={{ duration: 15, repeat: Infinity, repeatType: 'loop' }} />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/5 shadow-2xl md:shadow-none flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FiZap className="text-lime-400 fill-current" /> <span className="text-lime-400">flexigo</span>
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/50 hover:text-white text-2xl font-bold">✕</button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-lime-400/10 text-lime-400 border border-lime-400/20 shadow-[0_0_15px_rgba(163,230,53,0.1)]' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-lime-400' : 'text-white/40'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-full">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#111] border-b border-white/5 p-4 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-white/70 hover:bg-white/10 rounded-xl">
              <FiMenu size={24} />
            </button>
            <h1 className="text-lg font-black text-white flex items-center gap-1"><FiZap className="text-lime-400"/> Admin</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center font-black">F</div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Title for Desktop */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-white mb-2">
                  {navItems.find(n => n.id === activeTab)?.label} Dashboard
                </h1>
                <p className="text-white/50 font-medium text-sm">Monitor fleet operations, EV charging status, and rentals.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Super Franchise</p>
                  <p className="text-xs text-lime-400 font-medium tracking-wider">NETWORK HUB</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lime-400 text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(163,230,53,0.4)]">
                  F
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { icon: FiZap, label: 'EV Fleet Size', value: stats.totalVehicles, color: 'text-lime-400', bgIconColor: 'bg-lime-400/10 border-lime-400/20' },
                      { icon: FiUsers, label: 'Total Rentals', value: stats.totalBookings, color: 'text-blue-400', bgIconColor: 'bg-blue-400/10 border-blue-400/20' },
                      { icon: FiDollarSign, label: 'Income', value: `₹${(stats.revenue / 100000).toFixed(1)}L`, color: 'text-emerald-400', bgIconColor: 'bg-emerald-400/10 border-emerald-400/20' },
                      { icon: FiBarChart, label: 'Avg Rating', value: `${stats.avgRating} ⭐`, color: 'text-amber-400', bgIconColor: 'bg-amber-400/10 border-amber-400/20' },
                    ].map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className="bg-white/5 rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-2xl -mr-10 -mt-10 group-hover:bg-white/10 transition-all pointer-events-none" />
                          <div className="flex items-center justify-between relative z-10">
                            <div>
                              <p className="text-[10px] md:text-xs font-bold text-white/50 mb-1 uppercase tracking-wider">{stat.label}</p>
                              <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                            </div>
                            <div className={`p-3 md:p-4 rounded-2xl border ${stat.bgIconColor}`}>
                              <Icon size={24} className={`${stat.color}`} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'vehicles' && (
                  <>
                    {/* Filter Buttons */}
                    <div className="mb-8 flex gap-3 flex-wrap bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
                      {['all', 'bike', 'scooter', 'car'].map((type) => {
                        let label = type === 'all' ? 'All EVs' : type === 'bike' ? 'E-Bikes' : type === 'scooter' ? 'E-Scooters' : 'E-Cars';
                        return (
                          <button
                            key={type}
                            onClick={() => setFilterType(type as any)}
                            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 text-sm md:text-base border ${
                              filterType === type 
                                ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]' 
                                : 'bg-transparent text-white/60 border-transparent hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span>{label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Vehicles Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredVehicles.map((vehicle, index) => (
                        <div
                          key={vehicle.id}
                          className="group bg-white/5 rounded-[2rem] shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10 hover:border-lime-400/50 overflow-hidden cursor-pointer transition-all flex flex-col backdrop-blur-sm"
                          onClick={() => setSelectedVehicle(vehicle)}
                        >
                          <div className="h-48 overflow-hidden relative border-b border-white/5">
                            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            {vehicle.handicap && <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm">♿ Accessible</div>}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                              <div>
                                <span className="bg-lime-400/20 border border-lime-400/30 text-lime-400 px-3 py-1 rounded-full text-[10px] font-black uppercase inline-block mb-2 backdrop-blur-md">{vehicle.type}</span>
                                <h3 className="text-xl font-black text-white leading-tight truncate">{vehicle.name}</h3>
                              </div>
                              <span className="bg-black/50 border border-white/10 text-amber-400 backdrop-blur-md px-2 py-1 rounded-lg text-sm font-extrabold flex items-center gap-1">★ {vehicle.rating}</span>
                            </div>
                          </div>
                          <div className="p-5 flex-1 relative flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div><p className="text-[10px] text-white/40 font-bold uppercase mb-0.5">Price / Day</p><p className="text-lg font-black text-lime-400">₹{vehicle.pricePerDay}</p></div>
                              <div><p className="text-[10px] text-white/40 font-bold uppercase mb-0.5">Battery</p><p className="text-lg font-black text-emerald-400 flex items-center gap-1"><FiBatteryCharging/> {vehicle.batteryLevel}%</p></div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center mt-auto">
                              <p className="text-[10px] text-white/40 font-bold uppercase">Fleet ID: {vehicle.id}</p>
                              <div className="text-xs font-bold px-2 py-1 rounded text-white/80 bg-white/10">{vehicle.available} Available</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => setIsAddingVehicle(true)} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-lime-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.5)] hover:scale-105 transition-transform z-20"><FiPlus size={24} /></button>
                  </>
                )}

                {activeTab === 'riders' && (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-black text-white mb-1">Manage Riders</h2>
                      <p className="text-sm md:text-base text-white/60 font-semibold">Add new riders or manage existing ones.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {ridersData.map((rider) => {
                        const assignedVehicle = rider.assignedVehicleId ? vehiclesData.find(v => v.id === rider.assignedVehicleId) : null;
                        return (
                        <div key={rider.id} className="bg-white/5 rounded-[2rem] p-6 shadow-sm border border-white/10 hover:border-lime-400/50 transition-all text-center backdrop-blur-sm group relative">
                          <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-lime-400 to-emerald-500 text-black flex items-center justify-center text-3xl font-black mb-4 shadow-lg border-2 border-lime-400 group-hover:scale-110 transition-transform">{rider.name.charAt(0)}</div>
                          <h3 className="font-black text-xl text-white mb-1">{rider.name}</h3>
                          <p className="text-sm font-bold text-white/50 mb-4">+91 {rider.phone}</p>
                          <div className="bg-black/30 border border-white/5 rounded-2xl p-4 text-left grid grid-cols-2 gap-y-3 mb-4">
                            <div><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Rides</p><p className="font-black text-lime-400 text-lg">{rider.totalRides}</p></div>
                            <div><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Status</p><p className={`font-black uppercase tracking-wider text-[10px] py-1 px-2 inline-block rounded-full mt-1 ${rider.status === 'active' ? 'bg-lime-400/20 text-lime-400 border border-lime-400/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>{rider.status}</p></div>
                          </div>
                          {assignedVehicle && (
                            <div className={`p-3 rounded-xl mb-3 border text-left text-xs ${assignedVehicle.available > 0 ? 'bg-lime-400/10 border-lime-400/30' : 'bg-red-500/10 border-red-500/30'}`}>
                              <p className="text-white/60 font-bold mb-2">Assigned Vehicle:</p>
                              <p className="font-black text-white mb-1">{assignedVehicle.name}</p>
                              <div className="grid grid-cols-2 gap-1">
                                <div><p className="text-white/60">Type</p><p className="font-bold text-white capitalize">{assignedVehicle.type}</p></div>
                                <div><p className="text-white/60">Avail</p><p className={`font-bold ${assignedVehicle.available > 0 ? 'text-lime-400' : 'text-red-400'}`}>{assignedVehicle.available}/{assignedVehicle.total}</p></div>
                              </div>
                            </div>
                          )}
                          <button onClick={() => handleDeleteRider(rider.id)} className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg font-bold text-xs border border-red-500/30 transition-colors flex items-center justify-center gap-2">
                            <FiTrash2 size={16} /> Delete Rider
                          </button>
                        </div>
                        );
                      })}
                    </div>
                    <button onClick={() => setIsAddingRider(true)} className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-lime-400 text-black p-4 rounded-full shadow-[0_0_20px_rgba(163,230,53,0.5)] hover:scale-105 transition-transform z-20"><FiPlus size={24} /></button>
                  </>
                )}

                {activeTab === 'map' && (
                  <div className="bg-white/5 rounded-[2rem] shadow-sm border border-white/10 overflow-hidden h-[60vh] md:h-[70vh] min-h-[400px]">
                    <MapContainer center={[28.7041, 77.1025]} zoom={15} style={{ width: '100%', height: '100%' }}>
                      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution='&copy; OpenStreetMap' />
                      {vehiclesData.map((v) => {
                        const lat = 28.7041 + ((v.coords?.y || 50) - 50) * 0.01;
                        const lng = 77.1025 + ((v.coords?.x || 50) - 50) * 0.01;
                        const customIcon = L.divIcon({ html: `<div class="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.5)] border-2 border-lime-400 overflow-hidden text-lime-400 p-2"><img src="${v.image}" class="w-full h-full object-cover rounded-full mix-blend-screen" /></div>`, iconSize: [48, 48], className: 'custom-icon'});
                        return (
                          <Marker key={v.id} position={[lat, lng]} icon={customIcon}>
                            <Popup>
                              <div className="text-gray-900 border-none"><p className="font-extrabold mb-1">{v.name}</p><p className="text-[10px] font-bold text-gray-500 uppercase">{v.type}</p></div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </MapContainer>
                  </div>
                )}

                {activeTab === 'vehicle-status' && (
                  <div className="space-y-4">
                    <div className="mb-6">
                      <h2 className="text-2xl md:text-3xl font-black text-white mb-1">Vehicle Status</h2>
                      <p className="text-sm md:text-base text-white/60 font-semibold">Real-time battery level, range, and availability status for all vehicles.</p>
                    </div>

                    {/* Vehicle Status Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {vehiclesData.map((vehicle) => (
                        <div key={vehicle.id} className="bg-white/5 border border-white/10 hover:border-lime-400/50 rounded-3xl p-6 shadow-sm transition-all backdrop-blur-sm relative overflow-hidden group">
                          <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full filter blur-2xl group-hover:bg-lime-400/10 pointer-events-none transition-colors" />
                          
                          {/* Header */}
                          <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                              <h3 className="text-lg md:text-xl font-black text-white">{vehicle.name}</h3>
                              <p className="text-xs md:text-sm text-white/50 font-bold mt-1">{vehicle.location}</p>
                            </div>
                            <span className="bg-lime-400/20 border border-lime-400/30 text-lime-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">{vehicle.type}</span>
                          </div>

                          {/* Battery Level */}
                          <div className="mb-4 relative z-10">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Battery Level</p>
                              <p className="text-sm font-black text-white">{(vehicle.batteryLevel ?? 0)}%</p>
                            </div>
                            <div className="w-full bg-white/10 border border-white/10 rounded-full h-2 overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-300 ${
                                (vehicle.batteryLevel ?? 0) >= 80 ? 'bg-lime-400' :
                                (vehicle.batteryLevel ?? 0) >= 50 ? 'bg-amber-400' :
                                (vehicle.batteryLevel ?? 0) >= 20 ? 'bg-orange-400' : 'bg-red-500'
                              }`} style={{ width: `${(vehicle.batteryLevel ?? 0)}%` }} />
                            </div>
                          </div>

                          {/* Range and Availability */}
                          <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Range</p>
                              <p className="text-base font-black text-emerald-400 flex items-center gap-1">
                                <span>≈</span> {(vehicle.range ?? 0)} km
                              </p>
                            </div>
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Available</p>
                              <p className="text-base font-black text-blue-400">{vehicle.available}/{vehicle.total}</p>
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-3 relative z-10">
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Bookings</p>
                              <p className="text-base font-black text-white">{vehicle.bookings}</p>
                            </div>
                            <div className="bg-black/50 border border-white/10 rounded-2xl p-3">
                              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Charge Port</p>
                              <p className="text-xs font-black text-white/80">{(vehicle.chargePort ?? 'N/A')}</p>
                            </div>
                          </div>

                          {/* Fleet ID */}
                          <p className="text-[10px] font-bold text-white/30 uppercase mt-4 text-right relative z-10">ID: {vehicle.id}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {payments.map((payment) => (
                      <div key={payment.id} className="bg-white/5 border border-white/10 hover:border-lime-400/50 rounded-3xl p-5 shadow-sm transition-all cursor-pointer backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full filter blur-xl group-hover:bg-lime-400/10 pointer-events-none transition-colors" />
                        <div className="flex justify-between items-start mb-4 relative z-10">
                          <div className={`p-3 rounded-2xl border ${
                            payment.status === 'completed' ? 'bg-lime-400/10 text-lime-400 border-lime-400/20' :
                            payment.status === 'pending' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            <FiDollarSign size={20} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider border ${
                            payment.status === 'completed' ? 'bg-lime-400/10 text-lime-400 border-lime-400/30' :
                            payment.status === 'pending' ? 'bg-amber-400/10 text-amber-400 border-amber-400/30' : 'bg-red-500/10 text-red-500 border-red-500/30'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-1 relative z-10">₹{payment.amount}</h3>
                        <p className="text-sm font-bold text-white/50 mb-4 relative z-10">{payment.riderName}</p>
                        
                        <div className="grid grid-cols-2 gap-2 bg-black/30 border border-white/5 p-3 rounded-2xl mb-1 relative z-10">
                          <div>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Method</p>
                            <p className="text-xs font-black text-white/80">{payment.method}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-0.5">Date</p>
                            <p className="text-xs font-bold text-white/80">{payment.date}</p>
                          </div>
                        </div>
                        <p className="text-[10px] font-bold text-white/30 uppercase mt-2 text-right relative z-10">ID: {payment.id}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modern EV Modal Details */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 z-[60]" onClick={() => { setSelectedVehicle(null); setIsEditingVehicle(false); }}>
          <motion.div className="bg-[#111] border border-white/10 rounded-[2rem] p-5 md:p-8 max-h-[95vh] overflow-y-auto w-[95vw] md:w-full max-w-sm md:max-w-2xl text-white shadow-2xl flex flex-col" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            
            <div className="flex justify-between items-start mb-4 md:mb-6 shrink-0 z-10 relative">
              <div className="flex-1 pr-4">
                {isEditingVehicle ? (
                  <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full text-xl md:text-3xl font-black mb-2 border-b-2 border-lime-400 bg-black/50 px-3 py-2 rounded-lg text-white outline-none focus:bg-white/5" />
                ) : (
                  <h2 className="text-2xl md:text-4xl font-black mb-2 break-words text-white">{selectedVehicle.name}</h2>
                )}
                <div className="flex gap-2">
                  <span className="bg-lime-400/20 border border-lime-400/30 text-lime-400 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest">{selectedVehicle.type}</span>
                </div>
              </div>
              <button onClick={() => { setSelectedVehicle(null); setIsEditingVehicle(false); }} className="text-white/40 hover:text-white text-xl font-bold bg-white/5 hover:bg-white/10 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm shrink-0">✕</button>
            </div>

            {/* EV Modal Image */}
            <div className="w-full h-48 md:h-64 mb-6 md:mb-8 rounded-3xl overflow-hidden relative border border-white/10 shrink-0">
               <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent pointer-events-none" />
               <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white font-bold text-sm tracking-widest uppercase">ID: {selectedVehicle.id}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 flex justify-center items-center gap-1"><FiDollarSign/> Price/Day</p>
                {isEditingVehicle ? (
                  <div className="flex justify-center items-center">
                    <span className="text-xl md:text-2xl font-black text-lime-400 mr-1">₹</span>
                    <input type="number" value={editForm.pricePerDay || ''} onChange={e => setEditForm({...editForm, pricePerDay: Number(e.target.value)})} className="w-16 md:w-20 text-xl md:text-2xl font-black text-lime-400 border-b border-lime-400/50 bg-transparent text-center focus:outline-none focus:bg-white/5 rounded" />
                  </div>
                ) : (
                  <p className="text-xl md:text-2xl font-black text-lime-400">₹{selectedVehicle.pricePerDay}</p>
                )}
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 flex justify-center items-center gap-1"><FiEdit2 size={10}/> Stock Info</p>
                {isEditingVehicle ? (
                  <input type="number" value={editForm.available || ''} onChange={e => setEditForm({...editForm, available: Number(e.target.value)})} className="w-16 text-xl md:text-2xl font-black text-white border-b border-white/30 bg-transparent text-center focus:outline-none focus:bg-white/5 rounded" />
                ) : (
                  <p className="text-xl md:text-2xl font-black text-white">{selectedVehicle.available} <span className="text-sm text-white/40 font-bold">/ {selectedVehicle.total}</span></p>
                )}
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Rating</p>
                <p className="text-xl md:text-2xl font-black text-amber-400 flex items-center justify-center gap-1">★ {selectedVehicle.rating}</p>
              </div>

              {/* Dedicated EV Features */}
              <div className="bg-lime-400/10 border border-lime-400/20 rounded-xl p-4 md:p-5 text-center shadow-[0_0_15px_rgba(163,230,53,0.05)]">
                <p className="text-[10px] font-bold text-lime-400 uppercase tracking-widest mb-1.5 flex justify-center items-center gap-1"><FiBatteryCharging className="animate-pulse"/> Battery</p>
                <p className="text-xl md:text-2xl font-black text-white w-full">{selectedVehicle.batteryLevel}%</p>
              </div>

              <div className="bg-blue-400/10 border border-blue-400/20 rounded-xl p-4 md:p-5 text-center">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex justify-center items-center gap-1"><FiZap/> EV Range</p>
                <p className="text-xl md:text-2xl font-black text-white">{selectedVehicle.range} km</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 text-center shadow-sm">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Bookings</p>
                <p className="text-xl md:text-2xl font-black text-purple-400">{selectedVehicle.bookings} trips</p>
              </div>
            </div>

            <div className="flex gap-3 shrink-0 mt-auto">
              {isEditingVehicle ? (
                <>
                  <button onClick={handleSaveVehicle} className="flex-1 bg-lime-400 hover:bg-lime-500 text-black py-4 rounded-xl font-extrabold text-sm md:text-base transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                    💾 Save Updates
                  </button>
                  <button onClick={() => setIsEditingVehicle(false)} className="px-6 border border-white/20 hover:bg-white/10 text-white py-4 rounded-xl font-extrabold text-sm md:text-base transition-all">
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => { setIsEditingVehicle(true); setEditForm(selectedVehicle); }} className="flex-1 bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-extrabold text-sm md:text-base transition-all shadow-md flex items-center justify-center gap-2">
                  <FiEdit2 /> Edit EV Fleet Details
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Modern Detail Rider Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-[60]" onClick={() => setSelectedRider(null)}>
          <motion.div className="bg-[#111] border border-white/10 rounded-[2rem] p-6 md:p-8 max-h-[90vh] overflow-y-auto max-w-sm w-full text-white shadow-2xl text-center" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-24 h-24 mx-auto bg-lime-400/20 text-lime-400 border-2 border-lime-400 rounded-full flex items-center justify-center font-black text-4xl mb-6 shadow-[0_0_20px_rgba(163,230,53,0.2)]">{selectedRider.name.charAt(0)}</div>
            <h2 className="text-2xl md:text-3xl font-black mb-1">{selectedRider.name}</h2>
            <p className="text-[10px] text-white/40 font-bold uppercase mb-6 tracking-widest">Global Rider ID: {selectedRider.id}</p>
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-4 text-left">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Registered Phone</p>
              <p className="text-xl font-black text-white tracking-widest">+91 {selectedRider.phone}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-left"><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Total EV Rides</p><p className="text-2xl font-black text-lime-400">{selectedRider.totalRides}</p></div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-left"><p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</p><p className={`text-sm font-black uppercase mt-1 px-3 py-1 inline-block rounded-lg border tracking-wider ${selectedRider.status === 'active' ? 'text-lime-400 bg-lime-400/10 border-lime-400/30' : 'text-red-500 bg-red-500/10 border-red-500/30'}`}>{selectedRider.status}</p></div>
            </div>
            <button onClick={() => setSelectedRider(null)} className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-xl font-extrabold text-sm md:text-base transition-colors">Close Profile</button>
          </motion.div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddingVehicle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-1 sm:p-2 z-[60] overflow-hidden" onClick={() => setIsAddingVehicle(false)}>
          <motion.div className="bg-[#111] border border-white/10 rounded-2xl p-1.5 sm:p-3 md:p-4 w-[95vw] sm:w-[90vw] md:w-full md:max-w-lg max-h-[90vh] text-white shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            
            <div className="flex justify-between items-start mb-1.5 sm:mb-2 md:mb-3 shrink-0 z-10 relative">
              <h2 className="text-sm sm:text-lg md:text-2xl font-black text-white">Add New Vehicle</h2>
              <button onClick={() => setIsAddingVehicle(false)} className="text-white/40 hover:text-white text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center transition-colors shadow-sm shrink-0 ml-2">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 pr-1">
              {/* Vehicle Name */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Vehicle Name *</label>
                <input 
                  type="text" 
                  value={newVehicleForm.name || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, name: e.target.value})} 
                  placeholder="e.g., Tesla Model 3"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Vehicle Type - Custom Dropdown */}
              <div className="md:col-span-1 relative z-20">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Type *</label>
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all text-left flex justify-between items-center"
                >
                  <span className="capitalize">{newVehicleForm.type || 'bike'}</span>
                  <span className={`text-xs transition-transform ${isTypeDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isTypeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-black/80 border border-white/20 rounded-lg overflow-hidden z-30">
                    {['bike', 'scooter', 'car'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setNewVehicleForm({...newVehicleForm, type: option as 'bike' | 'scooter' | 'car'});
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base capitalize transition-colors ${
                          newVehicleForm.type === option
                            ? 'bg-lime-400/20 text-lime-400 border-l-2 border-lime-400'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Per Day */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Price Per Day (₹) *</label>
                <input 
                  type="number" 
                  value={newVehicleForm.pricePerDay || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, pricePerDay: Number(e.target.value)})} 
                  placeholder="0"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Location *</label>
                <input 
                  type="text" 
                  value={newVehicleForm.location || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, location: e.target.value})} 
                  placeholder="e.g., Downtown Station"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Image URL</label>
                <input 
                  type="text" 
                  value={newVehicleForm.image || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, image: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Available Units */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Available Units</label>
                <input 
                  type="number" 
                  value={newVehicleForm.available || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, available: Number(e.target.value)})} 
                  placeholder="0"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Total Units */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Total Units</label>
                <input 
                  type="number" 
                  value={newVehicleForm.total || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, total: Number(e.target.value)})} 
                  placeholder="0"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Battery Level */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Battery Level (%)</label>
                <input 
                  type="number" 
                  value={newVehicleForm.batteryLevel || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, batteryLevel: Number(e.target.value)})} 
                  placeholder="50"
                  min="0"
                  max="100"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Range */}
              <div className="md:col-span-1">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Range (km)</label>
                <input 
                  type="number" 
                  value={newVehicleForm.range || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, range: Number(e.target.value)})} 
                  placeholder="100"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>

              {/* Charge Port */}
              <div className="md:col-span-2">
                <label className="text-[8px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5 sm:mb-1 block">Charge Port</label>
                <input 
                  type="text" 
                  value={newVehicleForm.chargePort || ''} 
                  onChange={e => setNewVehicleForm({...newVehicleForm, chargePort: e.target.value})} 
                  placeholder="e.g., Type 2, CCS2, Standard"
                  className="w-full bg-black/50 border border-white/10 text-white text-sm sm:text-base px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl focus:outline-none focus:border-lime-400 focus:bg-white/5 transition-all placeholder:text-white/30"
                />
              </div>
            </div>
            </div>

            <div className="flex gap-1 sm:gap-2 shrink-0 mt-1.5 sm:mt-2 md:mt-3 pt-1.5 sm:pt-2 border-t border-white/10">
              <button 
                onClick={handleAddVehicle} 
                disabled={!newVehicleForm.name || !newVehicleForm.pricePerDay || !newVehicleForm.location}
                className="flex-1 bg-lime-400 hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed text-black py-1 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
              >
                ✓ Add
              </button>
              <button 
                onClick={() => setIsAddingVehicle(false)} 
                className="px-2.5 sm:px-4 border border-white/20 hover:bg-white/10 text-white py-1 sm:py-2 rounded-lg font-bold text-xs sm:text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
