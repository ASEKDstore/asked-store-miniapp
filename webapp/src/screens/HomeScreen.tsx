import React, { useEffect, useState } from "react";
import { Banner, BannerCard } from "@components/BannerCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// моковые баннеры на случай, если API ничего не отдаёт
const MOCK_BANNERS: Banner[] = [
  {
    id: "mock-1",
    slug: "night-drop-blue",
    title: "Ночной дроп с Синим",
    subtitle: "Худи, кепки и цифровые пропуска",
    imageUrl: "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
    buttonText: "Смотреть дроп",
    buttonColor: "#6366F1",
    description: "Тестовый дроп для демонстрации баннеров.",
    dateEnd: undefined,
    isActive: true,
  },
  {
    id: "mock-2",
    slug: "limited-pass",
    title: "Limited-доступ ASKED",
    subtitle: "Активируй пропуск и открой закрытые дропы",
    imageUrl: "https://images.pexels.com/photos/3738081/pexels-photo-3738081.jpeg",
    buttonText: "Открыть Limited",
    buttonColor: "#A855F7",
    description: "Лимитированный пропуск в закрытую часть ASKED.",
    dateEnd: undefined,
    isActive: true,
  },
];

const HomeScreen: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/banners`);
        const json = await res.json();
        if (json.ok && Array.isArray(json.banners) && json.banners.length > 0) {
          setBanners(json.banners);
        }
      } catch {
        // игнорируем — останутся моки
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* БЛОК БАННЕРОВ */}
      {banners.length > 0 && (
        <div className="mt-2 mb-6 px-4">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-[11px] tracking-[0.22em] uppercase text-white/50">
              Баннеры
            </span>
            <span className="text-[11px] text-white/40">
              для вдохновения
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1">
            {banners.map((b) => (
              <div key={b.id} className="min-w-[90%] snap-center">
                <BannerCard banner={b} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ДАЛЬШЕ МОЖНО ПОСТАВИТЬ УЖЕ СУЩЕСТВУЮЩИЕ БЛОКИ ГЛАВНОЙ:
          Витрина, Топ товары, акции и т.д.
          Если в проекте есть готовые компоненты для этого,
          подключи их здесь, не ломая текущий UI. 
       */}

      <div className="px-4">
        <div className="mt-2 mb-4">
          <div className="text-[11px] tracking-[0.22em] uppercase text-white/50 mb-2">
            Витрина
          </div>
          <div className="rounded-3xl bg-white/5 border border-white/10 px-4 py-4 text-sm text-white/80">
            Здесь можно оставить твой существующий блок "Открыть каталог",
            либо переиспользовать старый компонент, если он был.
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-[11px] tracking-[0.22em] uppercase text-white/50">
              Топ товары
            </div>
            <button className="text-[11px] text-white/40">все</button>
          </div>
          {/* сюда можно подключить существующий компонент "TopProducts",
              если он есть в проекте. Пока оставим заглушку: */}
          <div className="grid grid-cols-2 gap-3 opacity-50 text-xs text-white/40">
            <div className="h-[140px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              IMG
            </div>
            <div className="h-[140px] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              IMG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
