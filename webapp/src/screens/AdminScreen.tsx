import React, { useEffect, useState } from "react";
import { useTelegram } from "@auth/useTelegram";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || "";

type Product = {
  id: string;
  name: string;
  price: number;
  tag?: string;
  category: "hoodie" | "tee" | "cap" | "accessory";
  description: string;
  sizes: string[];
  imageUrl: string;
};

type HomeBanner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
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

type HomeContent = {
  banners: HomeBanner[];
  promos: HomePromo[];
  gallery: HomeGalleryItem[];
  socials: HomeSocial[];
};

type StatsResponse = {
  ok: boolean;
  totalOrders: number;
  totalRevenue: number;
  uniqueUsers: number;
  topProducts: {
    id: string;
    name: string;
    ordersCount: number;
    quantityTotal: number;
  }[];
  ts?: number;
};

type FileItem = {
  filename: string;
  url: string;
};

type KnownUser = {
  telegramUserId: number;
  telegramUsername?: string;
  role: "user" | "manager" | "admin";
  ordersCount: number;
};

type PromoCode = {
  code: string;
  tier: string;
  createdAt: string;
};

const AdminScreen: React.FC = () => {
  const { user } = useTelegram();
  const [tab, setTab] = useState<"products" | "home" | "promocodes" | "stats" | "files" | "users">(
    "products"
  );
  const [authError, setAuthError] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    category: "hoodie",
    description: "",
    sizes: ["S", "M", "L"],
    imageUrl: ""
  });

  // Home content
  const [home, setHome] = useState<HomeContent | null>(null);
  const [loadingHome, setLoadingHome] = useState(false);

  // Promocodes
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(false);
  const [promoPrefix, setPromoPrefix] = useState("ASK");
  const [promoCount, setPromoCount] = useState(5);
  const [promoTier, setPromoTier] = useState<"core" | "alpha" | "ghost">(
    "core"
  );

  // Stats
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  // Files
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  // Users
  const [users, setUsers] = useState<KnownUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Ранний возврат, если токен не задан
  if (!ADMIN_TOKEN) {
    return (
      <div className="space-y-4 pb-16">
        <section className="asked-card px-4 py-4 text-sm screen-card-pop">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
            admin
          </div>
          <div className="font-semibold mb-1">Админ-панель выключена</div>
          <p className="text-[11px] text-slate-400">
            Не задан VITE_ADMIN_TOKEN. Добавь его в .env фронта и перезапусти
            приложение, чтобы управлять контентом и товарами.
          </p>
        </section>
      </div>
    );
  }

  const authHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ADMIN_TOKEN}`,
    "X-Telegram-Id": user?.id ? String(user.id) : ""
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        headers: authHeader
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Ошибка загрузки товаров");
      } else {
        setProducts(data.items || []);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке товаров.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchHome = async () => {
    setLoadingHome(true);
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/admin/home`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeader
        }
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Ошибка загрузки контента главной");
      } else {
        setHome(data.content);
        setAuthError(null);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке главной.");
    } finally {
      setLoadingHome(false);
    }
  };

  const fetchCodes = async () => {
    setLoadingCodes(true);
    try {
      const res = await fetch(`${API_BASE}/admin/promocodes`, {
        headers: authHeader
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Ошибка загрузки промокодов");
      } else {
        setPromoCodes(data.codes || []);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке промокодов.");
    } finally {
      setLoadingCodes(false);
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch(`${API_BASE}/admin/stats`, {
        headers: authHeader
      });
      const data: StatsResponse = await res.json();
      if (!data.ok) {
        setAuthError("Ошибка загрузки статистики");
      } else {
        setStats(data);
        setLastUpdated(data.ts || Date.now());
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке статистики.");
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await fetch(`${API_BASE}/admin/files`, {
        headers: authHeader
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Ошибка загрузки файлов");
      } else {
        setFiles(data.items || []);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке файлов.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/admin/files`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ADMIN_TOKEN}`,
          "X-Telegram-Id": user?.id ? String(user.id) : ""
        },
        body: formData
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось загрузить файл");
      } else {
        fetchFiles();
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке файла.");
    }
  };

  const handleDeleteFile = async (filename: string) => {
    try {
      const res = await fetch(`${API_BASE}/admin/files/${filename}`, {
        method: "DELETE",
        headers: authHeader
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось удалить файл");
      } else {
        fetchFiles();
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при удалении файла.");
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: authHeader
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Ошибка загрузки пользователей");
      } else {
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при загрузке пользователей.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUpdateUserRole = async (telegramUserId: number, role: "user" | "manager" | "admin") => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${telegramUserId}/role`, {
        method: "PATCH",
        headers: authHeader,
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось обновить роль");
      } else {
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при обновлении роли.");
    }
  };

  useEffect(() => {
    if (!ADMIN_TOKEN) return;
    if (tab === "products") {
      fetchProducts();
    } else if (tab === "home") {
      fetchHome();
    } else if (tab === "promocodes") {
      fetchCodes();
    } else if (tab === "stats") {
      fetchStats();
    } else if (tab === "files") {
      fetchFiles();
    } else if (tab === "users") {
      fetchUsers();
    }
  }, [tab, ADMIN_TOKEN]);

  // Realtime обновление статистики
  useEffect(() => {
    if (!ADMIN_TOKEN || tab !== "stats") return;
    fetchStats();
    const id = setInterval(fetchStats, 10000); // каждые 10 сек
    return () => clearInterval(id);
  }, [tab, ADMIN_TOKEN]);

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    try {
      const res = await fetch(`${API_BASE}/admin/products`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          ...newProduct,
          sizes: newProduct.sizes || ["S", "M", "L"]
        })
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось создать товар");
      } else {
        setNewProduct({
          name: "",
          price: 0,
          category: "hoodie",
          description: "",
          sizes: ["S", "M", "L"],
          imageUrl: ""
        });
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при создании товара.");
    }
  };

  const handleSaveHome = async () => {
    if (!home) return;
    setAuthError(null);
    try {
      const res = await fetch(`${API_BASE}/admin/home`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeader
        },
        body: JSON.stringify(home)
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось сохранить контент главной");
      } else {
        setHome(data.content);
        setAuthError(null);
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при сохранении главной.");
    }
  };

  const handleGenerateCodes = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/promocodes/generate`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify({
          prefix: promoPrefix,
          count: promoCount,
          tier: promoTier
        })
      });
      const data = await res.json();
      if (!data.ok) {
        setAuthError(data.message || "Не удалось сгенерировать промокоды");
      } else {
        fetchCodes();
      }
    } catch (e) {
      console.error(e);
      setAuthError("Ошибка связи с сервером при генерации промокодов.");
    }
  };

  return (
    <div className="space-y-3 pb-16 text-xs">
      <section className="asked-card px-4 py-3 screen-card-pop">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft">
            admin
          </div>
          <div className="flex gap-1 text-[10px] flex-wrap">
            {["products", "home", "promocodes", "stats", "files", "users"].map((t) => (
              <button
                key={t}
                className={`px-2 py-1 rounded-lg border asked-tap ${
                  tab === t
                    ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                    : "border-slate-700 text-slate-400"
                }`}
                onClick={() => setTab(t as any)}
              >
                {t === "products"
                  ? "Товары"
                  : t === "home"
                  ? "Главная"
                  : t === "promocodes"
                  ? "Промокоды"
                  : t === "stats"
                  ? "Статистика"
                  : t === "files"
                  ? "Файлы"
                  : "Пользователи"}
              </button>
            ))}
          </div>
        </div>
        {authError && (
          <div className="text-[11px] text-red-400 mb-2">{authError}</div>
        )}

        {tab === "products" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Управление товарами каталога
            </div>
            {loadingProducts ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <div className="max-h-52 overflow-y-auto no-scrollbar space-y-1">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="border border-slate-800 rounded-lg px-3 py-2 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-[11px] text-slate-100">
                        {p.name}
                      </div>
                      <div className="text-[10px] text-askedAccentSoft">
                        {p.price.toLocaleString("ru-RU")} ₽
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {p.category} · {p.tag || "—"}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {p.imageUrl}
                    </div>
                  </div>
                ))}
                {!products.length && (
                  <div className="text-[11px] text-slate-500">
                    Товаров пока нет.
                  </div>
                )}
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-400 mb-1">
                Добавить товар
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]"
                  placeholder="Название"
                  value={newProduct.name || ""}
                  onChange={(e) =>
                    setNewProduct((p) => ({ ...p, name: e.target.value }))
                  }
                />
                <input
                  className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]"
                  placeholder="Цена"
                  type="number"
                  value={newProduct.price || 0}
                  onChange={(e) =>
                    setNewProduct((p) => ({
                      ...p,
                      price: Number(e.target.value) || 0
                    }))
                  }
                />
                <select
                  className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]"
                  value={newProduct.category || "hoodie"}
                  onChange={(e) =>
                    setNewProduct((p) => ({
                      ...p,
                      category: e.target.value as any
                    }))
                  }
                >
                  <option value="hoodie">Худи</option>
                  <option value="tee">Футболка</option>
                  <option value="cap">Кепка</option>
                  <option value="accessory">Аксессуар</option>
                </select>
                <select
                  className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]"
                  value={newProduct.tag || ""}
                  onChange={(e) =>
                    setNewProduct((p) => ({
                      ...p,
                      tag: e.target.value || undefined
                    }))
                  }
                >
                  <option value="">— тег —</option>
                  <option value="limited">limited</option>
                  <option value="drop">drop</option>
                  <option value="new">new</option>
                </select>
              </div>
              <textarea
                className="mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full resize-none"
                placeholder="Описание"
                value={newProduct.description || ""}
                onChange={(e) =>
                  setNewProduct((p) => ({
                    ...p,
                    description: e.target.value
                  }))
                }
              />
              <input
                className="mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full"
                placeholder="Размеры (через запятую)"
                value={(newProduct.sizes || []).join(", ")}
                onChange={(e) =>
                  setNewProduct((p) => ({
                    ...p,
                    sizes: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  }))
                }
              />
              <input
                className="mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full"
                placeholder="URL картинки"
                value={newProduct.imageUrl || ""}
                onChange={(e) =>
                  setNewProduct((p) => ({
                    ...p,
                    imageUrl: e.target.value
                  }))
                }
              />
              <button
                className="asked-tap mt-2 px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold"
                onClick={handleCreateProduct}
              >
                Сохранить товар
              </button>
            </div>
          </div>
        )}

        {tab === "home" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Контент главной страницы (баннеры, акции, галерея, соцсети)
            </div>
            {loadingHome || !home ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <>
                <div>
                  <div className="font-semibold text-[11px] mb-1">
                    Баннеры
                  </div>
                  <div className="space-y-1 max-h-36 overflow-y-auto no-scrollbar">
                    {home.banners.map((b, idx) => (
                      <div
                        key={b.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1"
                      >
                        <input
                          className="bg-transparent outline-none text-[11px] text-slate-100"
                          value={b.title}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.banners[idx] = {
                              ...b,
                              title: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                        <input
                          className="bg-transparent outline-none text-[10px] text-slate-400"
                          value={b.subtitle}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.banners[idx] = {
                              ...b,
                              subtitle: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[11px] mb-1">Акции</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
                    {home.promos.map((p, idx) => (
                      <div
                        key={p.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1"
                      >
                        <input
                          className="bg-transparent outline-none text-[11px] text-slate-100"
                          value={p.title}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.promos[idx] = {
                              ...p,
                              title: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                        <textarea
                          className="bg-transparent outline-none text-[10px] text-slate-400 resize-none"
                          value={p.text}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.promos[idx] = {
                              ...p,
                              text: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[11px] mb-1">
                    Галерея
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
                    {home.gallery.map((g, idx) => (
                      <div
                        key={g.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1"
                      >
                        <input
                          className="bg-transparent outline-none text-[11px] text-slate-100"
                          value={g.label}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.gallery[idx] = {
                              ...g,
                              label: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                        <input
                          className="bg-transparent outline-none text-[10px] text-slate-400"
                          value={g.imageUrl}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.gallery[idx] = {
                              ...g,
                              imageUrl: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-[11px] mb-1">
                    Соцсети
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto no-scrollbar">
                    {home.socials.map((s, idx) => (
                      <div
                        key={s.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1"
                      >
                        <input
                          className="bg-transparent outline-none text-[11px] text-slate-100"
                          value={s.label}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.socials[idx] = {
                              ...s,
                              label: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                        <input
                          className="bg-transparent outline-none text-[10px] text-slate-400"
                          value={s.handle}
                          onChange={(e) => {
                            const copy = { ...home };
                            copy.socials[idx] = {
                              ...s,
                              handle: e.target.value
                            };
                            setHome(copy);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="asked-tap mt-2 px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold"
                  onClick={handleSaveHome}
                >
                  Сохранить
                </button>
              </>
            )}
          </div>
        )}

        {tab === "promocodes" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Генерация промокодов
            </div>
            <div className="flex gap-2 text-[11px] mb-2">
              <input
                className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none"
                placeholder="Префикс"
                value={promoPrefix}
                onChange={(e) => setPromoPrefix(e.target.value.toUpperCase())}
              />
              <input
                className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none w-16"
                placeholder="Штук"
                type="number"
                value={promoCount}
                onChange={(e) =>
                  setPromoCount(Math.max(1, Number(e.target.value) || 1))
                }
              />
              <select
                className="bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none"
                value={promoTier}
                onChange={(e) =>
                  setPromoTier(e.target.value as "core" | "alpha" | "ghost")
                }
              >
                <option value="core">core</option>
                <option value="alpha">alpha</option>
                <option value="ghost">ghost</option>
              </select>
            </div>
            <button
              className="asked-tap px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold"
              onClick={handleGenerateCodes}
            >
              Сгенерировать
            </button>

            <div className="mt-2 text-[11px] text-slate-400">
              Список промокодов
            </div>
            {loadingCodes ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <div className="max-h-48 overflow-y-auto no-scrollbar space-y-1">
                {promoCodes.map((c) => (
                  <div
                    key={c.code + c.createdAt}
                    className="border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between"
                  >
                    <span className="text-[11px] text-slate-100">
                      {c.code}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {c.tier}
                    </span>
                  </div>
                ))}
                {!promoCodes.length && (
                  <div className="text-[11px] text-slate-500">
                    Промокодов пока нет.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "stats" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Статистика заказов
            </div>
            {loadingStats || !stats ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="border border-slate-800 rounded-xl px-2 py-2">
                    <div className="text-[10px] text-slate-500">
                      Заказов всего
                    </div>
                    <div className="text-[13px] font-semibold text-slate-50">
                      {stats.totalOrders}
                    </div>
                  </div>
                  <div className="border border-slate-800 rounded-xl px-2 py-2">
                    <div className="text-[10px] text-slate-500">
                      Выручка, ₽
                    </div>
                    <div className="text-[13px] font-semibold text-slate-50">
                      {stats.totalRevenue.toLocaleString("ru-RU")}
                    </div>
                  </div>
                  <div className="border border-slate-800 rounded-xl px-2 py-2">
                    <div className="text-[10px] text-slate-500">
                      Уникальных юзеров
                    </div>
                    <div className="text-[13px] font-semibold text-slate-50">
                      {stats.uniqueUsers}
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-[11px] text-slate-400 mb-1">
                    Топ товаров по заказам
                  </div>
                  <div className="max-h-40 overflow-y-auto no-scrollbar space-y-1">
                    {stats.topProducts.map((t) => (
                      <div
                        key={t.id}
                        className="border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between"
                      >
                        <div className="text-[11px] text-slate-100">
                          {t.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {t.ordersCount} заказов · {t.quantityTotal} шт
                        </div>
                      </div>
                    ))}
                    {!stats.topProducts.length && (
                      <div className="text-[11px] text-slate-500">
                        Заказов ещё нет.
                      </div>
                    )}
                  </div>
                </div>
                {lastUpdated && (
                  <div className="text-[10px] text-slate-500 mt-1">
                    Обновлено: {new Date(lastUpdated).toLocaleTimeString("ru-RU")}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "files" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Файл-менеджер
            </div>
            <div className="mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadFile}
                className="text-[11px]"
              />
            </div>
            {loadingFiles ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <div className="max-h-64 overflow-y-auto no-scrollbar space-y-1">
                {files.map((f) => (
                  <div
                    key={f.filename}
                    className="border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`${API_BASE}${f.url}`}
                        alt={f.filename}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <div className="text-[11px] text-slate-100 truncate max-w-[200px]">
                          {f.filename}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {f.url}
                        </div>
                      </div>
                    </div>
                    <button
                      className="asked-tap px-2 py-1 rounded-lg bg-red-900/30 text-[10px] text-red-400"
                      onClick={() => handleDeleteFile(f.filename)}
                    >
                      Удалить
                    </button>
                  </div>
                ))}
                {!files.length && (
                  <div className="text-[11px] text-slate-500">
                    Файлов пока нет.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-3">
            <div className="text-[11px] text-slate-400 mb-1">
              Пользователи и роли
            </div>
            {loadingUsers ? (
              <div className="text-[11px] text-slate-500">Загружаем…</div>
            ) : (
              <div className="max-h-64 overflow-y-auto no-scrollbar space-y-1">
                {users.map((u) => (
                  <div
                    key={u.telegramUserId}
                    className="border border-slate-800 rounded-lg px-2 py-2 flex items-center justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="text-[11px] text-slate-100">
                        ID: {u.telegramUserId}
                        {u.telegramUsername && ` (@${u.telegramUsername})`}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Заказов: {u.ordersCount}
                      </div>
                    </div>
                    <select
                      className="bg-slate-950/70 border border-slate-800 rounded-lg px-2 py-1 text-[11px] outline-none"
                      value={u.role}
                      onChange={(e) =>
                        handleUpdateUserRole(
                          u.telegramUserId,
                          e.target.value as "user" | "manager" | "admin"
                        )
                      }
                    >
                      <option value="user">user</option>
                      <option value="manager">manager</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                ))}
                {!users.length && (
                  <div className="text-[11px] text-slate-500">
                    Пользователей пока нет.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminScreen;

