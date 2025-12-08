import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BurgerMenu from "./BurgerMenu";
import BottomNav from "./BottomNav";
import TelegramBackSync from "./TelegramBackSync";
import { useTelegram } from "@auth/useTelegram";
const RootLayout = () => {
    const { isTelegram, user } = useTelegram();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const ownerId = import.meta.env.VITE_OWNER_TELEGRAM_ID;
    const isOwner = !!ownerId && user?.id && String(user.id) === String(ownerId);
    const hasAdmin = !!import.meta.env.VITE_ADMIN_TOKEN && isOwner;
    // Если мы не внутри Telegram — показываем stub
    if (!isTelegram) {
        return (_jsx("div", { className: "tg-fallback-root", children: _jsxs("div", { className: "tg-fallback-card", children: [_jsx("div", { className: "tg-fallback-title", children: "ASKED Store" }), _jsx("p", { className: "tg-fallback-text", children: "\u042D\u0442\u043E\u0442 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043D \u043D\u0430 \u0437\u0430\u043F\u0443\u0441\u043A \u043A\u0430\u043A Telegram Mini App." }), _jsx("p", { className: "tg-fallback-text", children: "\u041E\u0442\u043A\u0440\u043E\u0439 \u0431\u043E\u0442\u0430 ASKED \u0432 Telegram \u0438 \u0437\u0430\u043F\u0443\u0441\u0442\u0438 \u043C\u0430\u0433\u0430\u0437\u0438\u043D \u0438\u0437 \u0447\u0430\u0442\u0430." })] }) }));
    }
    return (_jsxs("div", { className: "app-root-safe", children: [_jsx(TelegramBackSync, {}), _jsx("header", { className: "app-header", children: _jsx(Header, { onMenuClick: () => setMenuOpen(true), user: user }) }), _jsx("main", { className: "app-main", children: _jsx("div", { className: "screen-fade-in", children: _jsx(Outlet, {}) }, location.pathname) }), _jsx(BottomNav, {}), _jsx(BurgerMenu, { open: menuOpen, onClose: () => setMenuOpen(false), user: user })] }));
};
export default RootLayout;
