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
    <header className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <LogoMark compact={false} />

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold truncate">
            {currentUser?.first_name ?? "Гость"}
          </span>
          {currentUser?.username && (
            <span className="text-[11px] text-white/45 truncate">
              @{currentUser.username}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onMenuClick}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 border border-white/10 transition-colors active:scale-95"
      >
        <span className="sr-only">Открыть меню</span>
        <div className="space-y-1.5">
          <span className="block w-4 h-[2px] rounded-full bg-white/85" />
          <span className="block w-4 h-[2px] rounded-full bg-white/60" />
          <span className="block w-4 h-[2px] rounded-full bg-white/85" />
        </div>
      </button>
    </header>
  );
};

export default Header;


