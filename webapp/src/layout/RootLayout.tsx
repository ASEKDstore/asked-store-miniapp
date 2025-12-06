import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BurgerMenu from "./BurgerMenu";
import BottomNav from "./BottomNav";
import TelegramBackSync from "./TelegramBackSync";
import { useTelegram } from "@auth/useTelegram";

const RootLayout: React.FC = () => {
  const { isTelegram, user } = useTelegram();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const ownerId = import.meta.env.VITE_OWNER_TELEGRAM_ID;
  const isOwner =
    !!ownerId && user?.id && String(user.id) === String(ownerId);
  const hasAdmin = !!import.meta.env.VITE_ADMIN_TOKEN && isOwner;

  // Если мы не внутри Telegram — показываем stub
  if (!isTelegram) {
    return (
      <div className="tg-fallback-root">
        <div className="tg-fallback-card">
          <div className="tg-fallback-title">ASKED Store</div>
          <p className="tg-fallback-text">
            Этот интерфейс рассчитан на запуск как Telegram Mini App.
          </p>
          <p className="tg-fallback-text">
            Открой бота ASKED в Telegram и запусти магазин из чата.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root-safe">
      {/* Синхронизация телеграм-кнопки "Назад" с роутером */}
      <TelegramBackSync />

      <header className="app-header">
        <Header onMenuClick={() => setMenuOpen(true)} user={user} />
      </header>

      <main className="app-main">
        <div key={location.pathname} className="screen-fade-in">
          <Outlet />
        </div>
      </main>

      <BottomNav />
      <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} />
    </div>
  );
};

export default RootLayout;
