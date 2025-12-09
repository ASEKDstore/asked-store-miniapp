import React, { useEffect, useState } from "react";
import { useTelegram } from "@auth/useTelegram";
import { useNavigate } from "react-router-dom";
import { BannerCard, Banner } from "@components/BannerCard";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";

type OrderStatus = "processing" | "packing" | "delivery" | "delivered";

type LastOrderResponse =
  | {
      ok: true;
      order: {
        id: number;
        number: string;
        status: OrderStatus;
      };
    }
  | {
      ok: false;
      message?: string;
    };

function statusToText(status: OrderStatus): string {
  switch (status) {
    case "processing":
      return "обрабатывается";
    case "packing":
      return "собирается";
    case "delivery":
      return "доставляется";
    case "delivered":
      return "доставлен";
    default:
      return status;
  }
}

// Типы для /home

type HomeBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  to: string;
};

type HomeTopProduct = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  to: string;
};

type HomePromo = {
  id: string;
  title: string;
  text: string;
};

type HomeGalleryItem = {
  id: string;
  label: string;
  type: string;
  imageUrl: string;
};

type HomeSocial = {
  id: string;
  label: string;
  handle: string;
  soon?: boolean;
};

type HomeResponse =
  | {
      ok: true;
      banners: HomeBanner[];
      topProducts: HomeTopProduct[];
      promos: HomePromo[];
      gallery: HomeGalleryItem[];
      socials: HomeSocial[];
    }
  | {
      ok: false;
      message?: string;
    };

