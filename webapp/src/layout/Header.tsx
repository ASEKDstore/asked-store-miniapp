import React from "react";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";

type Props = {
  onMenuClick: () => void;
  user: any;
};

const Header: React.FC<Props> = ({ onMenuClick, user: userProp }) => {
  const { user } = useTelegram();
  const currentUser = user || userProp;

  return (
    <header
      className="
        w-full
        fixed top-0 left-0 z-50
        flex items-center justify-between
        px-4
        h-[56px]
        bg-[rgba(0,0,0,0.55)]
        backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* левая часть – лого + имя */}
      <div className="flex items-center gap-3 min-w-0">
        <LogoMark />

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold truncate">
            {currentUser?.first_name ?? "Гость"}
          </span>
          {currentUser?.username && (
            <span className="text-[11px] text-white/50 truncate">
              @{currentUser.username}
            </span>
          )}
        </div>
      </div>

      {/* правая часть – бургер */}
      <button
        type="button"
        onClick={onMenuClick}
        className="
          flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-white/10 border border-white/10
          hover:bg-white/20 transition active:scale-95
        "
      >
        <div className="space-y-1">
          <span className="block w-5 h-[2px] bg-white rounded-full"></span>
          <span className="block w-5 h-[2px] bg-white/70 rounded-full"></span>
          <span className="block w-5 h-[2px] bg-white rounded-full"></span>
        </div>
      </button>
    </header>
  );
};

export default Header;


