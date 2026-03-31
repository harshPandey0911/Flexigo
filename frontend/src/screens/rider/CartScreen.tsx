import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiShoppingCart, FiLoader, FiCheckCircle } from 'react-icons/fi';

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
  handicap?: boolean;
}

interface RentalOption {
  duration: string;
  days: number;
  discount: number;
}

interface CartItem {
  vehicleId?: string;
  vehicle: Vehicle;
  duration: RentalOption;
  quantity?: number;
  totalPrice?: number;
  addedAt?: string;
}

export const CartScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('flexigo-cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('flexigo-cart', JSON.stringify(updatedCart));
  };

  const calculateRentalPrice = (vehicle: Vehicle, duration: RentalOption) => {
    let basePrice = vehicle.pricePerDay * duration.days;
    const durationDiscount = (basePrice * duration.discount) / 100;
    let priceAfterDuration = basePrice - durationDiscount;
    if (vehicle.handicap) {
      return priceAfterDuration * 0.5;
    }
    return priceAfterDuration;
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.totalPrice || calculateRentalPrice(item.vehicle, item.duration)),
    0
  );

  const handlePaymentSubmit = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        // Save to Ride History
        const existingHistory = JSON.parse(localStorage.getItem('flexigo-ride-history') || '[]');
        const newRides = cart.map(item => ({
          ...item,
          date: new Date().toISOString(),
          txId: Math.random().toString(36).substr(2, 9).toUpperCase()
        }));
        localStorage.setItem('flexigo-ride-history', JSON.stringify([...newRides, ...existingHistory]));

        setCart([]);
        localStorage.setItem('flexigo-cart', JSON.stringify([]));
        setShowPayment(false);
        setPaymentStatus('idle');
        navigate('/profile');
      }, 2000);
    }, 2000);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 text-black pb-20"
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="bg-white text-black p-4 md:p-6 sticky top-0 z-40 shadow-sm border-b border-gray-100"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex items-center justify-between gap-2">
          <button
            onClick={() => navigate('/rentals')}
            className="flex items-center gap-1 md:gap-2 px-3 py-2 md:px-4 md:py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg transition-colors font-semibold text-sm md:text-base whitespace-nowrap"
          >
            <FiArrowLeft className="text-lg md:text-xl" />
            <span>Back</span>
          </button>
          <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 truncate flex items-center gap-2">
            <FiShoppingCart className="text-lime-500" /> My Cart
          </h1>
          <div className="w-16 md:w-24" />
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiShoppingCart className="text-gray-300 text-6xl md:text-8xl mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8 text-center">Add vehicles to easily rent them here.</p>
            <button
              onClick={() => navigate('/rentals')}
              className="px-6 py-3 bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Browse Vehicles
            </button>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.vehicle.image} alt={item.vehicle.name} className="h-full object-contain p-2 drop-shadow-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-gray-900 text-lg md:text-xl truncate">{item.vehicle.name}</p>
                    <p className="text-sm font-semibold text-lime-600 mb-1">📅 {item.duration.duration}</p>
                    {item.quantity && <p className="text-xs text-gray-500 font-semibold mb-1">Qty: {item.quantity}</p>}
                    <p className="text-lime-600 font-extrabold text-lg">
                      ₹{(item.totalPrice || calculateRentalPrice(item.vehicle, item.duration)).toLocaleString()}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleRemoveFromCart(index)}
                    className="w-10 h-10 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-full flex items-center justify-center font-bold transition-all shrink-0"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 h-fit sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-extrabold text-gray-900 mb-6 border-b pb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 font-semibold">
                  <span>Subtotal</span>
                  <span className="text-gray-900">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-semibold">
                  <span>Tax (5%)</span>
                  <span className="text-gray-900">₹{Math.round(cartTotal * 0.05).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-extrabold text-gray-900 border-t border-gray-200 pt-4 mb-6">
                <span>Total</span>
                <span className="text-lime-600">₹{Math.round(cartTotal * 1.05).toLocaleString()}</span>
              </div>

              <motion.button
                onClick={() => setShowPayment(true)}
                className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Proceed to Checkout
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-br from-white via-lime-50 to-emerald-50 border-2 border-lime-300 rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-md w-full shadow-2xl relative max-h-[95vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            {paymentStatus === 'idle' && (
              <>
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">🔒 Secure Checkout</h2>
                  <button onClick={() => setShowPayment(false)} className="text-gray-600 hover:text-gray-800 text-2xl font-bold">✕</button>
                </div>
                
                <div className="bg-gradient-to-r from-lime-100 to-emerald-100 p-3 md:p-4 rounded-2xl mb-4 md:mb-6 border-2 border-lime-300">
                  <p className="text-xs md:text-sm text-gray-700 mb-1 font-semibold">Total Amount Payable</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-lime-600">₹{Math.round(cartTotal * 1.05).toLocaleString()}</p>
                </div>

                <div className="space-y-3 md:space-y-4 mb-5 md:mb-8">
                  <div className="border-2 border-lime-500 bg-gradient-to-r from-lime-50 to-emerald-50 rounded-xl p-4 cursor-pointer flex items-center gap-3 shadow-sm hover:shadow-lg transition-all">
                    <div className="w-8 h-8 rounded-full bg-lime-200 flex items-center justify-center font-bold text-lime-700">UPI</div>
                    <div>
                      <p className="font-extrabold text-gray-900">UPI / QR Code</p>
                      <p className="text-xs text-gray-600 font-semibold">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-gray-300 rounded-xl p-4 cursor-pointer hover:border-lime-400 transition-colors flex items-center gap-3 bg-white">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700">💳</div>
                    <div>
                      <p className="font-extrabold text-gray-900">Credit / Debit Card</p>
                      <p className="text-xs text-gray-600 font-semibold">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 md:p-4 rounded-2xl mb-4 md:mb-6 border-2 border-lime-200">
                   <p className="text-xs md:text-sm font-extrabold text-gray-800 mb-2">Simulate Payment Details</p>
                   <input type="text" placeholder="Enter UPI ID (e.g. user@okicici)" className="w-full px-3 py-2 md:px-4 md:py-2 rounded-lg border-2 border-lime-300 focus:outline-none focus:border-lime-500 mb-1 md:mb-2 font-semibold text-sm md:text-base" defaultValue="flexigo@fastpay" />
                </div>

                <motion.button
                  onClick={handlePaymentSubmit}
                  className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white font-extrabold py-3 md:py-4 rounded-xl text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ✅ Confirm & Pay
                </motion.button>
              </>
            )}

            {paymentStatus === 'processing' && (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="mb-6 text-6xl text-lime-500"
                >
                  <FiLoader />
                </motion.div>
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">Processing Payment...</h2>
                <p className="text-sm md:text-base text-gray-700 font-semibold">Please don't close this window.</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <motion.div 
                className="flex flex-col items-center justify-center py-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-6xl md:text-7xl text-lime-500 mb-6"
                >
                  <FiCheckCircle />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center">💚 Payment Successful!</h2>
                <p className="text-sm md:text-base text-gray-700 text-center font-semibold">Your rides are booked. Redirecting...</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
