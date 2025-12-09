import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
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
    const [banner, setBanner] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!slug)
            return;
        const fetchBanner = async () => {
            try {
                const res = await fetch(`${API_BASE}/banners/${slug}`);
                const data = await res.json();
                if (data?.ok && data.banner) {
                    setBanner(data.banner);
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, [slug]);
    useEffect(() => {
        if (!banner?.dateEnd)
            return;
        const tick = () => {
            setTimeLeft(getTimeDiff(banner.dateEnd));
        };
        tick();
        const id = setInterval(tick, 60000); // обновляем раз в минуту
        return () => clearInterval(id);
    }, [banner?.dateEnd]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-black text-white", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }));
    }
    if (!banner) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-black text-white", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-xl font-semibold mb-2", children: "\u0411\u0430\u043D\u043D\u0435\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" }), _jsx("p", { className: "text-sm text-white/60", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] }) }));
    }
    const expired = banner.dateEnd && !timeLeft;
    return (_jsxs("div", { className: "min-h-screen bg-black text-white", children: [_jsxs("div", { className: "relative w-full h-[260px] overflow-hidden rounded-b-3xl", children: [_jsx("img", { src: banner.imageUrl, alt: banner.title, className: "absolute inset-0 w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" }), _jsxs("div", { className: "absolute bottom-4 left-4 right-4 space-y-2", children: [_jsx("h1", { className: "text-2xl font-bold leading-tight", children: banner.title }), banner.subtitle && (_jsx("p", { className: "text-sm text-white/80", children: banner.subtitle }))] })] }), _jsxs("div", { className: "px-4 py-4 space-y-4", children: [banner.dateEnd && (_jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between", children: [_jsx("div", { className: "text-xs text-white/60 uppercase tracking-[0.2em]", children: "\u0414\u043E \u043A\u043E\u043D\u0446\u0430 \u0430\u043A\u0446\u0438\u0438" }), expired ? (_jsx("div", { className: "text-sm text-red-400 font-semibold", children: "\u0410\u043A\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0430\u0441\u044C" })) : timeLeft ? (_jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [_jsxs("span", { children: [timeLeft.days, "\u0434"] }), _jsxs("span", { children: [timeLeft.hours, "\u0447"] }), _jsxs("span", { children: [timeLeft.minutes, "\u043C"] })] })) : (_jsx("div", { className: "text-sm text-white/70", children: "\u0421\u043A\u043E\u0440\u043E \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F" }))] })), banner.description && (_jsx("div", { className: "rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80 leading-relaxed", children: banner.description })), _jsx("button", { type: "button", className: "w-full mt-2 py-3 rounded-full text-sm font-semibold shadow-lg text-white", style: { backgroundColor: banner.buttonColor || "#A855F7" }, children: banner.buttonText || "Участвовать" })] })] }));
};
export default PromoPage;
