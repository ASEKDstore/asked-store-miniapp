import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
const Header = ({ onMenuClick, user: userProp }) => {
    const { user } = useTelegram();
    const currentUser = user || userProp;
    return (_jsxs("header", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 bg-black/60 backdrop-blur-xl", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx(LogoMark, { compact: false }), _jsxs("div", { className: "flex flex-col min-w-0", children: [_jsx("span", { className: "text-xs font-semibold truncate", children: currentUser?.first_name ?? "Гость" }), currentUser?.username && (_jsxs("span", { className: "text-[11px] text-white/45 truncate", children: ["@", currentUser.username] }))] })] }), _jsxs("button", { type: "button", onClick: onMenuClick, className: "flex items-center justify-center w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 border border-white/10 transition-colors active:scale-95", children: [_jsx("span", { className: "sr-only", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E" }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("span", { className: "block w-4 h-[2px] rounded-full bg-white/85" }), _jsx("span", { className: "block w-4 h-[2px] rounded-full bg-white/60" }), _jsx("span", { className: "block w-4 h-[2px] rounded-full bg-white/85" })] })] })] }));
};
export default Header;
