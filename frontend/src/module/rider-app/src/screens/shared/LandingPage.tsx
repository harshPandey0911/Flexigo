import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiBatteryCharging, FiMapPin, FiShield } from 'react-icons/fi';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Zero Emissions", desc: "100% electric fleet helping reduce carbon footprints across the city.", icon: FiZap },
    { title: "Long Range EVs", desc: "Worry-free traveling with our high-capacity batteries and fast charging.", icon: FiBatteryCharging },
    { title: "City-Wide access", desc: "Pick up and drop vehicles seamlessly at hundreds of EV hubs.", icon: FiMapPin },
    { title: "Premium Safety", desc: "All our electric vehicles are equipped with top-tier safety standards.", icon: FiShield },
  ];

  return (
    <div className="min-h-screen w-full bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-16 text-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
        </div>

        {/* Navigation Bar */}
        <nav className="absolute top-0 left-0 w-full z-20 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-lime-400 group-hover:scale-110 transition-transform">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-lime-300 transition-colors">flexigo</span>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About EVs</a>
            <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</a>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate('/login')}
            className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-lime-400 transition-colors shadow-lg z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sign In
          </motion.button>
        </nav>

        {/* Hero Content (Responsive Flow) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-32">
          
          {/* Main Headline Area */}
          <div className="flex flex-col items-start gap-6 md:gap-8 max-w-2xl">
            {/* Fast Charge Badge */}
            <motion.div 
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-lime-400 p-1.5 rounded-full text-black shadow-[0_0_10px_rgba(163,230,53,0.5)]">
                <FiZap size={14} className="fill-current animate-pulse" />
              </div>
              <span className="text-sm font-medium text-white/95">Fast charge support</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[1.05] text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Tomorrow runs<br />on electricity
            </motion.h1>
          </div>

          {/* Subtitle & CTA area (Bottom right on desktop, under headline on mobile) */}
          <motion.div 
            className="flex flex-col items-start md:items-end gap-6 max-w-sm md:text-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-base md:text-lg text-white/80 leading-relaxed font-light">
              Discover a new era of mobility where innovation meets sustainability. Rent premium EVs instantly.
            </p>
            
            <button 
              onClick={() => navigate('/rentals')}
              className="flex items-center gap-2 px-8 py-4 bg-lime-400 text-black rounded-full font-bold hover:bg-lime-500 hover:scale-105 transition-all shadow-xl group"
            >
              Explore Fleet 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* ----------------- PLATFORM INFO SECTION ----------------- */}
      <section id="about" className="py-24 px-6 md:px-12 bg-white text-black">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div 
            className="text-center md:text-left mb-16 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[12px] font-black tracking-widest uppercase text-lime-600 mb-4">Why Flexigo?</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Switch to the cleanest, smartest way to move.</h3>
            <p className="text-gray-500 text-lg md:text-xl font-medium">Whether you need a quick scooter ride to the metro or a premium electric SUV for a weekend trip, we have exactly what you need.</p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                className="bg-gray-50 border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-lime-200 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-6 text-2xl text-black group-hover:bg-lime-400 transition-colors">
                  <feature.icon />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CALL TO ACTION SECTION ----------------- */}
      <section className="py-24 px-6 md:px-12 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[150px] opacity-20 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to experience the future of commute?
          </motion.h2>
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button onClick={() => navigate('/rentals')} className="px-8 py-4 bg-lime-400 text-black text-lg font-bold rounded-full hover:bg-lime-500 transition-colors shadow-xl">
              Book an EV Now
            </button>
            <button onClick={() => navigate('/login')} className="px-8 py-4 bg-transparent border-2 border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/10 transition-colors">
              Sign in to Account
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-black py-12 px-6 border-t border-white/10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <FiZap className="text-lime-400" size={20} />
            <span className="text-xl font-bold tracking-tight text-white">flexigo</span>
          </div>
          <p className="text-white/40 text-sm font-medium">© 2026 Flexigo EV Solutions. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};