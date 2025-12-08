import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const VipScreen = () => {
    const [code, setCode] = useState("AX7$Q2L@");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pass, setPass] = useState(null);
    const [drops, setDrops] = useState([]);
    const [activated, setActivated] = useState(false);
    const [cardFlipped, setCardFlipped] = useState(false);
    const handleSubmit = async () => {
        if (!code.trim() || loading)
            return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/limited/check`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (!data.ok) {
                setPass(null);
                setDrops([]);
                setActivated(false);
                setCardFlipped(false);
                setError(data.message || "Промокод не принят.");
            }
            else {
                setPass(data.pass);
                setDrops(data.drops || []);
                setActivated(true);
                setCardFlipped(true);
                setError(null);
            }
        }
        catch (e) {
            console.error(e);
            setError("Ошибка соединения с сервером. Проверь backend /limited/check.");
            setPass(null);
            setDrops([]);
            setActivated(false);
            setCardFlipped(false);
        }
        finally {
            setLoading(false);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };
    const tierLabel = (tier) => {
        switch (tier) {
            case "alpha":
                return "ALPHA";
            case "ghost":
                return "GHOST";
            default:
                return "CORE";
        }
    };
    return (_jsxs("div", { className: "space-y-4 pb-16", children: [_jsxs("section", { className: "asked-card px-4 py-4 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "limited access" }), _jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-stretch gap-4", children: [_jsxs("div", { className: "flex-1 space-y-2 text-[12px]", children: [_jsx("h1", { className: "text-[16px] font-semibold", children: "\u041B\u0438\u043C\u0438\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0446\u0438\u0444\u0440\u043E\u0432\u043E\u0439 \u043F\u0440\u043E\u043F\u0443\u0441\u043A ASKED" }), _jsx("p", { className: "text-[12px] text-slate-400", children: "\u0426\u0438\u0444\u0440\u043E\u0432\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u043C \u0434\u0440\u043E\u043F\u0430\u043C ASKED. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434, \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u0443\u0439\u0442\u0435 \"\u043C\u0430\u0433\u043D\u0438\u0442\u043D\u044B\u0439 \u043A\u043B\u044E\u0447\" \u0438 \u043F\u0435\u0440\u0435\u0432\u0435\u0440\u043D\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u0443, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u043F\u0443\u0441\u043A \u0438 \u0441\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0434\u0440\u043E\u043F\u044B." }), activated && pass && (_jsxs("div", { className: "mt-2 text-[11px] text-slate-400", children: ["\u041F\u0440\u043E\u043F\u0443\u0441\u043A \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D:", " ", _jsxs("span", { className: "text-askedAccentSoft font-semibold", children: [pass.cardId, " \u00B7 \u0441\u0435\u0440\u0438\u044F ", pass.series, " \u00B7 \u043F\u0430\u0440\u0442\u0438\u044F ", pass.batch] })] }))] }), _jsx("div", { className: "w-full md:w-[280px]", children: _jsxs("button", { type: "button", className: "asked-tap relative w-full aspect-[3/2] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 card-pop", onClick: () => {
                                        if (activated)
                                            setCardFlipped((v) => !v);
                                    }, children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.35),transparent_55%)]" }), _jsxs("div", { className: "relative w-full h-full px-4 py-3 flex flex-col justify-between text-left", children: [!cardFlipped && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] text-slate-300", children: [_jsx("span", { children: "ASKED / LIMITED" }), _jsx("span", { className: "px-2 py-0.5 rounded-full bg-askedAccentSoft/10 text-askedAccentSoft text-[10px]", children: "magnetic key" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-[11px] text-slate-400", children: "digital access pass" }), _jsx("div", { className: "text-[14px] font-semibold tracking-[0.24em] uppercase", children: "ASKED\u00B7LIM\u00B7XXX" }), _jsx("div", { className: "text-[10px] text-slate-500", children: "drop season \u00B7 2025 \u00B7 province / street / it" })] }), _jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-400", children: [_jsx("span", { children: "ID: ****-****-LIM-***" }), _jsx("span", { className: "text-slate-300", children: activated ? "tap to flip" : "введите ключ" })] })] })), cardFlipped && pass && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] text-slate-300", children: [_jsx("span", { children: "ASKED / LIMITED" }), _jsxs("span", { className: "px-2 py-0.5 rounded-full bg-askedAccentSoft/10 text-askedAccentSoft text-[10px]", children: [tierLabel(pass.tier), " ACCESS"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-[11px] text-slate-400", children: "digital pass for" }), _jsx("div", { className: "text-[14px] font-semibold uppercase", children: pass.ownerName || "limited holder" }), _jsxs("div", { className: "text-[10px] text-slate-400", children: ["ID: ", pass.cardId] }), _jsxs("div", { className: "text-[10px] text-slate-500", children: ["series ", pass.series, " \u00B7 batch ", pass.batch, " \u00B7 \u2116", pass.number] })] }), _jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-400", children: [_jsxs("span", { children: ["secret drops: ", drops.length || "—"] }), _jsx("span", { className: "text-slate-300", children: "tap to flip back" })] })] }))] })] }) })] })] }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u043A\u043B\u044E\u0447 \u0434\u043E\u0441\u0442\u0443\u043F\u0430" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-[12px] outline-none placeholder:text-slate-500", placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434 / \u043A\u043B\u044E\u0447 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", value: code, onChange: (e) => setCode(e.target.value), onKeyDown: handleKeyDown }), _jsx("button", { type: "button", className: "asked-tap px-4 py-2 rounded-xl bg-askedAccentSoft text-[12px] font-semibold disabled:opacity-60", onClick: handleSubmit, disabled: loading || !code.trim(), children: loading ? "Проверяем..." : "Ключ" })] }), error && (_jsx("div", { className: "text-[11px] text-red-400", children: error })), !error && activated && (_jsx("div", { className: "text-[11px] text-askedAccentSoft", children: "\u041A\u043B\u044E\u0447 \u043F\u0440\u0438\u043D\u044F\u0442. \u041A\u0430\u0440\u0442\u0430 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D\u0430, \u0441\u043C\u043E\u0442\u0440\u0438 \u043A\u0430\u0440\u0442\u0443 \u0438 \u0441\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0434\u0440\u043E\u043F\u044B \u043D\u0438\u0436\u0435." }))] })] }), _jsxs("section", { className: "asked-card px-4 py-3 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u043A\u0430\u043A \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C limited-\u043F\u0440\u043E\u043F\u0443\u0441\u043A" }), _jsxs("ul", { className: "text-[11px] text-slate-400 space-y-1 mb-3", children: [_jsx("li", { children: "\u0423\u0447\u0430\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0432 \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0445 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044F\u0445 ASKED." }), _jsx("li", { children: "\u041B\u043E\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u044B \u0438\u0437 \u0434\u0440\u043E\u043F\u043E\u0432, \u0438\u0432\u0435\u043D\u0442\u043E\u0432 \u0438 \u043A\u043E\u043B\u043B\u0430\u0431." }), _jsx("li", { children: "\u0411\u044B\u0442\u044C \u0447\u0430\u0441\u0442\u044C\u044E ASKED-\u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0430 (\u0447\u0430\u0442, \u043A\u0430\u043D\u0430\u043B, \u043E\u0444\u0444\u043B\u0430\u0439\u043D-\u0434\u0432\u0438\u0436)." })] }), _jsxs("div", { className: "mt-2 border-t border-slate-800/80 pt-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u0441\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0434\u0440\u043E\u043F\u044B" }), activated && drops.length > 0 ? (_jsx("ul", { className: "space-y-1 text-[11px] text-slate-300", children: drops.map((d) => (_jsxs("li", { className: "flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/60", children: [_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "font-medium", children: d.name }), _jsxs("span", { className: "text-[10px] text-slate-500", children: ["\u0443\u0440\u043E\u0432\u0435\u043D\u044C: ", d.level, " \u00B7 \u0441\u0442\u0430\u0442\u0443\u0441:", " ", d.status === "online" ? "доступен" : "скоро"] })] }), d.status === "online" && (_jsx("span", { className: "text-[10px] text-askedAccentSoft", children: "OPEN" })), d.status === "soon" && (_jsx("span", { className: "text-[10px] text-slate-500", children: "soon" }))] }, d.id))) })) : (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0421\u0435\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0434\u0440\u043E\u043F\u044B \u043E\u0442\u043A\u0440\u043E\u044E\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E limited-\u043A\u043E\u0434\u0430." }))] })] })] }));
};
export default VipScreen;
