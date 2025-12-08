import React from "react";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
import { useNavigate } from "react-router-dom";

type Props = {
  onMenuClick: () => void;
  user: any;
};

const Header: React.FC<Props> = ({ onMenuClick, user: userProp }) => {
  const { user } = useTelegram();
  const navigate = useNavigate();
  const currentUser = user || userProp;

  return (
    <header
      className="
        asked-header
        fixed top-0 left-0 z-50
        w-full
        flex items-center justify-between
        px-4 pr-3
        h-[56px]
        bg-[rgba(0,0,0,0.55)]
        backdrop-blur-xl
        border-b border-white/10
      "
    >
      {/* левая зона — клик по аккаунту */}
      <button
        type="button"
        onClick={() => navigate('/account')}
        className="flex items-center gap-3 min-w-0 active:scale-[0.98] transition-transform"
      >
        <LogoMark />

        <div className="flex flex-col min-w-0 text-left">
          <span className="text-sm font-semibold truncate">
            {currentUser?.first_name ?? "Гость ASKED"}
          </span>
          {currentUser?.username && (
            <span className="text-[11px] text-white/50 truncate">
              @{currentUser.username}
            </span>
          )}
        </div>
      </button>

      {/* правая зона — бургер, прижат к краю */}
      <button
        type="button"
        onClick={onMenuClick}
        className="
          group
          flex items-center justify-center
          w-10 h-10
          rounded-full
          bg-white/8
          border border-white/12
          hover:bg-white/16
          transition
          active:scale-95
        "
      >
        <div className="space-y-1.5">
          <span className="block w-5 h-[2px] rounded-full bg-white/90 group-hover:translate-y-[1px] group-hover:rotate-[3deg] transition-transform" />
          <span className="block w-5 h-[2px] rounded-full bg-white/70 group-hover:scale-x-75 transition-transform" />
          <span className="block w-5 h-[2px] rounded-full bg-white/90 group-hover:-translate-y-[1px] group-hover:-rotate-[3deg] transition-transform" />
        </div>
      </button>
    </header>
  );
};

export default Header;


