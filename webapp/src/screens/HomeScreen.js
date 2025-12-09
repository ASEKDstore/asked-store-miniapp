import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useTelegram } from "@auth/useTelegram";
import { useNavigate } from "react-router-dom";
import { BannerCard } from "@components/BannerCard";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
function statusToText(status) {
    switch (status) {
        case "processing":
            return "обрабатывается";
        case "packing":
            return "собирается";
        case "delivery":
            return "доставляется";
        case "delivered":
            return "доставлен";
        default:
            return status;
    }
}
const HomeScreen = () => {
    const { user } = useTelegram();
    const navigate = useNavigate();
    const [lastOrder, setLastOrder] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [homeData, setHomeData] = useState(null);
    const [loadingHome, setLoadingHome] = useState(false);
    const [promoBanners, setPromoBanners] = useState([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    useEffect(() => {
        if (!user?.id) {
            return;
        }
        const fetchLastOrder = async () => {
            setLoadingOrder(true);
            try {
                const res = await fetch(`${API_BASE}/orders/last?telegramId=${user.id}`);
                const data = await res.json();
                setLastOrder(data);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoadingOrder(false);
            }
        };
        fetchLastOrder();
    }, [user?.id]);
    useEffect(() => {
        const fetchHome = async () => {
            setLoadingHome(true);
            try {
                const res = await fetch(`${API_BASE}/home`);
                const data = await res.json();
                setHomeData(data);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoadingHome(false);
            }
        };
        fetchHome();
    }, []);
    useEffect(() => {
        const fetchBanners = async () => {
            setLoadingBanners(true);
            try {
                const res = await fetch(`${API_BASE}/api/banners`);
                const data = await res.json();
                if (data?.ok && Array.isArray(data.banners)) {
                    setPromoBanners(data.banners.slice(0, 7)); // максимум 7 баннеров
                }
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoadingBanners(false);
            }
        };
        fetchBanners();
    }, []);
    const hasOrder = lastOrder && lastOrder.ok;
    const hasHome = homeData && homeData.ok;
    const topProducts = hasHome ? homeData.topProducts : [];
    const promos = hasHome ? homeData.promos : [];
    const gallery = hasHome ? homeData.gallery : [];
    const socials = hasHome ? homeData.socials : [];
    // Используем только новые промо-баннеры
    const banners = promoBanners;
    return (_jsxs("div", { className: "space-y-4 pb-16 px-4", children: [banners.length > 0 && (_jsx("div", { className: "mb-6 mt-2", children: _jsx("div", { className: "flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 pb-2 scroll-smooth", children: banners.map((b) => (_jsx("div", { className: "min-w-[90%] snap-center", children: _jsx(BannerCard, { banner: b }) }, b.id))) }) })), loadingOrder && (_jsx("section", { className: "asked-card px-4 py-3 text-[11px] screen-card-pop", children: _jsx("div", { className: "text-slate-400", children: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043A\u0430\u0437\u0430\u2026" }) })), !loadingOrder && hasOrder && lastOrder && lastOrder.ok && (_jsxs("section", { className: "asked-card px-4 py-3 text-[11px] screen-card-pop", children: [_jsx("div", { className: "text-[10px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0437\u0430\u043A\u0430\u0437" }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "text-sm font-semibold", children: ["\u0417\u0430\u043A\u0430\u0437 \u2116", lastOrder.order.number] }), _jsxs("span", { className: "text-[11px] text-slate-400", children: ["\u0421\u0442\u0430\u0442\u0443\u0441: ", statusToText(lastOrder.order.status)] })] }), _jsx("button", { className: "asked-tap px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px]", onClick: () => navigate("/cart"), children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })] })] })), _jsx("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-slate-500", children: "\u0432\u0438\u0442\u0440\u0438\u043D\u0430" }), _jsx("button", { className: "asked-tap w-full py-3 rounded-2xl bg-askedAccentSoft text-[13px] font-semibold", onClick: () => navigate("/catalog"), children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "\u0417\u0434\u0435\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u0432\u0441\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0435 \u0434\u0440\u043E\u043F\u044B, \u0431\u0430\u0437\u043E\u0432\u044B\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u0438 \u0442\u0435\u0441\u0442\u043E\u0432\u044B\u0435 \u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0438 \u043F\u043E\u0434 \u0431\u0443\u0434\u0443\u0449\u0438\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438." })] }) }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft", children: "\u0442\u043E\u043F \u0442\u043E\u0432\u0430\u0440\u044B" }), _jsx("button", { className: "text-[10px] text-slate-500 asked-tap", onClick: () => navigate("/catalog"), children: "\u0432\u0441\u0435" })] }), loadingHome && !topProducts.length ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0442\u043E\u043F\u2026" })) : (_jsxs("div", { className: "flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory", children: [topProducts.map((p) => (_jsx("button", { type: "button", className: "asked-tap snap-start min-w-[70%] max-w-[70%] md:min-w-[45%] md:max-w-[45%] text-left", onClick: () => navigate(p.to), children: _jsxs("div", { className: "catalog-card flex flex-col overflow-hidden card-pop", children: [_jsx("div", { className: "w-full aspect-square bg-slate-900/70 border-b border-slate-800 flex items-center justify-center text-[10px] text-slate-500", children: "IMG" }), _jsxs("div", { className: "px-3 py-2 flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between gap-1", children: [_jsx("div", { className: "text-[11px] font-medium text-slate-100 leading-tight line-clamp-2", children: p.name }), p.tag && (_jsx("span", { className: "text-[9px] uppercase tracking-[0.16em] text-askedAccentSoft", children: p.tag }))] }), _jsxs("div", { className: "mt-1 text-[12px] text-askedAccentSoft font-semibold", children: [p.price.toLocaleString("ru-RU"), " \u20BD"] })] })] }) }, p.id))), !loadingHome && !topProducts.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0422\u043E\u043F \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432." }))] }))] }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u0430\u043A\u0446\u0438\u0438 \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F" }), loadingHome && !promos.length ? (_jsx("p", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0430\u043A\u0446\u0438\u0438\u2026" })) : (_jsxs("ul", { className: "space-y-2 text-[11px] text-slate-300", children: [promos.map((promo) => (_jsxs("li", { className: "border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/60", children: [_jsx("div", { className: "font-semibold text-slate-50 text-[11px] mb-0.5", children: promo.title }), _jsx("div", { className: "text-[10px] text-slate-400", children: promo.text })] }, promo.id))), !loadingHome && !promos.length && (_jsx("li", { className: "text-[11px] text-slate-500", children: "\u0410\u043A\u0446\u0438\u0438 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u043E\u0437\u0436\u0435." }))] }))] }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: [_jsx("div", { className: "flex items-center justify-between mb-2", children: _jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft", children: "\u0433\u0430\u043B\u0435\u0440\u0435\u044F" }) }), loadingHome && !gallery.length ? (_jsx("p", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0433\u0430\u043B\u0435\u0440\u0435\u044E\u2026" })) : (_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [gallery.map((g) => (_jsxs("div", { className: "relative rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 h-20 flex items-end", children: [_jsx("img", { src: g.imageUrl, alt: g.label, className: "absolute inset-0 w-full h-full object-cover opacity-80" }), _jsx("div", { className: "relative w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 flex items-end", children: _jsx("span", { className: "text-[10px] text-slate-100 font-medium", children: g.label }) })] }, g.id))), !loadingHome && !gallery.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043F\u043E\u0437\u0436\u0435." }))] }))] }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop mb-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u0441\u043E\u0446\u0441\u0435\u0442\u0438" }), loadingHome && !socials.length ? (_jsx("p", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0441\u043E\u0446\u0441\u0435\u0442\u0438\u2026" })) : (_jsx("div", { className: "flex flex-col gap-2 text-[11px]", children: socials.map((s) => (_jsxs("button", { type: "button", className: "asked-tap w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 flex items-center justify-between px-3", children: [_jsx("span", { children: s.label }), _jsx("span", { className: "text-[10px] text-slate-500", children: s.handle })] }, s.id))) }))] })] }));
};
export default HomeScreen;
