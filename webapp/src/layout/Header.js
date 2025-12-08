import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
const Header = ({ onMenuClick, user: userProp }) => {
    const { user } = useTelegram();
    const currentUser = user || userProp;
    return (_jsxs("header", { className: "\r\n        w-full\r\n        fixed top-0 left-0 z-50\r\n        flex items-center justify-between\r\n        px-4\r\n        h-[56px]\r\n        bg-[rgba(0,0,0,0.55)]\r\n        backdrop-blur-xl\r\n        border-b border-white/10\r\n      ", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx(LogoMark, {}), _jsxs("div", { className: "flex flex-col min-w-0", children: [_jsx("span", { className: "text-sm font-semibold truncate", children: currentUser?.first_name ?? "Гость" }), currentUser?.username && (_jsxs("span", { className: "text-[11px] text-white/50 truncate", children: ["@", currentUser.username] }))] })] }), _jsx("button", { type: "button", onClick: onMenuClick, className: "\r\n          flex items-center justify-center\r\n          w-10 h-10\r\n          rounded-full\r\n          bg-white/10 border border-white/10\r\n          hover:bg-white/20 transition active:scale-95\r\n        ", children: _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "block w-5 h-[2px] bg-white rounded-full" }), _jsx("span", { className: "block w-5 h-[2px] bg-white/70 rounded-full" }), _jsx("span", { className: "block w-5 h-[2px] bg-white rounded-full" })] }) })] }));
};
export default Header;
