import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
import { useNavigate } from "react-router-dom";
const Header = ({ onMenuClick, user: userProp }) => {
    const { user } = useTelegram();
    const navigate = useNavigate();
    const currentUser = user || userProp;
    return (_jsxs("header", { className: "\r\n        asked-header\r\n        fixed top-0 left-0 z-50\r\n        w-full\r\n        flex items-center justify-between\r\n        px-4 pr-3\r\n        h-[56px]\r\n        bg-[rgba(0,0,0,0.55)]\r\n        backdrop-blur-xl\r\n        border-b border-white/10\r\n      ", children: [_jsxs("button", { type: "button", onClick: () => navigate('/account'), className: "flex items-center gap-3 min-w-0 active:scale-[0.98] transition-transform", children: [_jsx(LogoMark, {}), _jsxs("div", { className: "flex flex-col min-w-0 text-left", children: [_jsx("span", { className: "text-sm font-semibold truncate", children: currentUser?.first_name ?? "Гость ASKED" }), currentUser?.username && (_jsxs("span", { className: "text-[11px] text-white/50 truncate", children: ["@", currentUser.username] }))] })] }), _jsx("button", { type: "button", onClick: onMenuClick, className: "\r\n          group\r\n          flex items-center justify-center\r\n          w-10 h-10\r\n          rounded-full\r\n          bg-white/8\r\n          border border-white/12\r\n          hover:bg-white/16\r\n          transition\r\n          active:scale-95\r\n        ", children: _jsxs("div", { className: "space-y-1.5", children: [_jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/90 group-hover:translate-y-[1px] group-hover:rotate-[3deg] transition-transform" }), _jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/70 group-hover:scale-x-75 transition-transform" }), _jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/90 group-hover:-translate-y-[1px] group-hover:-rotate-[3deg] transition-transform" })] }) })] }));
};
export default Header;
