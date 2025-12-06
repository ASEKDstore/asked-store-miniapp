import React from "react";

const HelpScreen: React.FC = () => {
  return (
    <div className="space-y-4">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          помощь
        </div>
        <div className="font-semibold mb-1">Как с этим всем жить</div>
        <p className="text-[11px] text-slate-400 mb-2">
          Здесь будут ответы на частые вопросы: оплата, доставка, возвраты,
          размеры и статус заказов. А пока — базовая логика, по которой мы
          планируем работать.
        </p>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
          <li>Все лимитированные вещи выпускаются малыми партиями.</li>
          <li>Доступ к части дропов возможен только через limited-пропуск.</li>
          <li>Коммуникация и поддержка — через Telegram.</li>
        </ul>
      </section>

      <section className="asked-card px-4 py-3 text-[11px] text-slate-400 screen-card-pop">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
          контакты поддержки
        </div>
        <p className="mb-1">
          Если что-то пошло не так, быстрее всего мы ответим в Telegram.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Поддержка: <span className="text-slate-200">@asked_support</span></li>
          <li>Вопросы по дропам: <span className="text-slate-200">@asked_drops</span></li>
        </ul>
        <p className="mt-2 text-[10px] text-slate-500">
          Точные контакты и ссылки подставим, когда финализируем основной
          аккаунт бренда.
        </p>
      </section>
    </div>
  );
};

export default HelpScreen;


