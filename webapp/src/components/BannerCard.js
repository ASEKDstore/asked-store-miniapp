import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export const BannerCard = ({ banner }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/promo/${banner.slug}`);
    };
    return (_jsxs("div", { className: "relative w-full h-[220px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3b0764] via-[#4c1d95] to-[#7e22ce] shadow-xl active:scale-[0.99] transition-transform cursor-pointer", onClick: handleClick, children: [_jsx("img", { src: banner.imageUrl, alt: banner.title, className: "absolute inset-0 w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/10" }), _jsxs("div", { className: "relative h-full flex flex-col justify-between p-4", children: [_jsxs("div", { className: "space-y-1 max-w-[80%]", children: [_jsx("span", { className: "text-[11px] uppercase tracking-[0.22em] text-white/50", children: "ASKED DROP" }), _jsx("h2", { className: "text-xl font-bold leading-tight text-white", children: banner.title }), banner.subtitle && (_jsx("p", { className: "text-xs text-white/80", children: banner.subtitle }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { type: "button", className: "px-6 py-2 text-sm font-semibold rounded-full shadow-md bg-white text-black active:scale-95 transition", style: {
                                    backgroundColor: banner.buttonColor || "#A855F7",
                                    color: "#fff",
                                }, children: banner.buttonText || "Подробнее" }), _jsxs("div", { className: "flex flex-col items-end text-[10px] text-white/70", children: [_jsx("span", { className: "uppercase tracking-[0.18em]", children: "Limited" }), _jsx("span", { children: "\u043E\u0442 ASKED" })] })] })] })] }));
};
