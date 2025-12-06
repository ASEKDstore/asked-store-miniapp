import React from "react";

const CertificatesScreen: React.FC = () => {
  return (
    <div className="space-y-4">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          сертификаты
        </div>
        <div className="font-semibold mb-1">Прозрачность и доверие</div>
        <p className="text-[11px] text-slate-400 mb-2">
          Здесь будут собраны сертификаты подлинности, подтверждения лимитаций
          и документы по материалам. Для каждого дропа — свой цифровой след.
        </p>
        <p className="text-[11px] text-slate-400">
          На следующих этапах мы добавим:
        </p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-[11px] text-slate-400">
          <li>цифровые сертификаты для лимитированных вещей;</li>
          <li>привязку сертификата к заказу и limited-пассу;</li>
          <li>публичный реестр серий и партий.</li>
        </ul>
      </section>

      <section className="asked-card px-4 py-3 text-[11px] text-slate-400 screen-card-pop">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
          статус раздела
        </div>
        <p>
          Пока раздел работает как статическая страница-превью. Функционал
          проверки сертификатов и отображения оригинальности будет подключён
          после интеграции с backend.
        </p>
      </section>
    </div>
  );
};

export default CertificatesScreen;


