import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "@auth/useTelegram";
import { CartProvider } from "@context/CartContext";
import RootLayout from "@layout/RootLayout";
import SplashScreen from "@layout/SplashScreen";
import HomeScreen from "@screens/HomeScreen";
import CatalogScreen from "@screens/CatalogScreen";
import VipScreen from "@screens/VipScreen";
import CartScreen from "@screens/CartScreen";
import ReviewsScreen from "@screens/ReviewsScreen";
import NotFoundScreen from "@screens/NotFoundScreen";
import MaintenanceScreen from "@screens/MaintenanceScreen";
import AboutScreen from "@screens/AboutScreen";
import CertificatesScreen from "@screens/CertificatesScreen";
import HelpScreen from "@screens/HelpScreen";
import JoinTeamScreen from "@screens/JoinTeamScreen";
import CheckoutScreen from "@screens/CheckoutScreen";
import AdminScreen from "@screens/AdminScreen";

const App: React.FC = () => {
  const { isReady } = useTelegram();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    const timeout = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(timeout);
  }, [isReady]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="catalog" element={<CatalogScreen />} />
          <Route path="limited" element={<VipScreen />} />
          <Route path="cart" element={<CartScreen />} />
          <Route path="checkout" element={<CheckoutScreen />} />
          <Route path="reviews" element={<ReviewsScreen />} />
          <Route path="maintenance" element={<MaintenanceScreen />} />

          {/* Новые страницы из бургер-меню */}
          <Route path="about" element={<AboutScreen />} />
          <Route path="certs" element={<CertificatesScreen />} />
          <Route path="help" element={<HelpScreen />} />
          <Route path="team" element={<JoinTeamScreen />} />

          <Route path="admin" element={<AdminScreen />} />

          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default App;
