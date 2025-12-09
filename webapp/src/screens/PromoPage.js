import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const getTimeDiff = (dateEnd) => {
    if (!dateEnd)
        return null;
    const target = new Date(dateEnd).getTime();
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0)
        return null;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return { days, hours, minutes };
};
const PromoPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    useEffect(() => {
        const load = async () => {
            if (!slug)
                return;
            try {
                const res = await fetch(`${API_BASE}/api/banners/${slug}`);
                const json = await res.json();
                if (json.ok && json.banner) {
                    setBanner(json.banner);
                }
                else {
                    // fallback: вернуться назад
                    navigate(-1);
                }
            }
            catch (e) {
                navigate(-1);
            }
        };
        load();
    }, [slug, navigate]);
    useEffect(() => {
        if (!banner?.dateEnd)
            return;
        const tick = () => {
            setTimeLeft(getTimeDiff(banner.dateEnd));
        };
        tick();
        const id = setInterval(tick, 60000);
        return () => clearInterval(id);
    }, [banner?.dateEnd]);
    if (!banner) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-black text-white", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026" }));
    }
    const expired = banner.dateEnd && !timeLeft;
    return (_jsxs("div", { className: "min-h-screen bg-black text-white", children: [_jsxs("div", { className: "relative w-full h-[260px] overflow-hidden rounded-b-3xl", children: [_jsx("img", { src: banner.imageUrl, alt: banner.title, className: "absolute inset-0 w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" }), _jsx("button", { type: "button", onClick: () => navigate(-1), className: "absolute top-4 left-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/80 text-lg", children: "\u2190" }), _jsxs("div", { className: "absolute bottom-4 left-4 right-4 space-y-2", children: [_jsx("h1", { className: "text-2xl font-bold leading-tight", children: banner.title }), banner.subtitle && (_jsx("p", { className: "text-sm text-white/80", children: banner.subtitle }))] })] }), _jsxs("div", { className: "px-4 py-4 space-y-4", children: [banner.dateEnd && (_jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.22em] text-white/50", children: "\u0414\u043E \u043A\u043E\u043D\u0446\u0430 \u0430\u043A\u0446\u0438\u0438" }), expired ? (_jsx("div", { className: "text-sm text-red-400 font-semibold", children: "\u0410\u043A\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0430\u0441\u044C" })) : timeLeft ? (_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsxs("span", { children: [timeLeft.days, "\u0434"] }), _jsxs("span", { children: [timeLeft.hours, "\u0447"] }), _jsxs("span", { children: [timeLeft.minutes, "\u043C"] })] })) : (_jsx("div", { className: "text-sm text-white/70", children: "\u0421\u043A\u043E\u0440\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F" }))] })), banner.description && (_jsx("div", { className: "rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80 leading-relaxed", children: banner.description })), _jsx("button", { type: "button", className: "w-full mt-2 py-3 rounded-full text-sm font-semibold shadow-lg bg-[#A855F7] active:scale-95 transition", children: banner.buttonText || "Участвовать" })] })] }));
};
export default PromoPage;
