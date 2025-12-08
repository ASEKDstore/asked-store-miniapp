import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
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
const App = () => {
    const { isReady } = useTelegram();
    const [showSplash, setShowSplash] = useState(true);
    useEffect(() => {
        if (!isReady)
            return;
        const timeout = setTimeout(() => setShowSplash(false), 1400);
        return () => clearTimeout(timeout);
    }, [isReady]);
    if (showSplash) {
        return _jsx(SplashScreen, {});
    }
    return (_jsx(CartProvider, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(RootLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomeScreen, {}) }), _jsx(Route, { path: "catalog", element: _jsx(CatalogScreen, {}) }), _jsx(Route, { path: "limited", element: _jsx(VipScreen, {}) }), _jsx(Route, { path: "cart", element: _jsx(CartScreen, {}) }), _jsx(Route, { path: "checkout", element: _jsx(CheckoutScreen, {}) }), _jsx(Route, { path: "reviews", element: _jsx(ReviewsScreen, {}) }), _jsx(Route, { path: "maintenance", element: _jsx(MaintenanceScreen, {}) }), _jsx(Route, { path: "about", element: _jsx(AboutScreen, {}) }), _jsx(Route, { path: "certs", element: _jsx(CertificatesScreen, {}) }), _jsx(Route, { path: "help", element: _jsx(HelpScreen, {}) }), _jsx(Route, { path: "team", element: _jsx(JoinTeamScreen, {}) }), _jsx(Route, { path: "admin", element: _jsx(AdminScreen, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundScreen, {}) })] }) }) }));
};
export default App;
