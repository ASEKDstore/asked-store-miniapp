import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  getActiveBanners,
  getAllBanners,
  getBannerBySlug,
  createBanner,
  updateBanner,
  deleteBanner,
  Banner
} from "./data/bannersStore";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

// обеспечить папку uploads
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// статика для файлов
app.use("/files", express.static(uploadsDir));

// ====== Типы ======

type SecretDrop = {
  id: string;
  name: string;
  level: "limited" | "ultra" | "test";
  status: "online" | "soon";
};

type LimitedPass = {
  code: string;
  series: string;
  batch: string;
  number: string;
  cardId: string;
  ownerName: string;
  tier: "core" | "alpha" | "ghost";
  secretDrops: SecretDrop[];
};

type OrderStatus = "processing" | "packing" | "delivery" | "delivered";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  tag?: string;
};

type Order = {
  id: number;
  number: string; // "00001"
  telegramUserId?: number;
  telegramUsername?: string;
  fullName: string;
  phone: string;
  address: string;
  deliveryMethod: "СДЭК" | "Авито" | "Почта России" | "Курьер по городу";
  comment?: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
};

type ProductCategory = "hoodie" | "tee" | "cap" | "accessory";

type Product = {
  id: string;
  name: string;
  price: number;
  tag?: "limited" | "drop" | "new";
  category: ProductCategory;
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

type PromoCodeTier = "core" | "alpha" | "ghost";

type PromoCode = {
  code: string;
  tier: PromoCodeTier;
  createdAt: string;
  usedByTelegramId?: number;
};

type UserRole = "user" | "manager" | "admin";

type KnownUser = {
  telegramUserId: number;
  telegramUsername?: string;
  role: UserRole;
  ordersCount: number;
};

// ====== In-memory "БД" ======

const limitedPasses: LimitedPass[] = [
  {
    code: "AX7$Q2L@",
    series: "ASK-LIM-2025",
    batch: "drop-01",
    number: "007",
    cardId: "ASKED·LIM·007",
    ownerName: "YOU",
    tier: "alpha",
    secretDrops: [
      {
        id: "s1",
        name: "BLUE CHARACTER HOODIE · NIGHT EDITION",
        level: "limited",
        status: "online"
      },
      {
        id: "s2",
        name: "ASKED .BOT HOODIE · DEV BUILD",
        level: "ultra",
        status: "soon"
      }
    ]
  }
];

const products: Product[] = [
  {
    id: "p1",
    name: "ASKED .BOT Hoodie Black",
    price: 6900,
    tag: "limited",
    category: "hoodie",
    description:
      "Чёрный худи с вышивкой .BOT и айтишным вайбом. Плотный хлопок, комфортная посадка.",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl:
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p2",
    name: "Blue Character Hoodie Night",
    price: 7200,
    tag: "drop",
    category: "hoodie",
    description:
      "Худи с Синим персонажем и ночным провинциальным настроением.",
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p3",
    name: "Province Tee White",
    price: 4200,
    tag: "new",
    category: "tee",
    description:
      "Базовая белая футболка с принтом провинциальной улицы и аккуратной посадкой.",
    sizes: ["XS", "S", "M", "L", "XL"],
    imageUrl:
      "https://images.pexels.com/photos/7691088/pexels-photo-7691088.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p4",
    name: "ASKED Logo Tee Black",
    price: 3900,
    tag: "limited",
    category: "tee",
    description:
      "Классическая чёрная футболка с логотипом ASKED. Рабочая лошадка гардероба.",
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.pexels.com/photos/7671167/pexels-photo-7671167.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p5",
    name: "Street Cap Midnight",
    price: 3200,
    tag: "drop",
    category: "cap",
    description:
      "Глубокая тёмная кепка под вечерние катки и ночные код-сессии.",
    sizes: ["One size"],
    imageUrl:
      "https://images.pexels.com/photos/7671169/pexels-photo-7671169.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "p6",
    name: "ASKED Beanie Dark",
    price: 2800,
    tag: "new",
    category: "accessory",
    description:
      "Тёплая шапка-бини, неубиваемая классика с аккуратным ASKED-вибом.",
    sizes: ["One size"],
    imageUrl:
      "https://images.pexels.com/photos/7671172/pexels-photo-7671172.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const homeContent: {
  banners: HomeBanner[];
  promos: HomePromo[];
  gallery: HomeGalleryItem[];
  socials: HomeSocial[];
} = {
  banners: [
    {
      id: "b1",
      title: "Ночной дроп с Синим",
      subtitle: "Худи, кепки и цифровые пропуска",
      cta: "Смотреть дроп",
      to: "/catalog"
    },
    {
      id: "b2",
      title: "Limited-доступ",
      subtitle: "Активируй промокод и открой скрытые дропы",
      cta: "Открыть Limited",
      to: "/limited"
    },
    {
      id: "b3",
      title: "ASKED · Mini App",
      subtitle: "Всё управление дропами прямо в Telegram",
      cta: "Исследовать",
      to: "/catalog"
    }
  ],
  promos: [
    {
      id: "pr1",
      title: "Сборка образа со скидкой",
      text: "Собери худи + футболку + аксессуар — и получи спец-цену в следующих дропах."
    },
    {
      id: "pr2",
      title: "Early access через Limited",
      text: "Некоторые дропы появляются сначала в Limited-разделе, потом — в общем каталоге."
    },
    {
      id: "pr3",
      title: "Провинция / IT / улица",
      text: "Часть коллекций будет только онлайном, часть — с оффлайн-ивентами."
    }
  ],
  gallery: [
    {
      id: "g1",
      label: "Худи · ночь",
      type: "hoodie",
      imageUrl:
        "https://images.pexels.com/photos/8940796/pexels-photo-8940796.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "g2",
      label: "Улица · провинция",
      type: "street",
      imageUrl:
        "https://images.pexels.com/photos/7679870/pexels-photo-7679870.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "g3",
      label: "Синий · character",
      type: "character",
      imageUrl:
        "https://images.pexels.com/photos/7691089/pexels-photo-7691089.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: "g4",
      label: "Деталь · вышивка",
      type: "detail",
      imageUrl:
        "https://images.pexels.com/photos/7671171/pexels-photo-7671171.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ],
  socials: [
    { id: "s1", label: "Telegram канал", handle: "@asked_channel" },
    { id: "s2", label: "Telegram чат", handle: "@asked_chat" },
    { id: "s3", label: "Instagram / VK / прочее", handle: "скоро", soon: true }
  ]
};

const orders: Order[] = [];
let lastOrderId = 0;

type ProductStats = {
  ordersCount: number;
  quantityTotal: number;
};

const productStats: Record<string, ProductStats> = {};

const promoCodes: PromoCode[] = [];

// роли пользователей (по telegramId)
const userRoles: Record<number, UserRole> = {};

const OWNER_TELEGRAM_ID = process.env.OWNER_TELEGRAM_ID
  ? String(process.env.OWNER_TELEGRAM_ID)
  : undefined;

// ====== Helpers ======

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";

/**
 * Определяет роль пользователя на основе Telegram ID
 * Владелец (OWNER_TELEGRAM_ID) всегда получает роль "admin"
 */
function resolveUserRole(
  telegramId?: string | number,
  currentRole?: UserRole
): UserRole {
  const tid = telegramId ? String(telegramId) : undefined;

  // 1) Владелец всегда admin
  if (tid && OWNER_TELEGRAM_ID && tid === OWNER_TELEGRAM_ID) {
    return "admin";
  }

  // 2) Если в базе уже сохранена более высокая роль (manager/admin) — не занижаем
  if (currentRole === "admin" || currentRole === "manager") {
    return currentRole;
  }

  // 3) По умолчанию — user
  return "user";
}

function isAdminTelegramId(id: number | undefined): boolean {
  if (!id) return false;
  const idStr = String(id);
  
  // Владелец всегда админ
  if (OWNER_TELEGRAM_ID && idStr === OWNER_TELEGRAM_ID) return true;

  const envIds = (process.env.TELEGRAM_ADMIN_CHAT_IDS || "")
    .split(",")
    .map((v) => Number(v.trim()))
    .filter(Boolean);

  if (envIds.includes(id)) return true;

  // Проверяем роль из userRoles, используя resolveUserRole для актуальной роли
  const currentRole = userRoles[id];
  const resolvedRole = resolveUserRole(id, currentRole);
  return resolvedRole === "admin" || resolvedRole === "manager";
}

function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Telegram id из заголовка
  const tgIdHeader = req.headers["x-telegram-id"];
  const telegramId = tgIdHeader ? String(tgIdHeader) : undefined;

  // 1) Если это владелец — всегда пропускаем как admin
  if (telegramId && OWNER_TELEGRAM_ID && telegramId === OWNER_TELEGRAM_ID) {
    console.log("OWNER_TELEGRAM_ID имеет роль admin и допущен в админку.");
    return next();
  }

  // 2) Проверка токена
  const authHeader = req.headers["authorization"];
  if (!ADMIN_TOKEN) {
    return res.status(500).json({
      ok: false,
      message: "ADMIN_TOKEN не задан на сервере"
    });
  }
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      ok: false,
      message: "Нет прав доступа (нет токена)"
    });
  }
  const token = authHeader.slice("Bearer ".length);
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      ok: false,
      message: "Неверный admin токен"
    });
  }

  // 3) Проверка роли для остальных пользователей
  const tgId = tgIdHeader ? Number(tgIdHeader) : undefined;
  if (!isAdminTelegramId(tgId)) {
    return res.status(403).json({
      ok: false,
      message: "Недостаточно прав (роль пользователя)"
    });
  }

  next();
}

