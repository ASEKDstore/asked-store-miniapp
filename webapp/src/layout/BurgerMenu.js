import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const baseMenuItems = [
    { id: "about", label: "О нас", to: "/about" },
    { id: "certs", label: "Сертификаты", to: "/certs" },
    { id: "help", label: "Помощь", to: "/help" },
    { id: "team", label: "Хочу в команду", to: "/team" }
];
const BurgerMenu = ({ open, onClose, user }) => {
    const ownerId = import.meta.env.VITE_OWNER_TELEGRAM_ID;
    const isOwner = !!ownerId && user?.id && String(user.id) === String(ownerId);
    const hasAdmin = !!import.meta.env.VITE_ADMIN_TOKEN && isOwner;
    const links = hasAdmin
        ? [
            ...baseMenuItems,
            {
                id: "admin",
                label: "Admin",
                to: "/admin",
                accent: true
            }
        ]
        : baseMenuItems;
    const navigate = useNavigate();
    if (!open)
        return null;
    const handleClick = (to) => {
        navigate(to);
        onClose();
    };
    return (_jsxs("div", { className: "fixed inset-0 z-40", children: [_jsx("button", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose }), _jsxs("div", { className: "absolute inset-x-3 top-16 asked-card px-4 py-3 flex flex-col gap-2", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: "\u041C\u0435\u043D\u044E" }), _jsx("button", { className: "text-xs text-slate-400 asked-tap", onClick: onClose, children: "\u0437\u0430\u043A\u0440\u044B\u0442\u044C" })] }), links.map((item) => (_jsx("button", { className: `asked-tap flex items-center justify-between rounded-xl px-3 py-2 bg-slate-900/40 hover:bg-slate-800/50 text-sm ${item.accent ? "text-askedAccentSoft" : ""}`, onClick: () => handleClick(item.to), children: _jsx("span", { children: item.label }) }, item.id))), _jsx("p", { className: "mt-1 text-[10px] text-slate-500", children: "\u042D\u0442\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u044B \u043F\u043E\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u043A\u0430\u043A \u0441\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0431\u0435\u0437 backend. \u041F\u043E\u0437\u0436\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u043C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435." })] })] }));
};
export default BurgerMenu;
