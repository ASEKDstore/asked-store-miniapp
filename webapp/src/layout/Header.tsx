import React from "react";
import { TelegramUser } from "@auth/useTelegram";

type Props = {
  onMenuClick: () => void;
  user: TelegramUser | null;
};

const Header: React.FC<Props> = ({ onMenuClick, user }) => {
  return (
    <header className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
          ASKED
        </span>
        <span className="text-lg font-semibold">Store</span>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-askedAccent to-askedAccentSoft flex items-center justify-center text-[10px] font-semibold">
              {user.first_name?.[0] || ""}
              {user.last_name?.[0] || ""}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-medium">
                {user.first_name || ""}
                {user.last_name ? ` ${user.last_name}` : ""}
              </span>
              {user.username && (
                <span className="text-[10px] text-slate-500">
                  @{user.username}
                </span>
              )}
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onMenuClick}
          className="asked-card asked-tap w-9 h-9 flex items-center justify-center border-slate-700/60"
        >
          <div className="space-y-[3px]">
            <span className="block w-4 h-[1px] bg-slate-200" />
            <span className="block w-3 h-[1px] bg-slate-400" />
            <span className="block w-2 h-[1px] bg-slate-500" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;