// ===== Multer для upload файлов =====

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const stamp = Date.now();
    cb(null, `${base}_${stamp}${ext}`);
  }
});

const upload = multer({ storage });

function nextOrderNumber(): { id: number; number: string } {
  lastOrderId += 1;
  const padded = String(lastOrderId).padStart(5, "0");
  return { id: lastOrderId, number: padded };
}

async function sendAdminNotification(text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    console.log("[admin notify]", text);
    return;
  }

  const rawIds =
    process.env.TELEGRAM_ADMIN_CHAT_IDS ||
    process.env.TELEGRAM_MOD_CHAT_ID ||
    "";
  const chatIds = rawIds
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  if (!chatIds.length) {
    console.log("[admin notify / no chat ids]", text);
    return;
  }

  for (const chatId of chatIds) {
    try {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML"
        })
      });
    } catch (e) {
      console.error("Ошибка при отправке уведомления в Telegram:", e);
    }
  }
}

// ====== Public API ======

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Limited

app.post("/limited/check", (req, res) => {
  const { code } = req.body || {};

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      ok: false,
      message: "Промокод не передан"
    });
  }

  const normalized = code.trim().toUpperCase();
  const pass = limitedPasses.find(
    (p) => p.code.toUpperCase() === normalized
  );

  if (!pass) {
    return res.json({
      ok: false,
      message: "Код не найден или больше не активен"
    });
  }

  const { code: _removed, ...cleanPass } = pass;

  return res.json({
    ok: true,
    pass: cleanPass,
    drops: pass.secretDrops
  });
});

