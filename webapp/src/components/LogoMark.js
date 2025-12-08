import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LogoMark = ({ compact }) => {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-violet-500 shadow-[0_0_18px_rgba(56,189,248,0.6)]", children: _jsx("img", { src: "/asked-logo.svg", alt: "ASKED", className: "w-5 h-5 object-contain" }) }), !compact && (_jsxs("div", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[11px] uppercase tracking-[0.25em] text-white/40", children: "ASKED" }), _jsx("span", { className: "text-sm font-semibold text-white/90", children: "Store" })] }))] }));
};
