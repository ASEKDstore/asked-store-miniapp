import { jsx as _jsx } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const items = [
    { id: "home", label: "Главная", to: "/" },
    { id: "catalog", label: "Каталог", to: "/catalog" },
    { id: "limited", label: "Limited", to: "/limited" },
    { id: "cart", label: "Корзина", to: "/cart" }
];
const BottomNav = () => {
    return (_jsx("nav", { className: "fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)]", children: _jsx("div", { className: "mx-3 mb-3 asked-card px-3 py-2 flex items-center justify-between text-xs", children: items.map((item) => (_jsx(NavLink, { to: item.to, className: ({ isActive }) => [
                    "flex flex-col items-center flex-1 py-1 asked-tap",
                    isActive ? "text-slate-50" : "text-slate-500"
                ].join(" "), children: _jsx("span", { className: "text-[11px]", children: item.label }) }, item.id))) }) }));
};
export default BottomNav;
