import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandingPage } from './screens/shared/LandingPage';
import { LoginScreen } from './screens/shared/LoginScreen';
import { HomeScreen } from './screens/rider/HomeScreen';
import { RideScreen } from './screens/rider/RideScreen';
import { WalletScreen } from './screens/rider/WalletScreen';
import { VehicleRentalScreen } from './screens/rider/VehicleRentalScreen';
import { VehicleDetailScreen } from './screens/rider/VehicleDetailScreen';
import { SupportScreen } from './screens/rider/SupportScreen';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { FranchiseDashboard } from './screens/franchise/FranchiseDashboard';
import { ProfileScreen } from './screens/rider/ProfileScreen';
import { CartScreen } from './screens/rider/CartScreen';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Scroll window to top
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      
      // Scroll document element
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
        document.documentElement.scrollLeft = 0;
      }
      
      // Scroll body element
      if (document.body) {
        document.body.scrollTop = 0;
        document.body.scrollLeft = 0;
      }
    };

    // Scroll immediately on navigation
    scrollToTop();
    
    // Also scroll after a short delay to ensure DOM updates are complete
    const timer = setTimeout(() => {
      scrollToTop();
    }, 0);

    // Use requestAnimationFrame for next frame
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/ride" element={<RideScreen />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route path="/rentals" element={<VehicleRentalScreen />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleDetailScreen />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/franchise" element={<FranchiseDashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
