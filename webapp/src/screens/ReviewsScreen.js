import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const initialReviews = [
    {
        id: "1",
        name: "ASKED Family",
        rating: 5,
        text: "Худи с .BOT — топ. Вживую выглядит ещё жирнее, чем на превью."
    },
    {
        id: "2",
        name: "dev.province",
        rating: 5,
        text: "Вайб улицы + IT — прям то, чего не хватало."
    }
];
const ReviewsScreen = ({ compact }) => {
    const [reviews, setReviews] = useState(initialReviews);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim())
            return;
        const r = {
            id: String(Date.now()),
            name: name.trim() || "Аноним",
            rating,
            text: text.trim()
        };
        setReviews((prev) => [r, ...prev]);
        setName("");
        setRating(5);
        setText("");
    };
    const list = compact ? reviews.slice(0, 2) : reviews;
    return (_jsxs("div", { className: "space-y-3", children: [!compact && (_jsxs("form", { onSubmit: handleSubmit, className: "asked-card px-3 py-3 flex flex-col gap-2 text-sm screen-card-pop", children: [_jsx("div", { className: "text-xs uppercase tracking-[0.16em] text-slate-500", children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0437\u044B\u0432" }), _jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none", placeholder: "\u0418\u043C\u044F (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)", value: name, onChange: (e) => setName(e.target.value) }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { className: "text-slate-400", children: "\u041E\u0446\u0435\u043D\u043A\u0430:" }), _jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => (_jsx("button", { type: "button", onClick: () => setRating(star), className: `asked-tap text-base ${star <= rating ? "text-yellow-400" : "text-slate-600"}`, children: "\u2605" }, star))) })] }), _jsx("textarea", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none min-h-[70px]", placeholder: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435, \u043A\u0430\u043A \u0432\u0430\u043C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E, \u043F\u043E\u0441\u0430\u0434\u043A\u0430, \u0432\u0430\u0439\u0431...", value: text, onChange: (e) => setText(e.target.value) }), _jsx("button", { type: "submit", className: "mt-1 asked-tap self-end px-3 py-1.5 text-[11px] rounded-xl bg-askedAccentSoft font-semibold", children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C" })] })), _jsx("div", { className: compact ? "space-y-2" : "space-y-2 pb-16", children: list.map((r) => (_jsxs("article", { className: "asked-card px-3 py-2 text-xs flex flex-col gap-1 card-pop", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium", children: r.name }), _jsx("span", { className: "text-[11px] text-yellow-400", children: "★".repeat(r.rating) })] }), _jsx("p", { className: "text-[11px] text-slate-300 whitespace-pre-line", children: r.text })] }, r.id))) })] }));
};
export default ReviewsScreen;