// Catalog

app.get("/catalog", (_req, res) => {
  res.json({
    ok: true,
    items: products
  });
});

// Orders

app.post("/orders", async (req, res) => {
  const {
    fullName,
    phone,
    address,
    deliveryMethod,
    comment,
    items,
    totalPrice,
    telegramUserId,
    telegramUsername
  } = req.body || {};

  if (
    !fullName ||
    !phone ||
    !address ||
    !deliveryMethod ||
    !Array.isArray(items) ||
    !items.length
  ) {
    return res.status(400).json({
      ok: false,
      message: "Не хватает данных для создания заказа"
    });
  }

  const { id, number } = nextOrderNumber();

  const orderItems: OrderItem[] = items.map((item: any) => ({
    id: String(item.id),
    name: String(item.name),
    price: Number(item.price) || 0,
    qty: Number(item.qty) || 1,
    tag: item.tag ? String(item.tag) : undefined
  }));

  const total =
    typeof totalPrice === "number" && totalPrice > 0
      ? totalPrice
      : orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);

  const tgIdNum =
    typeof telegramUserId === "number" ? telegramUserId : undefined;

  const order: Order = {
    id,
    number,
    telegramUserId: tgIdNum,
    telegramUsername:
      typeof telegramUsername === "string" ? telegramUsername : undefined,
    fullName,
    phone,
    address,
    deliveryMethod,
    comment,
    items: orderItems,
    totalPrice: total,
    status: "processing",
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  for (const it of orderItems) {
    if (!productStats[it.id]) {
      productStats[it.id] = { ordersCount: 0, quantityTotal: 0 };
    }
    productStats[it.id].ordersCount += 1;
    productStats[it.id].quantityTotal += it.qty;
  }

  // запись базовой роли для нового пользователя
  if (tgIdNum) {
    const currentRole = userRoles[tgIdNum];
    userRoles[tgIdNum] = resolveUserRole(tgIdNum, currentRole);
  }

  await sendAdminNotification(
    `🧾 Новый заказ №${order.number}\n` +
      `👤 ${order.fullName} · ${order.phone}\n` +
      `💰 ${order.totalPrice}₽`
  );

  return res.status(201).json({
    ok: true,
    order
  });
});

