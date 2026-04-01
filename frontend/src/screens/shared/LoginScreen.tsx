import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiUser, FiBriefcase, FiShield, FiArrowLeft } from 'react-icons/fi';

export const LoginScreen: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'role' | 'phone' | 'otp'>('role');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<'rider' | 'franchise' | 'admin' | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  const handleSendOtp = () => {
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (selectedRole === 'rider') {
      localStorage.setItem('flexigo-user', JSON.stringify({ name: name || 'Valued Rider', phone }));
      navigate('/rentals');
    } else if (selectedRole === 'franchise') {
      navigate('/franchise');
    } else if (selectedRole === 'admin') {
      navigate('/admin');
    }
  };

  const handleSelectRole = (role: 'rider' | 'franchise' | 'admin') => {
    setSelectedRole(role);
    setStep('phone');
  };

  const handleBackToRole = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
    } else {
      setStep('role');
      setPhone('');
      setName('');
      setOtp('');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden font-sans bg-[#0a0a0a]">
      {/* Immersive EV Background replacing old blobs */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-40 md:opacity-50"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop')`, // EV charging station mood
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-black/80" />
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo Header */}
        <motion.div className="flex justify-center mb-6" variants={logoVariants}>
          <button onClick={() => navigate('/')} className="w-20 h-20 bg-lime-400/20 border-2 border-lime-400 rounded-full shadow-[0_0_30px_rgba(163,230,53,0.3)] flex items-center justify-center hover:bg-lime-400/30 transition-all">
            <FiZap size={36} className="text-lime-400 fill-current" />
          </button>
        </motion.div>

        <motion.h1 className="text-3xl font-black text-white text-center mb-1 tracking-tight" variants={itemVariants}>
          Welcome to <span className="text-lime-400">flexigo</span>
        </motion.h1>
        <motion.p className="text-gray-400 text-center text-sm mb-8 font-medium" variants={itemVariants}>
          Sign in to unlock the electric fleet
        </motion.p>

        {/* Glass Card Container */}
        <motion.div
          className="bg-black/60 border border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden"
          variants={itemVariants}
        >
          {step === 'role' ? (
            <motion.div key="role" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <h2 className="text-xl font-bold text-white mb-1">Who are you?</h2>
              <p className="text-white/60 text-sm mb-6">Select your account type to continue</p>

              <div className="space-y-3">
                <button
                  onClick={() => handleSelectRole('rider')}
                  className="w-full p-4 border border-white/10 rounded-2xl hover:border-lime-400/50 hover:bg-white/5 transition-all duration-300 text-left group flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-lime-400/50 group-hover:bg-lime-400/10 transition-colors">
                    <FiUser size={20} className="text-white group-hover:text-lime-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Rider</h3>
                    <p className="text-white/50 text-xs mt-0.5">Book rides instantly</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRole('admin')}
                  className="w-full p-4 border border-white/10 rounded-2xl hover:border-purple-400/50 hover:bg-white/5 transition-all duration-300 text-left group flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-purple-400/50 group-hover:bg-purple-400/10 transition-colors">
                    <FiBriefcase size={20} className="text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Franchise</h3>
                    <p className="text-white/50 text-xs mt-0.5">Manage payments & operations</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRole('franchise')}
                  className="w-full p-4 border border-white/10 rounded-2xl hover:border-blue-400/50 hover:bg-white/5 transition-all duration-300 text-left group flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-blue-400/50 group-hover:bg-blue-400/10 transition-colors">
                    <FiShield size={20} className="text-white group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Admin</h3>
                    <p className="text-white/50 text-xs mt-0.5">Manage platform configurations</p>
                  </div>
                </button>
              </div>
            </motion.div>
          ) : step === 'phone' ? (
            <motion.div key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToRole} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors">
                  <FiArrowLeft size={16} />
                </button>
                <h2 className="text-xl font-bold text-white capitalize">
                  {selectedRole === 'admin' ? 'Franchise' : selectedRole === 'franchise' ? 'Admin' : 'Rider'} Login
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider ml-1 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none text-white focus:border-lime-400 placeholder-white/20 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider ml-1 mb-1 block">Mobile Number</label>
                  <div className="flex bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-lime-400 transition-all">
                    <span className="bg-white/5 px-4 py-3.5 font-bold text-white/70 border-r border-white/10">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                      className="flex-1 px-4 py-3.5 outline-none bg-transparent text-white placeholder-white/20 font-medium tracking-wider"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendOtp}
                disabled={phone.length < 10}
                className="w-full bg-lime-400 text-black font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
              >
                Send Secure Code →
              </button>
            </motion.div>
          ) : (
            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={handleBackToRole} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors">
                  <FiArrowLeft size={16} />
                </button>
                <h2 className="text-xl font-bold text-white">Verify Code</h2>
              </div>
              
              <p className="text-white/60 text-sm mb-6 text-center bg-white/5 rounded-xl py-3">
                Enter the code sent to <span className="text-white font-bold">+91 {phone}</span>
              </p>

              <div className="flex justify-between gap-2 mb-8">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpInputRefs.current[i] = el)}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ''}
                    autoFocus={i === 0}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newOtp = otp.split('');
                      newOtp[i] = value.slice(-1);
                      setOtp(newOtp.join(''));
                      if (value && i < 5) otpInputRefs.current[i + 1]?.focus();
                    }}
                    onFocus={(e) => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) otpInputRefs.current[i - 1]?.focus();
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
                      if (/^\d+$/.test(pastedData)) {
                        setOtp(pastedData);
                        const nextFocus = Math.min(pastedData.length, 5);
                        otpInputRefs.current[nextFocus]?.focus();
                      }
                    }}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-black border border-white/20 hover:border-white/40 rounded-xl bg-white/5 text-white focus:border-lime-400 focus:bg-lime-400/5 outline-none p-0 transition-all"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={otp.length < 6}
                className="w-full bg-lime-400 text-black font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
              >
                Authenticate & Login
              </button>

              <p className="text-center text-white/50 text-xs mt-6 font-medium">
                Didn't receive the code? <button className="text-lime-400 hover:text-lime-300 ml-1 font-bold">Resend in 30s</button>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Minimal Footer */}
        <motion.p className="text-white/40 text-center text-[10px] mt-8 uppercase tracking-widest font-bold" variants={itemVariants}>
          Secured by Flexigo EV Network
        </motion.p>
      </motion.div>
    </div>
  );
};
