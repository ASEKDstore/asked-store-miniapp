import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const chips = [
    "INSIDE-74",
    "ACCESS-01",
    "DROP-02",
    "ASKED-93KJ",
    "INSIDE-91",
    "DROP-002",
    "ACCESS-91",
    "INSIDE-17",
    "ASKED-93K4",
    "DROP-01",
    "INSIDE-01",
    "ACCESS-02"
];
const chipLayout = [
    { top: "8%", left: "12%", delay: "0s", scale: 1 },
    { top: "5%", left: "55%", delay: "0.3s", scale: 1.1 },
    { top: "14%", left: "72%", delay: "0.6s", scale: 0.95 },
    { top: "19%", left: "28%", delay: "0.9s", scale: 1.05 },
    { top: "24%", left: "8%", delay: "1.1s", scale: 0.9 },
    { top: "27%", left: "63%", delay: "1.4s", scale: 1.15 },
    { top: "31%", left: "40%", delay: "1.7s", scale: 1 },
    { top: "34%", left: "78%", delay: "2s", scale: 0.9 },
    { top: "38%", left: "18%", delay: "2.3s", scale: 1.05 },
    { top: "42%", left: "52%", delay: "2.6s", scale: 1 },
    { top: "46%", left: "68%", delay: "2.9s", scale: 0.95 },
    { top: "50%", left: "30%", delay: "3.1s", scale: 1.1 }
];
const appVersion = import.meta.env.VITE_APP_VERSION ||
    window.__APP_VERSION__ ||
    "2.1.0";
const SplashScreen = () => {
    return (_jsxs("div", { className: "splash-root min-h-screen w-full bg-black text-slate-50 flex flex-col items-center justify-between relative overflow-hidden", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 splash-bg" }), _jsx("div", { className: "relative w-full flex-1 flex items-center justify-center", children: _jsx("div", { className: "relative w-full max-w-md h-[60vh]", children: chips.map((label, index) => {
                        const layout = chipLayout[index % chipLayout.length];
                        return (_jsx("div", { className: "glow-chip text-[10px] tracking-[0.16em] uppercase", style: {
                                top: layout.top,
                                left: layout.left,
                                animationDelay: layout.delay,
                                transform: `scale(${layout.scale})`
                            }, children: label }, label + index));
                    }) }) }), _jsxs("div", { className: "relative w-full max-w-md px-6 pb-10 flex flex-col items-center gap-4", children: [_jsx("div", { className: "text-[40px] md:text-[48px] font-semibold tracking-[0.28em] uppercase splash-logo-gradient", children: "ASKED" }), _jsx("div", { className: "w-full h-[2px] rounded-full overflow-hidden bg-slate-800/40", children: _jsx("div", { className: "h-full splash-progress-bar" }) }), _jsx("div", { className: "text-[11px] tracking-[0.25em] uppercase text-slate-400", children: "LOADING\u2026" }), _jsxs("div", { className: "mt-1 text-[10px] text-slate-500 text-center", children: ["v", appVersion, " \u00B7 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043E \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u0439 ASKED \u00B7 2025"] })] })] }));
};
export default SplashScreen;
