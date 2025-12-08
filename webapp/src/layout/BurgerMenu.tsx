import React from "react";
import { useNavigate } from "react-router-dom";
import { TelegramUser } from "@auth/useTelegram";

type Props = {
  open: boolean;
  onClose: () => void;
  user: TelegramUser | null;
};

const baseMenuItems = [
  { id: "about", label: "О нас", to: "/about" },
  { id: "certs", label: "Сертификаты", to: "/certs" },
  { id: "help", label: "Помощь", to: "/help" },
  { id: "team", label: "Хочу в команду", to: "/team" }
];

const BurgerMenu: React.FC<Props> = ({ open, onClose, user }) => {
  const ownerId = import.meta.env.VITE_OWNER_TELEGRAM_ID;
  const isOwner =
    !!ownerId && user?.id && String(user.id) === String(ownerId);

  const hasAdmin = !!import.meta.env.VITE_ADMIN_TOKEN && isOwner;

  const links = hasAdmin
    ? [
        ...baseMenuItems,
        {
          id: "admin",
          label: "Admin",
          to: "/admin",
          accent: true as const
        }
      ]
    : baseMenuItems;
  const navigate = useNavigate();

  if (!open) return null;

  const handleClick = (to: string) => {
    navigate(to);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40">
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-3 top-16 asked-card px-4 py-3 flex flex-col gap-2 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Меню
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 border border-white/10 transition-colors absolute top-3 right-4"
        >
          <span className="sr-only">Закрыть меню</span>
          <div className="relative w-4 h-4">
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rotate-45 bg-white/80 rounded-full" />
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 -rotate-45 bg-white/80 rounded-full" />
          </div>
        </button>
        {links.map((item) => (
          <button
            key={item.id}
            className={`asked-tap flex items-center justify-between rounded-xl px-3 py-2 bg-slate-900/40 hover:bg-slate-800/50 text-sm ${
              (item as any).accent ? "text-askedAccentSoft" : ""
            }`}
            onClick={() => handleClick(item.to)}
          >
            <span>{item.label}</span>
          </button>
        ))}
        <p className="mt-1 text-[10px] text-slate-500">
          Эти разделы пока работают как статические страницы без backend. Позже
          подключим реальные данные.
        </p>
      </div>
    </div>
  );
};

export default BurgerMenu;
