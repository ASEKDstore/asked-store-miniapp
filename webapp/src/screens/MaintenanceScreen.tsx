import React from "react";
import { useNavigate } from "react-router-dom";

const MaintenanceScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="asked-card px-5 py-4 flex flex-col gap-3 text-sm max-w-sm w-full screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft">
          технические работы
        </div>
        <div className="text-base font-semibold">
          Витрина ASKED временно на обслуживании
        </div>
        <p className="text-[11px] text-slate-400">
          Мы докручиваем дропы, обновляем доступы и чиним всё, что можно
          сломать. Некоторые разделы могут быть недоступны.
        </p>
        <p className="text-[10px] text-slate-500">
          Попробуйте обновить страницу чуть позже или вернуться на главную
          витрину.
        </p>
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => window.location.reload()}
            className="asked-tap px-3 py-1.5 text-[11px] rounded-xl bg-askedAccentSoft font-semibold"
          >
            Проверить снова
          </button>
          <button
            onClick={() => navigate("/")}
            className="asked-tap px-3 py-1.5 text-[11px] rounded-xl bg-slate-800 text-slate-200"
          >
            На главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;


