import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";

type CatalogProduct = {
  id: string;
  name: string;
  price: number;
  tag?: "limited" | "drop" | "new";
  category: "hoodie" | "tee" | "cap" | "accessory";
  description: string;
  sizes: string[];
  imageUrl: string;
};

type CategoryFilter = "all" | "hoodie" | "tee" | "cap" | "accessory";
type TagFilter = "all" | "limited" | "drop" | "new";
type SortMode = "popular" | "price-asc" | "price-desc";

type CatalogResponse =
  | {
      ok: true;
      items: CatalogProduct[];
    }
  | {
      ok: false;
      message?: string;
    };

const CatalogScreen: React.FC = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [tag, setTag] = useState<TagFilter>("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);

  const [selectedProduct, setSelectedProduct] =
    useState<CatalogProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/catalog`);
        const data: CatalogResponse = await res.json();
        if (!data.ok) {
          setError(data.message || "Не удалось загрузить каталог.");
          setAllProducts([]);
        } else {
          setAllProducts(data.items);
        }
      } catch (e) {
        console.error(e);
        setError("Ошибка связи с сервером.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    if (!allProducts.length) return;
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timeout);
  }, [query, category, tag, sort, allProducts.length]);

  const filtered = useMemo(() => {
    let items = [...allProducts];

    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (category !== "all") {
      items = items.filter((p) => p.category === category);
    }

    if (tag !== "all") {
      items = items.filter((p) => p.tag === tag);
    }

    if (sort === "price-asc") {
      items = items.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      items = items.sort((a, b) => b.price - a.price);
    }

    return items;
  }, [query, category, tag, sort, allProducts]);

  const handleAddToCart = (p: CatalogProduct, size?: string) => {
    const nameWithSize = size ? `${p.name} · ${size}` : p.name;
    addToCart({
      id: size ? `${p.id}-${size}` : p.id,
      name: nameWithSize,
      price: p.price,
      tag: p.tag
    });
  };

  const openDetails = (p: CatalogProduct) => {
    setSelectedProduct(p);
    setSelectedSize(p.sizes[0] || null);
  };
  const closeDetails = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
  };

  const handleBuyNow = () => {
    if (!selectedProduct) return;
    handleAddToCart(selectedProduct, selectedSize || undefined);
    closeDetails();
    navigate("/cart");
  };

  const handleAddFromDetails = () => {
    if (!selectedProduct) return;
    handleAddToCart(selectedProduct, selectedSize || undefined);
  };

  return (
    <div className="space-y-3 pb-16">
      {/* Панель фильтров и поиска */}
      <section className="asked-card px-3 py-3 text-sm screen-card-pop">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              className="flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none placeholder:text-slate-500"
              placeholder="Поиск по каталогу..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <div className="flex gap-1 flex-wrap">
              {[
                { id: "all", label: "Все" },
                { id: "hoodie", label: "Худи" },
                { id: "tee", label: "Футболки" },
                { id: "cap", label: "Кепки" },
                { id: "accessory", label: "Аксессуары" }
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as CategoryFilter)}
                  className={`px-3 py-1 rounded-full border asked-tap ${
                    category === c.id
                      ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                      : "border-slate-700 text-slate-400"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] mt-1">
            <div className="flex gap-1">
              {[
                { id: "all", label: "Все" },
                { id: "limited", label: "Лимит" },
                { id: "drop", label: "Дроп" },
                { id: "new", label: "New" }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTag(t.id as TagFilter)}
                  className={`px-2.5 py-1 rounded-full border asked-tap ${
                    tag === t.id
                      ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                      : "border-slate-700 text-slate-500"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <select
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-2 py-1 text-[11px] outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
            >
              <option value="popular">по популярности</option>
              <option value="price-asc">сначала дешёвые</option>
              <option value="price-desc">сначала дорогие</option>
            </select>
          </div>

          {error && (
            <div className="text-[11px] text-red-400 mt-1">{error}</div>
          )}
        </div>
      </section>

      {/* Список / skeleton */}
      <section className="asked-card px-3 py-3 text-sm screen-card-pop">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
            каталог
          </div>
          <div className="text-[11px] text-slate-500">
            {loading
              ? "обновляем…"
              : `${filtered.length} из ${allProducts.length} позиций`}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="catalog-card skeleton-card flex flex-col rounded-xl overflow-hidden"
              >
                <div className="aspect-square skeleton-block" />
                <div className="px-2 py-2 flex flex-col gap-1">
                  <div className="h-3 w-4/5 skeleton-line" />
                  <div className="h-3 w-2/5 skeleton-line" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-[12px] text-slate-500 text-center mt-4">
            Ничего не нашли под такой запрос. Попробуй изменить фильтры или
            поиск.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="catalog-card asked-card flex flex-col overflow-hidden card-pop cursor-pointer"
                onClick={() => openDetails(p)}
              >
                <div className="w-full aspect-square bg-slate-900/60 border-b border-slate-800 flex items-center justify-center">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="px-2 py-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <div className="text-[11px] font-medium text-slate-100 leading-tight line-clamp-2">
                      {p.name}
                    </div>
                    {p.tag && (
                      <span className="text-[9px] uppercase tracking-[0.16em] text-askedAccentSoft ml-1">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-askedAccentSoft font-semibold">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <button
                      type="button"
                      className="asked-tap px-2 py-1 rounded-lg bg-slate-800 text-[10px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Детальный bottom-sheet */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-black/60 backdrop-blur-sm details-sheet-backdrop"
          onClick={closeDetails}
        >
          <div
            className="mt-auto w-full max-w-md mx-auto rounded-t-3xl bg-askedCard border border-slate-800 details-sheet-slide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                товар
              </div>
              <button
                className="text-[11px] text-slate-400 asked-tap"
                onClick={closeDetails}
              >
                закрыть
              </button>
            </div>

            <div className="px-4 pb-3">
              <div className="w-full aspect-[4/3] rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden mb-3">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-slate-50">
                    {selectedProduct.name}
                  </h2>
                  {selectedProduct.tag && (
                    <span className="text-[10px] uppercase tracking-[0.16em] text-askedAccentSoft">
                      {selectedProduct.tag}
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-askedAccentSoft font-semibold">
                  {selectedProduct.price.toLocaleString("ru-RU")} ₽
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            <div className="px-4 pb-3 border-t border-slate-800/80">
              <div className="text-[11px] text-slate-400 mb-1">
                Размер / Size
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`px-3 py-1 rounded-full border text-[11px] asked-tap ${
                      selectedSize === s
                        ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                        : "border-slate-700 text-slate-300"
                    }`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <div className="mt-1 text-[10px] text-red-400">
                  Выберите размер перед покупкой.
                </div>
              )}
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-800/80">
              <div className="flex flex-col gap-2 text-[12px]">
                <button
                  type="button"
                  className="asked-tap w-full py-2 rounded-xl bg-askedAccentSoft font-semibold disabled:opacity-60"
                  disabled={!selectedSize}
                  onClick={handleBuyNow}
                >
                  Купить сейчас
                </button>
                <button
                  type="button"
                  className="asked-tap w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 disabled:opacity-60"
                  disabled={!selectedSize}
                  onClick={handleAddFromDetails}
                >
                  Добавить в корзину
                </button>
                <p className="text-[10px] text-slate-500">
                  Позже можно будет подгружать реальные фото из CMS или admin-панели.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogScreen;