app.get("/orders/last", (req, res) => {
  const telegramId = req.query.telegramId;

  if (!telegramId) {
    return res.json({ ok: false, message: "telegramId не передан" });
  }

  const idNum = Number(telegramId);
  if (!idNum) {
    return res.json({ ok: false, message: "Некорректный telegramId" });
  }

  const userOrders = orders.filter(
    (o) => o.telegramUserId === idNum
  );

  if (!userOrders.length) {
    return res.json({ ok: false, message: "Заказов пока нет" });
  }

  const last = userOrders[userOrders.length - 1];

  return res.json({
    ok: true,
    order: last
  });
});

app.patch("/orders/:id/status", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  const allowed: OrderStatus[] = [
    "processing",
    "packing",
    "delivery",
    "delivered"
  ];

  if (!allowed.includes(status)) {
    return res.status(400).json({
      ok: false,
      message: "Некорректный статус заказа"
    });
  }

  const orderId = Number(id);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({
      ok: false,
      message: "Заказ не найден"
    });
  }

  order.status = status;

  return res.json({
    ok: true,
    order
  });
});

// Home

function getTopProductsFromStats(): HomeTopProduct[] {
  const entries = Object.entries(productStats);
  if (!entries.length) {
    return products.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      tag: p.tag,
      to: "/catalog"
    }));
  }

  const sorted = entries
    .sort(([, a], [, b]) => b.ordersCount - a.ordersCount)
    .slice(0, 3);

  const map: Record<string, Product> = {};
  for (const p of products) {
    map[p.id] = p;
  }

  const result: HomeTopProduct[] = [];
  for (const [id] of sorted) {
    const meta = map[id];
    if (meta) {
      result.push({
        id: meta.id,
        name: meta.name,
        price: meta.price,
        tag: meta.tag,
        to: "/catalog"
      });
    }
  }

  if (!result.length) {
    return products.slice(0, 3).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      tag: p.tag,
      to: "/catalog"
    }));
  }
  return result;
}

app.get("/home", (_req, res) => {
  const top = getTopProductsFromStats();

  return res.json({
    ok: true,
    banners: homeContent.banners,
    topProducts: top,
    promos: homeContent.promos,
    gallery: homeContent.gallery,
    socials: homeContent.socials
  });
});

// ====== Banners API ======

// публичный список активных баннеров
app.get("/api/banners", (_req, res) => {
  res.json({ ok: true, banners: getActiveBanners() });
});

