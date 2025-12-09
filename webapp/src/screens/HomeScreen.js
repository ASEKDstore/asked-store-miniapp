import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BannerCard } from "@components/BannerCard";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
// моковые баннеры на случай, если API ничего не отдаёт
const MOCK_BANNERS = [
    {
        id: "mock-1",
        slug: "night-drop-blue",
        title: "Ночной дроп с Синим",
        subtitle: "Худи, кепки и цифровые пропуска",
        imageUrl: "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
        buttonText: "Смотреть дроп",
        buttonColor: "#6366F1",
        description: "Тестовый дроп для демонстрации баннеров.",
        dateEnd: undefined,
        isActive: true,
    },
    {
        id: "mock-2",
        slug: "limited-pass",
        title: "Limited-доступ ASKED",
        subtitle: "Активируй пропуск и открой закрытые дропы",
        imageUrl: "https://images.pexels.com/photos/3738081/pexels-photo-3738081.jpeg",
        buttonText: "Открыть Limited",
        buttonColor: "#A855F7",
        description: "Лимитированный пропуск в закрытую часть ASKED.",
        dateEnd: undefined,
        isActive: true,
    },
];
const HomeScreen = () => {
    const [banners, setBanners] = useState(MOCK_BANNERS);
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/banners`);
                const json = await res.json();
                if (json.ok && Array.isArray(json.banners) && json.banners.length > 0) {
                    setBanners(json.banners);
                }
            }
            catch {
                // игнорируем — останутся моки
            }
        };
        load();
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-black text-white pb-24", children: [banners.length > 0 && (_jsxs("div", { className: "mt-2 mb-6 px-4", children: [_jsxs("div", { className: "flex justify-between items-baseline mb-3", children: [_jsx("span", { className: "text-[11px] tracking-[0.22em] uppercase text-white/50", children: "\u0411\u0430\u043D\u043D\u0435\u0440\u044B" }), _jsx("span", { className: "text-[11px] text-white/40", children: "\u0434\u043B\u044F \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u0435\u043D\u0438\u044F" })] }), _jsx("div", { className: "flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1", children: banners.map((b) => (_jsx("div", { className: "min-w-[90%] snap-center", children: _jsx(BannerCard, { banner: b }) }, b.id))) })] })), _jsxs("div", { className: "px-4", children: [_jsxs("div", { className: "mt-2 mb-4", children: [_jsx("div", { className: "text-[11px] tracking-[0.22em] uppercase text-white/50 mb-2", children: "\u0412\u0438\u0442\u0440\u0438\u043D\u0430" }), _jsx("div", { className: "rounded-3xl bg-white/5 border border-white/10 px-4 py-4 text-sm text-white/80", children: "\u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0442\u0432\u043E\u0439 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0431\u043B\u043E\u043A \"\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\", \u043B\u0438\u0431\u043E \u043F\u0435\u0440\u0435\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0430\u0440\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442, \u0435\u0441\u043B\u0438 \u043E\u043D \u0431\u044B\u043B." })] }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("div", { className: "text-[11px] tracking-[0.22em] uppercase text-white/50", children: "\u0422\u043E\u043F \u0442\u043E\u0432\u0430\u0440\u044B" }), _jsx("button", { className: "text-[11px] text-white/40", children: "\u0432\u0441\u0435" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 opacity-50 text-xs text-white/40", children: [_jsx("div", { className: "h-[140px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center", children: "IMG" }), _jsx("div", { className: "h-[140px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center", children: "IMG" })] })] })] })] }));
};
export default HomeScreen;
