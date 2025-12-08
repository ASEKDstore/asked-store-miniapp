import React from "react";
import { useTelegram } from "@auth/useTelegram";
import { LogoMark } from "@components/LogoMark";
import { useNavigate } from "react-router-dom";

const AccountScreen: React.FC = () => {
  const { user } = useTelegram();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-[72px] pb-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs text-white/60 mb-4"
      >
        <span className="inline-block w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
          ←
        </span>
        <span>Назад</span>
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src={
              `https://api.dicebear.com/8.x/identicon/svg?seed=${user?.id || 'ASKED'}`
            }
            alt={user?.first_name || "User"}
            className="w-16 h-16 rounded-full object-cover border border-white/15"
          />
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black" />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-base font-semibold truncate">
            {user?.first_name ?? "Гость ASKED"}
          </span>
          {user?.username && (
            <span className="text-sm text-white/45 truncate">
              @{user.username}
            </span>
          )}
          <span className="text-[11px] text-emerald-400 mt-1">
            ASKED community · mini app
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            Profile
          </span>
          <LogoMark />
        </div>
        <div className="space-y-1.5 text-sm text-white/80">
          <div className="flex justify-between">
            <span className="text-white/50">Telegram ID</span>
            <span className="font-mono text-xs">
              {user?.id ?? "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Имя</span>
            <span>{user?.first_name ?? "Гость"}</span>
          </div>
          {user?.last_name && (
            <div className="flex justify-between">
              <span className="text-white/50">Фамилия</span>
              <span>{user.last_name}</span>
            </div>
          )}
          {user?.language_code && (
            <div className="flex justify-between">
              <span className="text-white/50">Язык</span>
              <span>{user.language_code}</span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-white/3 border border-white/10 p-4 space-y-2 text-xs text-white/60">
        <div className="uppercase tracking-[0.22em] text-[10px] text-white/40">
          ASKED limited
        </div>
        <p>
          Здесь в будущем появятся настройки аккаунта, история заказов,
          лимитки и персональные промокоды.
        </p>
      </div>
    </div>
  );
};

export default AccountScreen;