// публичный один баннер по slug (для промо-страницы)
app.get("/api/banners/:slug", (req, res) => {
  const banner = getBannerBySlug(req.params.slug);
  if (!banner) {
    return res.status(404).json({ ok: false, error: "banner_not_found" });
  }
  res.json({ ok: true, banner });
});

// ====== Admin API (protected) ======

// middleware для всех /admin/*
app.use("/admin", (req, res, next) => requireAdmin(req, res, next));

app.get("/admin/products", requireAdmin, (_req, res) => {
  res.json({ ok: true, items: products });
});

app.post("/admin/products", requireAdmin, (req, res) => {
  const { name, price, tag, category, description, sizes, imageUrl } =
    req.body || {};

  if (!name || !price || !category) {
    return res.status(400).json({
      ok: false,
      message: "Не хватает данных для товара"
    });
  }

  const id = `p${Date.now()}`;
  const product: Product = {
    id,
    name,
    price: Number(price) || 0,
    tag,
    category,
    description: description || "",
    sizes: Array.isArray(sizes) && sizes.length ? sizes : ["One size"],
    imageUrl:
      imageUrl ||
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800"
  };

  products.push(product);

  res.status(201).json({ ok: true, product });
});

app.patch("/admin/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ ok: false, message: "Товар не найден" });
  }

  const { name, price, tag, category, description, sizes, imageUrl } =
    req.body || {};

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price) || 0;
  if (tag !== undefined) product.tag = tag;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (sizes !== undefined && Array.isArray(sizes) && sizes.length) {
    product.sizes = sizes;
  }
  if (imageUrl !== undefined && imageUrl) {
    product.imageUrl = imageUrl;
  }

  res.json({ ok: true, product });
});

app.delete("/admin/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ ok: false, message: "Товар не найден" });
  }
  products.splice(index, 1);
  res.json({ ok: true });
});

// контент главной страницы
app.get("/admin/home", (_req, res) => {
  return res.json({
    ok: true,
    content: homeContent
  });
});

app.put("/admin/home", (req, res) => {
  const { banners, promos, gallery, socials } = req.body || {};

  if (banners && Array.isArray(banners)) {
    homeContent.banners = banners;
  }
  if (promos && Array.isArray(promos)) {
    homeContent.promos = promos;
  }
  if (gallery && Array.isArray(gallery)) {
    homeContent.gallery = gallery;
  }
  if (socials && Array.isArray(socials)) {
    homeContent.socials = socials;
  }

  return res.json({
    ok: true,
    content: homeContent
  });
});

// Promo codes

app.post("/admin/promocodes/generate", requireAdmin, (req, res) => {
  const { prefix = "ASK", count = 10, tier = "core" } = req.body || {};

  const codes: PromoCode[] = [];
  for (let i = 0; i < count; i++) {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const code = `${prefix}-${random}`;
    const promo: PromoCode = {
      code,
      tier,
      createdAt: new Date().toISOString()
    };
    promoCodes.push(promo);
    codes.push(promo);
  }

  res.json({ ok: true, codes });
});

app.get("/admin/promocodes", requireAdmin, (_req, res) => {
  res.json({ ok: true, codes: promoCodes });
});

// Stats

// файлы
app.get("/admin/files", (_req, res) => {
  const files = fs.readdirSync(uploadsDir).filter((f) => !f.startsWith("."));

  const items = files.map((filename) => ({
    filename,
    url: `/files/${filename}`
  }));

  res.json({ ok: true, items });
});

app.post("/admin/files", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, message: "Файл не получен" });
  }

  const url = `/files/${req.file.filename}`;

  await sendAdminNotification(
    `📸 Загружен новый файл в файл-менеджер:\n${url}`
  );

  res.status(201).json({
    ok: true,
    file: {
      filename: req.file.filename,
      url
    }
  });
});

app.delete("/admin/files/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ ok: false, message: "Файл не найден" });
  }

  fs.unlinkSync(filePath);

  await sendAdminNotification(`🗑 Файл удалён из файл-менеджера:\n${filename}`);

  res.json({ ok: true });
});

