import React from "react";

const AboutScreen: React.FC = () => {
  return (
    <div className="space-y-4">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          о нас
        </div>
        <div className="font-semibold mb-1">ASKED Store · кто мы такие</div>
        <p className="text-[11px] text-slate-400 mb-2">
          ASKED — это микс улицы, провинции и IT-движа. Мы собираем лимитированные
          дропы, цифровые пропуска и истории людей, которые живут в нескольких
          мирах одновременно: код, арт, музыка, улица.
        </p>
        <p className="text-[11px] text-slate-400">
          Telegram Mini App — это наша основная витрина: лёгкая, быстрая и
          всегда под рукой. Здесь появляются первые дропы, тестовые коллекции и
          закрытые эксперименты.
        </p>
      </section>

      <section className="asked-card px-4 py-3 text-[11px] text-slate-400 screen-card-pop">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
          что здесь будет
        </div>
        <ul className="list-disc list-inside space-y-1">
          <li>лимитированные вещи с продуманным визуалом и историей;</li>
          <li>цифровые пропуска и доступы к закрытым дропам;</li>
          <li>эксперименты с IT-фичами и интерактивом прямо в мини-приложении;</li>
          <li>комьюнити-истории, коллабы и спец-доступы.</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutScreen;