const HomeScreen: React.FC = () => {
  const { user } = useTelegram();
  const navigate = useNavigate();

  const [lastOrder, setLastOrder] = useState<LastOrderResponse | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [loadingHome, setLoadingHome] = useState(false);

  const [promoBanners, setPromoBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchLastOrder = async () => {
      setLoadingOrder(true);
      try {
        const res = await fetch(
          `${API_BASE}/orders/last?telegramId=${user.id}`
        );
        const data: LastOrderResponse = await res.json();
        setLastOrder(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchLastOrder();
  }, [user?.id]);

  useEffect(() => {
    const fetchHome = async () => {
      setLoadingHome(true);
      try {
        const res = await fetch(`${API_BASE}/home`);
        const data: HomeResponse = await res.json();
        setHomeData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingHome(false);
      }
    };

    fetchHome();
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoadingBanners(true);
      try {
        const res = await fetch(`${API_BASE}/api/banners`);
        const data = await res.json();
        if (data?.ok && Array.isArray(data.banners)) {
          setPromoBanners(data.banners.slice(0, 7)); // максимум 7 баннеров
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingBanners(false);
      }
    };
    fetchBanners();
  }, []);

  const hasOrder = lastOrder && lastOrder.ok;
  const hasHome = homeData && homeData.ok;

  const topProducts = hasHome ? homeData!.topProducts : [];
  const promos = hasHome ? homeData!.promos : [];
  const gallery = hasHome ? homeData!.gallery : [];
  const socials = hasHome ? homeData!.socials : [];

  // Используем только новые промо-баннеры
  const banners = promoBanners;

  return (
    <div className="space-y-4 pb-16 px-4">
      {/* Промо-баннеры (новые) */}
      {banners.length > 0 && (
        <div className="mb-6 mt-2">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-1 pb-2 scroll-smooth">
            {banners.map((b) => (
              <div
                key={b.id}
                className="min-w-[90%] snap-center"
              >
                <BannerCard banner={b} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Статус текущего заказа */}
      {loadingOrder && (
        <section className="asked-card px-4 py-3 text-[11px] screen-card-pop">
          <div className="text-slate-400">Проверяем статус заказа…</div>
        </section>
      )}

      {!loadingOrder && hasOrder && lastOrder && lastOrder.ok && (
        <section className="asked-card px-4 py-3 text-[11px] screen-card-pop">
          <div className="text-[10px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
            текущий заказ
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                Заказ №{lastOrder.order.number}
              </span>
              <span className="text-[11px] text-slate-400">
                Статус: {statusToText(lastOrder.order.status)}
              </span>
            </div>
            <button
              className="asked-tap px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-[11px]"
              onClick={() => navigate("/cart")}
            >
              Открыть корзину
            </button>
          </div>
        </section>
      )}

      {/* Большая кнопка Каталог */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="flex flex-col gap-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
            витрина
          </div>
          <button
            className="asked-tap w-full py-3 rounded-2xl bg-askedAccentSoft text-[13px] font-semibold"
            onClick={() => navigate("/catalog")}
          >
            Открыть каталог
          </button>
          <p className="text-[10px] text-slate-500">
            Здесь собраны все текущие дропы, базовые позиции и тестовые заглушки
            под будущие коллекции.
          </p>
        </div>
      </section>

      {/* Топ товары */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft">
            топ товары
          </div>
          <button
            className="text-[10px] text-slate-500 asked-tap"
            onClick={() => navigate("/catalog")}
          >
            все
          </button>
        </div>
        {loadingHome && !topProducts.length ? (
          <div className="text-[11px] text-slate-500">Загружаем топ…</div>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {topProducts.map((p) => (
              <button
                key={p.id}
                type="button"
                className="asked-tap snap-start min-w-[70%] max-w-[70%] md:min-w-[45%] md:max-w-[45%] text-left"
                onClick={() => navigate(p.to)}
              >
                <div className="catalog-card flex flex-col overflow-hidden card-pop">
                  <div className="w-full aspect-square bg-slate-900/70 border-b border-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                    IMG
                  </div>
                  <div className="px-3 py-2 flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-[11px] font-medium text-slate-100 leading-tight line-clamp-2">
                        {p.name}
                      </div>
                      {p.tag && (
                        <span className="text-[9px] uppercase tracking-[0.16em] text-askedAccentSoft">
                          {p.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[12px] text-askedAccentSoft font-semibold">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {!loadingHome && !topProducts.length && (
              <div className="text-[11px] text-slate-500">
                Топ товаров появится после первых заказов.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Акции */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          акции и условия
        </div>
        {loadingHome && !promos.length ? (
          <p className="text-[11px] text-slate-500">Загружаем акции…</p>
        ) : (
          <ul className="space-y-2 text-[11px] text-slate-300">
            {promos.map((promo) => (
              <li
                key={promo.id}
                className="border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/60"
              >
                <div className="font-semibold text-slate-50 text-[11px] mb-0.5">
                  {promo.title}
                </div>
                <div className="text-[10px] text-slate-400">{promo.text}</div>
              </li>
            ))}
            {!loadingHome && !promos.length && (
              <li className="text-[11px] text-slate-500">
                Акции появятся позже.
              </li>
            )}
          </ul>
        )}
      </section>

      {/* Галерея */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft">
            галерея
          </div>
        </div>
        {loadingHome && !gallery.length ? (
          <p className="text-[11px] text-slate-500">Загружаем галерею…</p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="relative rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 h-20 flex items-end"
              >
                <img
                  src={g.imageUrl}
                  alt={g.label}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="relative w-full h-full bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 flex items-end">
                  <span className="text-[10px] text-slate-100 font-medium">
                    {g.label}
                  </span>
                </div>
              </div>
            ))}
            {!loadingHome && !gallery.length && (
              <div className="text-[11px] text-slate-500">
                Галерея появится позже.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Соцсети */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop mb-2">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          соцсети
        </div>
        {loadingHome && !socials.length ? (
          <p className="text-[11px] text-slate-500">Загружаем соцсети…</p>
        ) : (
          <div className="flex flex-col gap-2 text-[11px]">
            {socials.map((s) => (
              <button
                key={s.id}
                type="button"
                className="asked-tap w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 flex items-center justify-between px-3"
              >
                <span>{s.label}</span>
                <span className="text-[10px] text-slate-500">
                  {s.handle}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
