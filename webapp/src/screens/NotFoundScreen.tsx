import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="asked-card px-5 py-4 flex flex-col gap-3 text-sm max-w-xs w-full screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
          error 404
        </div>
        <div className="text-base font-semibold">
          Похоже, Синий потерял этот экран
        </div>
        <p className="text-[11px] text-slate-400">
          Такой страницы больше нет, либо она ещё в разработке. Вернёмся на
          главную витрину ASKED?
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-1 asked-tap self-start px-3 py-1.5 text-[11px] rounded-xl bg-askedAccentSoft font-semibold"
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default NotFoundScreen;


