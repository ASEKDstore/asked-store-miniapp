import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useTelegram } from "@auth/useTelegram";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || "";
const AdminScreen = () => {
    const { user } = useTelegram();
    const [tab, setTab] = useState("products");
    const [authError, setAuthError] = useState(null);
    // Products
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        category: "hoodie",
        description: "",
        sizes: ["S", "M", "L"],
        imageUrl: ""
    });
    // Home content
    const [home, setHome] = useState(null);
    const [loadingHome, setLoadingHome] = useState(false);
    // Promocodes
    const [promoCodes, setPromoCodes] = useState([]);
    const [loadingCodes, setLoadingCodes] = useState(false);
    const [promoPrefix, setPromoPrefix] = useState("ASK");
    const [promoCount, setPromoCount] = useState(5);
    const [promoTier, setPromoTier] = useState("core");
    // Stats
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    // Files
    const [files, setFiles] = useState([]);
    const [loadingFiles, setLoadingFiles] = useState(false);
    // Users
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    // Banners
    const [banners, setBanners] = useState([]);
    const [loadingBanners, setLoadingBanners] = useState(false);
    const [newBanner, setNewBanner] = useState({
        slug: "",
        title: "",
        subtitle: "",
        imageUrl: "",
        buttonText: "Подробнее",
        buttonColor: "#A855F7",
        description: "",
        dateEnd: "",
        isActive: true
    });
    // Ранний возврат, если токен не задан
    if (!ADMIN_TOKEN) {
        return (_jsx("div", { className: "space-y-4 pb-16", children: _jsxs("section", { className: "asked-card px-4 py-4 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "admin" }), _jsx("div", { className: "font-semibold mb-1", children: "\u0410\u0434\u043C\u0438\u043D-\u043F\u0430\u043D\u0435\u043B\u044C \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0430" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "\u041D\u0435 \u0437\u0430\u0434\u0430\u043D VITE_ADMIN_TOKEN. \u0414\u043E\u0431\u0430\u0432\u044C \u0435\u0433\u043E \u0432 .env \u0444\u0440\u043E\u043D\u0442\u0430 \u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435, \u0447\u0442\u043E\u0431\u044B \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0438 \u0442\u043E\u0432\u0430\u0440\u0430\u043C\u0438." })] }) }));
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
            }
            else {
                setProducts(data.items || []);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке товаров.");
        }
        finally {
            setLoadingProducts(false);
        }
    };
    const fetchHome = async () => {
        setLoadingHome(true);
        setAuthError(null);
        try {
            const res = await fetch(`${API_BASE}/admin/home`, {
                headers: authHeader
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Ошибка загрузки контента главной");
            }
            else {
                setHome(data.content);
                setAuthError(null);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке главной.");
        }
        finally {
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
            }
            else {
                setPromoCodes(data.codes || []);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке промокодов.");
        }
        finally {
            setLoadingCodes(false);
        }
    };
    const fetchStats = async () => {
        setLoadingStats(true);
        try {
            const res = await fetch(`${API_BASE}/admin/stats`, {
                headers: authHeader
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError("Ошибка загрузки статистики");
            }
            else {
                setStats(data);
                setLastUpdated(data.ts || Date.now());
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке статистики.");
        }
        finally {
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
            }
            else {
                setFiles(data.items || []);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке файлов.");
        }
        finally {
            setLoadingFiles(false);
        }
    };
    const handleUploadFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
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
            }
            else {
                fetchFiles();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке файла.");
        }
    };
    const handleDeleteFile = async (filename) => {
        try {
            const res = await fetch(`${API_BASE}/admin/files/${filename}`, {
                method: "DELETE",
                headers: authHeader
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось удалить файл");
            }
            else {
                fetchFiles();
            }
        }
        catch (e) {
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
            }
            else {
                setUsers(data.users || []);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке пользователей.");
        }
        finally {
            setLoadingUsers(false);
        }
    };
    const handleUpdateUserRole = async (telegramUserId, role) => {
        try {
            const res = await fetch(`${API_BASE}/admin/users/${telegramUserId}/role`, {
                method: "PATCH",
                headers: authHeader,
                body: JSON.stringify({ role })
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось обновить роль");
            }
            else {
                fetchUsers();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при обновлении роли.");
        }
    };
    const fetchBanners = async () => {
        setLoadingBanners(true);
        try {
            const res = await fetch(`${API_BASE}/api/admin/banners`, {
                headers: authHeader
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Ошибка загрузки баннеров");
            }
            else {
                setBanners(data.banners || []);
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при загрузке баннеров.");
        }
        finally {
            setLoadingBanners(false);
        }
    };
    const handleCreateBanner = async () => {
        if (!newBanner.slug || !newBanner.title || !newBanner.imageUrl || !newBanner.buttonText) {
            setAuthError("Заполните обязательные поля: slug, title, imageUrl, buttonText");
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/api/admin/banners`, {
                method: "POST",
                headers: authHeader,
                body: JSON.stringify(newBanner)
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось создать баннер");
            }
            else {
                setNewBanner({
                    slug: "",
                    title: "",
                    subtitle: "",
                    imageUrl: "",
                    buttonText: "Подробнее",
                    buttonColor: "#A855F7",
                    description: "",
                    dateEnd: "",
                    isActive: true
                });
                fetchBanners();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при создании баннера.");
        }
    };
    const handleUpdateBanner = async (id, patch) => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/banners/${id}`, {
                method: "PATCH",
                headers: authHeader,
                body: JSON.stringify(patch)
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось обновить баннер");
            }
            else {
                fetchBanners();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при обновлении баннера.");
        }
    };
    const handleDeleteBanner = async (id) => {
        if (!confirm("Удалить баннер?"))
            return;
        try {
            const res = await fetch(`${API_BASE}/api/admin/banners/${id}`, {
                method: "DELETE",
                headers: authHeader
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось удалить баннер");
            }
            else {
                fetchBanners();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при удалении баннера.");
        }
    };
    useEffect(() => {
        if (!ADMIN_TOKEN)
            return;
        if (tab === "products") {
            fetchProducts();
        }
        else if (tab === "home") {
            fetchHome();
        }
        else if (tab === "promocodes") {
            fetchCodes();
        }
        else if (tab === "stats") {
            fetchStats();
        }
        else if (tab === "files") {
            fetchFiles();
        }
        else if (tab === "users") {
            fetchUsers();
        }
        else if (tab === "banners") {
            fetchBanners();
        }
    }, [tab, ADMIN_TOKEN]);
    // Realtime обновление статистики
    useEffect(() => {
        if (!ADMIN_TOKEN || tab !== "stats")
            return;
        fetchStats();
        const id = setInterval(fetchStats, 10000); // каждые 10 сек
        return () => clearInterval(id);
    }, [tab, ADMIN_TOKEN]);
    const handleCreateProduct = async () => {
        if (!newProduct.name || !newProduct.price)
            return;
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
            }
            else {
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
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при создании товара.");
        }
    };
    const handleSaveHome = async () => {
        if (!home)
            return;
        setAuthError(null);
        try {
            const res = await fetch(`${API_BASE}/admin/home`, {
                method: "PUT",
                headers: authHeader,
                body: JSON.stringify(home)
            });
            const data = await res.json();
            if (!data.ok) {
                setAuthError(data.message || "Не удалось сохранить контент главной");
            }
            else {
                setHome(data.content);
                setAuthError(null);
            }
        }
        catch (e) {
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
            }
            else {
                fetchCodes();
            }
        }
        catch (e) {
            console.error(e);
            setAuthError("Ошибка связи с сервером при генерации промокодов.");
        }
    };
    return (_jsx("div", { className: "space-y-3 pb-16 text-xs", children: _jsxs("section", { className: "asked-card px-4 py-3 screen-card-pop", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft", children: "admin" }), _jsx("div", { className: "flex gap-1 text-[10px] flex-wrap", children: ["products", "home", "banners", "promocodes", "stats", "files", "users"].map((t) => (_jsx("button", { className: `px-2 py-1 rounded-lg border asked-tap ${tab === t
                                    ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                                    : "border-slate-700 text-slate-400"}`, onClick: () => setTab(t), children: t === "products"
                                    ? "Товары"
                                    : t === "home"
                                        ? "Главная"
                                        : t === "banners"
                                            ? "Баннеры"
                                            : t === "promocodes"
                                                ? "Промокоды"
                                                : t === "stats"
                                                    ? "Статистика"
                                                    : t === "files"
                                                        ? "Файлы"
                                                        : "Пользователи" }, t))) })] }), authError && (_jsx("div", { className: "text-[11px] text-red-400 mb-2", children: authError })), tab === "products" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430\u043C\u0438 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430" }), loadingProducts ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs("div", { className: "max-h-52 overflow-y-auto no-scrollbar space-y-1", children: [products.map((p) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-3 py-2 flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("div", { className: "font-semibold text-[11px] text-slate-100", children: p.name }), _jsxs("div", { className: "text-[10px] text-askedAccentSoft", children: [p.price.toLocaleString("ru-RU"), " \u20BD"] })] }), _jsxs("div", { className: "text-[10px] text-slate-500", children: [p.category, " \u00B7 ", p.tag || "—"] }), _jsx("div", { className: "text-[10px] text-slate-500 truncate", children: p.imageUrl })] }, p.id))), !products.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0422\u043E\u0432\u0430\u0440\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442." }))] })), _jsxs("div", { className: "mt-2 pt-2 border-t border-slate-800", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", value: newProduct.name || "", onChange: (e) => setNewProduct((p) => ({ ...p, name: e.target.value })) }), _jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]", placeholder: "\u0426\u0435\u043D\u0430", type: "number", value: newProduct.price || 0, onChange: (e) => setNewProduct((p) => ({
                                                ...p,
                                                price: Number(e.target.value) || 0
                                            })) }), _jsxs("select", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]", value: newProduct.category || "hoodie", onChange: (e) => setNewProduct((p) => ({
                                                ...p,
                                                category: e.target.value
                                            })), children: [_jsx("option", { value: "hoodie", children: "\u0425\u0443\u0434\u0438" }), _jsx("option", { value: "tee", children: "\u0424\u0443\u0442\u0431\u043E\u043B\u043A\u0430" }), _jsx("option", { value: "cap", children: "\u041A\u0435\u043F\u043A\u0430" }), _jsx("option", { value: "accessory", children: "\u0410\u043A\u0441\u0435\u0441\u0441\u0443\u0430\u0440" })] }), _jsxs("select", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px]", value: newProduct.tag || "", onChange: (e) => setNewProduct((p) => ({
                                                ...p,
                                                tag: e.target.value || undefined
                                            })), children: [_jsx("option", { value: "", children: "\u2014 \u0442\u0435\u0433 \u2014" }), _jsx("option", { value: "limited", children: "limited" }), _jsx("option", { value: "drop", children: "drop" }), _jsx("option", { value: "new", children: "new" })] })] }), _jsx("textarea", { className: "mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full resize-none", placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", value: newProduct.description || "", onChange: (e) => setNewProduct((p) => ({
                                        ...p,
                                        description: e.target.value
                                    })) }), _jsx("input", { className: "mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full", placeholder: "\u0420\u0430\u0437\u043C\u0435\u0440\u044B (\u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E)", value: (newProduct.sizes || []).join(", "), onChange: (e) => setNewProduct((p) => ({
                                        ...p,
                                        sizes: e.target.value
                                            .split(",")
                                            .map((s) => s.trim())
                                            .filter(Boolean)
                                    })) }), _jsx("input", { className: "mt-2 bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none text-[11px] w-full", placeholder: "URL \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438", value: newProduct.imageUrl || "", onChange: (e) => setNewProduct((p) => ({
                                        ...p,
                                        imageUrl: e.target.value
                                    })) }), _jsx("button", { className: "asked-tap mt-2 px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold", onClick: handleCreateProduct, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440" })] })] })), tab === "home" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u041A\u043E\u043D\u0442\u0435\u043D\u0442 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B (\u0431\u0430\u043D\u043D\u0435\u0440\u044B, \u0430\u043A\u0446\u0438\u0438, \u0433\u0430\u043B\u0435\u0440\u0435\u044F, \u0441\u043E\u0446\u0441\u0435\u0442\u0438)" }), loadingHome || !home ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[11px] mb-1", children: "\u0411\u0430\u043D\u043D\u0435\u0440\u044B" }), _jsx("div", { className: "space-y-1 max-h-36 overflow-y-auto no-scrollbar", children: home.banners.map((b, idx) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1", children: [_jsx("input", { className: "bg-transparent outline-none text-[11px] text-slate-100", value: b.title, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.banners[idx] = {
                                                                ...b,
                                                                title: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } }), _jsx("input", { className: "bg-transparent outline-none text-[10px] text-slate-400", value: b.subtitle, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.banners[idx] = {
                                                                ...b,
                                                                subtitle: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } })] }, b.id))) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[11px] mb-1", children: "\u0410\u043A\u0446\u0438\u0438" }), _jsx("div", { className: "space-y-1 max-h-32 overflow-y-auto no-scrollbar", children: home.promos.map((p, idx) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1", children: [_jsx("input", { className: "bg-transparent outline-none text-[11px] text-slate-100", value: p.title, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.promos[idx] = {
                                                                ...p,
                                                                title: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } }), _jsx("textarea", { className: "bg-transparent outline-none text-[10px] text-slate-400 resize-none", value: p.text, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.promos[idx] = {
                                                                ...p,
                                                                text: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } })] }, p.id))) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[11px] mb-1", children: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F" }), _jsx("div", { className: "space-y-1 max-h-32 overflow-y-auto no-scrollbar", children: home.gallery.map((g, idx) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1", children: [_jsx("input", { className: "bg-transparent outline-none text-[11px] text-slate-100", value: g.label, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.gallery[idx] = {
                                                                ...g,
                                                                label: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } }), _jsx("input", { className: "bg-transparent outline-none text-[10px] text-slate-400", value: g.imageUrl, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.gallery[idx] = {
                                                                ...g,
                                                                imageUrl: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } })] }, g.id))) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-[11px] mb-1", children: "\u0421\u043E\u0446\u0441\u0435\u0442\u0438" }), _jsx("div", { className: "space-y-1 max-h-32 overflow-y-auto no-scrollbar", children: home.socials.map((s, idx) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex flex-col gap-1", children: [_jsx("input", { className: "bg-transparent outline-none text-[11px] text-slate-100", value: s.label, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.socials[idx] = {
                                                                ...s,
                                                                label: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } }), _jsx("input", { className: "bg-transparent outline-none text-[10px] text-slate-400", value: s.handle, onChange: (e) => {
                                                            const copy = { ...home };
                                                            copy.socials[idx] = {
                                                                ...s,
                                                                handle: e.target.value
                                                            };
                                                            setHome(copy);
                                                        } })] }, s.id))) })] }), _jsx("button", { className: "asked-tap mt-2 px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold", onClick: handleSaveHome, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })] }))] })), tab === "promocodes" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432" }), _jsxs("div", { className: "flex gap-2 text-[11px] mb-2", children: [_jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none", placeholder: "\u041F\u0440\u0435\u0444\u0438\u043A\u0441", value: promoPrefix, onChange: (e) => setPromoPrefix(e.target.value.toUpperCase()) }), _jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none w-16", placeholder: "\u0428\u0442\u0443\u043A", type: "number", value: promoCount, onChange: (e) => setPromoCount(Math.max(1, Number(e.target.value) || 1)) }), _jsxs("select", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-2 py-1 outline-none", value: promoTier, onChange: (e) => setPromoTier(e.target.value), children: [_jsx("option", { value: "core", children: "core" }), _jsx("option", { value: "alpha", children: "alpha" }), _jsx("option", { value: "ghost", children: "ghost" })] })] }), _jsx("button", { className: "asked-tap px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold", onClick: handleGenerateCodes, children: "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }), _jsx("div", { className: "mt-2 text-[11px] text-slate-400", children: "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432" }), loadingCodes ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs("div", { className: "max-h-48 overflow-y-auto no-scrollbar space-y-1", children: [promoCodes.map((c) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between", children: [_jsx("span", { className: "text-[11px] text-slate-100", children: c.code }), _jsx("span", { className: "text-[10px] text-slate-500", children: c.tier })] }, c.code + c.createdAt))), !promoCodes.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u041F\u0440\u043E\u043C\u043E\u043A\u043E\u0434\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442." }))] }))] })), tab === "stats" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0437\u0430\u043A\u0430\u0437\u043E\u0432" }), loadingStats || !stats ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-3 gap-2 text-[11px]", children: [_jsxs("div", { className: "border border-slate-800 rounded-xl px-2 py-2", children: [_jsx("div", { className: "text-[10px] text-slate-500", children: "\u0417\u0430\u043A\u0430\u0437\u043E\u0432 \u0432\u0441\u0435\u0433\u043E" }), _jsx("div", { className: "text-[13px] font-semibold text-slate-50", children: stats.totalOrders })] }), _jsxs("div", { className: "border border-slate-800 rounded-xl px-2 py-2", children: [_jsx("div", { className: "text-[10px] text-slate-500", children: "\u0412\u044B\u0440\u0443\u0447\u043A\u0430, \u20BD" }), _jsx("div", { className: "text-[13px] font-semibold text-slate-50", children: stats.totalRevenue.toLocaleString("ru-RU") })] }), _jsxs("div", { className: "border border-slate-800 rounded-xl px-2 py-2", children: [_jsx("div", { className: "text-[10px] text-slate-500", children: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0445 \u044E\u0437\u0435\u0440\u043E\u0432" }), _jsx("div", { className: "text-[13px] font-semibold text-slate-50", children: stats.uniqueUsers })] })] }), _jsxs("div", { className: "mt-2", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0422\u043E\u043F \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0430\u043C" }), _jsxs("div", { className: "max-h-40 overflow-y-auto no-scrollbar space-y-1", children: [stats.topProducts.map((t) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between", children: [_jsx("div", { className: "text-[11px] text-slate-100", children: t.name }), _jsxs("div", { className: "text-[10px] text-slate-500", children: [t.ordersCount, " \u0437\u0430\u043A\u0430\u0437\u043E\u0432 \u00B7 ", t.quantityTotal, " \u0448\u0442"] })] }, t.id))), !stats.topProducts.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u043A\u0430\u0437\u043E\u0432 \u0435\u0449\u0451 \u043D\u0435\u0442." }))] })] }), lastUpdated && (_jsxs("div", { className: "text-[10px] text-slate-500 mt-1", children: ["\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: ", new Date(lastUpdated).toLocaleTimeString("ru-RU")] }))] }))] })), tab === "files" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0424\u0430\u0439\u043B-\u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440" }), _jsx("div", { className: "mb-2", children: _jsx("input", { type: "file", accept: "image/*", onChange: handleUploadFile, className: "text-[11px]" }) }), loadingFiles ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs("div", { className: "max-h-64 overflow-y-auto no-scrollbar space-y-1", children: [files.map((f) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: `${API_BASE}${f.url}`, alt: f.filename, className: "w-10 h-10 object-cover rounded" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "text-[11px] text-slate-100 truncate max-w-[200px]", children: f.filename }), _jsx("div", { className: "text-[10px] text-slate-500", children: f.url })] })] }), _jsx("button", { className: "asked-tap px-2 py-1 rounded-lg bg-red-900/30 text-[10px] text-red-400", onClick: () => handleDeleteFile(f.filename), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }, f.filename))), !files.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0424\u0430\u0439\u043B\u043E\u0432 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442." }))] }))] })), tab === "users" && (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u0438 \u0440\u043E\u043B\u0438" }), loadingUsers ? (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u2026" })) : (_jsxs("div", { className: "max-h-64 overflow-y-auto no-scrollbar space-y-1", children: [users.map((u) => (_jsxs("div", { className: "border border-slate-800 rounded-lg px-2 py-2 flex items-center justify-between", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "text-[11px] text-slate-100", children: ["ID: ", u.telegramUserId, u.telegramUsername && ` (@${u.telegramUsername})`] }), _jsxs("div", { className: "text-[10px] text-slate-500", children: ["\u0417\u0430\u043A\u0430\u0437\u043E\u0432: ", u.ordersCount] })] }), _jsxs("select", { className: "bg-slate-950/70 border border-slate-800 rounded-lg px-2 py-1 text-[11px] outline-none", value: u.role, onChange: (e) => handleUpdateUserRole(u.telegramUserId, e.target.value), children: [_jsx("option", { value: "user", children: "user" }), _jsx("option", { value: "manager", children: "manager" }), _jsx("option", { value: "admin", children: "admin" })] })] }, u.telegramUserId))), !users.length && (_jsx("div", { className: "text-[11px] text-slate-500", children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442." }))] }))] }))] }) }));
};
export default AdminScreen;
