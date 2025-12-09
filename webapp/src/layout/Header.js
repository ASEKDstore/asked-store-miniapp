import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
import { useNavigate } from "react-router-dom";
const Header = ({ onMenuClick, user: userProp }) => {
    const { user } = useTelegram();
    const navigate = useNavigate();
    const currentUser = user || userProp;
    return (_jsxs("header", { className: "\n        asked-header\n        fixed top-0 left-0 z-50\n        w-full\n        flex items-center justify-between\n        px-4 pr-3\n        h-[56px]\n        bg-[rgba(0,0,0,0.55)]\n        backdrop-blur-xl\n        border-b border-white/10\n      ", children: [_jsxs("button", { type: "button", onClick: () => navigate('/account'), className: "flex items-center gap-3 min-w-0 active:scale-[0.98] transition-transform", children: [_jsx(LogoMark, {}), _jsxs("div", { className: "flex flex-col min-w-0 text-left", children: [_jsx("span", { className: "text-sm font-semibold truncate", children: currentUser?.first_name ?? "Гость ASKED" }), currentUser?.username && (_jsxs("span", { className: "text-[11px] text-white/50 truncate", children: ["@", currentUser.username] }))] })] }), _jsx("button", { type: "button", onClick: onMenuClick, className: "\n          group\n          flex items-center justify-center\n          w-10 h-10\n          rounded-full\n          bg-white/8\n          border border-white/12\n          hover:bg-white/16\n          transition\n          active:scale-95\n        ", children: _jsxs("div", { className: "space-y-1.5", children: [_jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/90 group-hover:translate-y-[1px] group-hover:rotate-[3deg] transition-transform" }), _jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/70 group-hover:scale-x-75 transition-transform" }), _jsx("span", { className: "block w-5 h-[2px] rounded-full bg-white/90 group-hover:-translate-y-[1px] group-hover:-rotate-[3deg] transition-transform" })] }) })] }));
};
export default Header;