// пользователи и роли
app.get("/admin/users", (_req, res) => {
  const map = new Map<number, KnownUser>();

  for (const o of orders) {
    if (!o.telegramUserId) continue;
    const id = o.telegramUserId;
    const currentRole = userRoles[id];
    const resolvedRole = resolveUserRole(id, currentRole);
    const existing = map.get(id) || {
      telegramUserId: id,
      telegramUsername: o.telegramUsername,
      role: resolvedRole,
      ordersCount: 0
    };
    // Обновляем роль на актуальную (на случай если владелец)
    existing.role = resolveUserRole(id, existing.role);
    existing.ordersCount += 1;
    if (!existing.telegramUsername && o.telegramUsername) {
      existing.telegramUsername = o.telegramUsername;
    }
    map.set(id, existing);
  }

  const users = Array.from(map.values());

  res.json({ ok: true, users });
});

app.patch("/admin/users/:telegramUserId/role", async (req, res) => {
  const { telegramUserId } = req.params;
  const { role } = req.body || {};

  const allowed: UserRole[] = ["user", "manager", "admin"];
  if (!allowed.includes(role)) {
    return res
      .status(400)
      .json({ ok: false, message: "Некорректная роль пользователя" });
  }

  const idNum = Number(telegramUserId);
  if (!idNum) {
    return res
      .status(400)
      .json({ ok: false, message: "Некорректный telegramUserId" });
  }

  userRoles[idNum] = role;

  await sendAdminNotification(
    `👤 Роль пользователя ${idNum} изменена на <b>${role}</b>`
  );

  res.json({ ok: true, telegramUserId: idNum, role });
});

// ====== Admin Banners ======

// список всех баннеров (для админки)
app.get("/api/admin/banners", requireAdmin, (_req, res) => {
  res.json({ ok: true, banners: getAllBanners() });
});

// создание баннера
app.post("/api/admin/banners", requireAdmin, (req, res) => {
  const {
    slug,
    title,
    subtitle,
    imageUrl,
    buttonText,
    buttonColor,
    description,
    dateEnd,
    isActive
  } = req.body as Partial<Banner>;

  if (!slug || !title || !imageUrl || !buttonText) {
    return res.status(400).json({ ok: false, error: "missing_fields" });
  }

  const banner = createBanner({
    slug,
    title,
    subtitle,
    imageUrl,
    buttonText,
    buttonColor: buttonColor || "#A855F7",
    description,
    dateEnd,
    isActive: isActive ?? true
  });

  res.status(201).json({ ok: true, banner });
});

// обновление баннера
app.patch("/api/admin/banners/:id", requireAdmin, (req, res) => {
  const banner = updateBanner(req.params.id, req.body);
  if (!banner) {
    return res.status(404).json({ ok: false, error: "banner_not_found" });
  }
  res.json({ ok: true, banner });
});

// удаление баннера
app.delete("/api/admin/banners/:id", requireAdmin, (req, res) => {
  const ok = deleteBanner(req.params.id);
  if (!ok) {
    return res.status(404).json({ ok: false, error: "banner_not_found" });
  }
  res.json({ ok: true });
});

// статистика
app.get("/admin/stats", (_req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const uniqueUsers = new Set(
    orders.map((o) => o.telegramUserId).filter(Boolean)
  ).size;

  const topProductsStats = Object.entries(productStats)
    .sort(([, a], [, b]) => b.ordersCount - a.ordersCount)
    .slice(0, 5)
    .map(([productId, stats]) => {
      const product = products.find((p) => p.id === productId);
      return {
        id: productId,
        name: product?.name || productId,
        ordersCount: stats.ordersCount,
        quantityTotal: stats.quantityTotal
      };
    });

  res.json({
    ok: true,
    totalOrders,
    totalRevenue,
    uniqueUsers,
    topProducts: topProductsStats,
    ts: Date.now()
  });
});

// ====== START SERVER ======

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 ASKED Store backend запущен на порту ${PORT}`);
});
