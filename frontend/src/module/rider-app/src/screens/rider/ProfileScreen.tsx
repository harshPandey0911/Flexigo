import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiLogOut, FiActivity, FiMapPin, FiAward, FiArrowLeft } from 'react-icons/fi';

interface UserProfile {
  name: string;
  phone: string;
}

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showRideHistory, setShowRideHistory] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [rideHistory, setRideHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('flexigo-user');
    if (savedUser) {
      setProfile(JSON.parse(savedUser));
    } else {
      // If no profile, we can fallback or redirect to login. For now, just a dummy fallback
      setProfile({ name: 'Guest Rider', phone: 'N/A' });
    }

    const savedHistory = JSON.parse(localStorage.getItem('flexigo-ride-history') || '[]');
    setRideHistory(savedHistory);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('flexigo-user');
    navigate('/login');
  };

  const handleEditProfileClick = () => {
    if (profile) {
      setEditName(profile.name);
      setEditPhone(profile.phone);
      setShowEditProfile(true);
    }
  };

  const handleSaveProfile = () => {
    const updated = { name: editName, phone: editPhone };
    setProfile(updated);
    localStorage.setItem('flexigo-user', JSON.stringify(updated));
    setShowEditProfile(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (!profile) return null;

  // Extract initials for the avatar
  const initials = profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'FR';

  return (
    <div className="min-h-screen bg-gray-50 text-black pb-20 relative overflow-hidden font-sans">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-lime-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'loop' }}
      />
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop' }}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-lime-400 to-emerald-500 pt-12 pb-16 px-6 rounded-b-[2.5rem] shadow-md relative z-10 flex flex-col items-center">
        <button 
          onClick={() => navigate('/rentals')} 
          className="absolute top-6 left-6 text-white hover:bg-white/20 p-2 md:p-3 rounded-full transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="text-xl md:text-2xl" />
        </button>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="w-24 h-24 md:w-28 md:h-28 bg-white border-4 border-lime-200 rounded-full flex items-center justify-center text-3xl md:text-4xl font-extrabold shadow-lg text-emerald-600 mb-3 md:mb-4"
        >
          {initials}
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-extrabold text-white mb-1"
        >
          {profile.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-emerald-50 font-semibold flex items-center gap-2 text-sm md:text-base"
        >
          <FiPhone /> +91 {profile.phone}
        </motion.p>
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 md:px-6 -mt-10 relative z-20 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <motion.div variants={itemVariants} className="bg-white border-2 border-gray-100 rounded-3xl p-4 md:p-5 shadow-sm hover:border-lime-300 hover:shadow-md transition-all text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-lg md:text-xl">
              <FiActivity />
            </div>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider font-extrabold mb-1">Total Rides</p>
            <p className="text-xl md:text-2xl font-extrabold text-gray-900">{42 + rideHistory.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white border-2 border-gray-100 rounded-3xl p-4 md:p-5 shadow-sm hover:border-lime-300 hover:shadow-md transition-all text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-lg md:text-xl">
              <FiAward />
            </div>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider font-extrabold mb-1">Saved CO2</p>
            <p className="text-xl md:text-2xl font-extrabold text-gray-900">120 kg</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white border-2 border-gray-100 rounded-3xl p-4 md:p-5 shadow-sm hover:border-lime-300 hover:shadow-md transition-all text-center col-span-2 md:col-span-1">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-lime-50 text-lime-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3 text-lg md:text-xl font-bold">
              ₹
            </div>
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider font-extrabold mb-1">Wallet</p>
            <p className="text-xl md:text-2xl font-extrabold text-gray-900">₹1,450</p>
          </motion.div>
        </div>

        {/* Menu Items */}
        <motion.div variants={itemVariants} className="bg-white border-2 border-gray-100 rounded-3xl shadow-sm overflow-hidden mb-6 md:mb-8">
          <div onClick={handleEditProfileClick}>
            <MenuRow icon={<FiUser className="text-blue-500" />} title="Edit Profile" />
          </div>
          <div className="h-px bg-gray-100 mx-6" />
          <MenuRow icon={<FiMapPin className="text-orange-500" />} title="Saved Locations" />
          <div className="h-px bg-gray-100 mx-6" />
          <div onClick={() => setShowRideHistory(true)}>
            <MenuRow icon={<FiActivity className="text-lime-500" />} title="Ride History" />
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button 
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 font-extrabold py-3 md:py-4 rounded-2xl border-2 border-red-100 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 text-sm md:text-base shadow-sm"
        >
          <FiLogOut size={20} />
          Log Out
        </motion.button>
      </motion.div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white border-2 border-gray-100 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Edit Profile</h2>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">✕</button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-600 mb-1 leading-none">Full Name</label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-lime-500 bg-gray-50 font-bold text-gray-900 text-sm md:text-base outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-gray-600 mb-1 leading-none">Phone Number</label>
                <input 
                  type="tel" 
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-lime-500 bg-gray-50 font-bold text-gray-900 text-sm md:text-base outline-none transition-colors"
                />
              </div>
            </div>

            <motion.button
              onClick={handleSaveProfile}
              className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Ride History Modal */}
      {showRideHistory && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white border-2 border-gray-100 rounded-3xl p-5 md:p-6 max-w-lg w-full shadow-2xl relative overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh' }}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-2"><FiActivity className="text-lime-500" /> Ride History</h2>
              <button onClick={() => setShowRideHistory(false)} className="text-gray-400 hover:text-gray-700 text-2xl font-bold">✕</button>
            </div>
            
            <div className="overflow-y-auto pr-2 flex-col gap-4 flex-1 min-h-[50vh]">
              {rideHistory.length === 0 ? (
                <div className="text-center text-gray-400 py-16">
                  <FiActivity className="text-6xl mx-auto mb-4 opacity-30" />
                  <p className="font-extrabold text-lg text-gray-500 mb-1">No rides booked yet.</p>
                  <p className="text-sm font-semibold text-gray-400">Your booked rides will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rideHistory.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((ride, idx) => (
                    <div key={idx} className="border-2 border-gray-100 rounded-2xl p-4 bg-gray-50 hover:bg-white hover:border-lime-200 hover:shadow-md transition-all flex items-start gap-4">
                      <div className="text-4xl bg-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border border-gray-100 shrink-0 shadow-sm p-2">
                        <img src={ride.vehicle.image} alt="car" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-extrabold text-gray-900 text-base md:text-lg truncate pl-1">{ride.vehicle.name}</h3>
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-200">Paid</span>
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-500 mb-3 font-semibold space-x-1 md:space-x-2 pl-1">
                          <span>📅 {new Date(ride.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span>•</span>
                          <span className="text-lime-600 uppercase">{ride.duration.duration}</span>
                        </p>
                        <div className="flex justify-between items-center text-xs md:text-sm font-semibold pt-3 border-t border-gray-200">
                          <span className="text-gray-500 flex items-center gap-1 min-w-0 truncate"><FiMapPin className="shrink-0" /> <span className="truncate">{ride.vehicle.location}</span></span>
                          <span className="text-gray-900 font-extrabold text-base md:text-lg shrink-0">₹{Math.round((ride.vehicle.pricePerDay * ride.duration.days) * 1.05).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const MenuRow = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-gray-50 cursor-pointer transition-colors group">
    <div className="text-gray-400 text-xl group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-extrabold text-gray-800 text-sm md:text-base flex-1">{title}</span>
    <span className="text-gray-300 font-bold group-hover:text-lime-500 transition-colors">→</span>
  </div>
);
