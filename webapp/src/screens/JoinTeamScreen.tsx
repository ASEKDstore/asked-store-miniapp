import React from "react";

const JoinTeamScreen: React.FC = () => {
  return (
    <div className="space-y-4">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          хочу в команду
        </div>
        <div className="font-semibold mb-1">Стать частью ASKED</div>
        <p className="text-[11px] text-slate-400 mb-2">
          Мы делаем бренд на стыке улицы, IT и визуального дизайна. Если тебе
          близок этот вайб — тут будет вход в команду: заявки, роли, тестовые
          задачки.
        </p>
        <p className="text-[11px] text-slate-400">
          На следующих итерациях сюда подвяжем мини-форму с выбором роли:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] text-slate-400">
          <li>дизайн (одежда, графика, 3D, анимация);</li>
          <li>разработка (web, боты, интеграции);</li>
          <li>контент, фото/видео, сторителлинг;</li>
          <li>комьюнити и оффлайн-движ.</li>
        </ul>
      </section>

      <section className="asked-card px-4 py-3 text-[11px] text-slate-400 screen-card-pop">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
          как откликнуться
        </div>
        <p className="mb-1">
          На старте — всё просто: пиши нам в Telegram, расскажи, кто ты и что
          хочешь делать внутри ASKED.
        </p>
        <p className="text-[10px] text-slate-500">
          Чуть позже добавим полноценную анкету прямо в Mini App с выбором
          роли и загрузкой портфолио.
        </p>
      </section>
    </div>
  );
};

export default JoinTeamScreen;


