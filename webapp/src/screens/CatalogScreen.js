import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const CatalogScreen = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [tag, setTag] = useState("all");
    const [sort, setSort] = useState("popular");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    useEffect(() => {
        const fetchCatalog = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${API_BASE}/catalog`);
                const data = await res.json();
                if (!data.ok) {
                    setError(data.message || "Не удалось загрузить каталог.");
                    setAllProducts([]);
                }
                else {
                    setAllProducts(data.items);
                }
            }
            catch (e) {
                console.error(e);
                setError("Ошибка связи с сервером.");
                setAllProducts([]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCatalog();
    }, []);
    useEffect(() => {
        if (!allProducts.length)
            return;
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
        }
        else if (sort === "price-desc") {
            items = items.sort((a, b) => b.price - a.price);
        }
        return items;
    }, [query, category, tag, sort, allProducts]);
    const handleAddToCart = (p, size) => {
        const nameWithSize = size ? `${p.name} · ${size}` : p.name;
        addToCart({
            id: size ? `${p.id}-${size}` : p.id,
            name: nameWithSize,
            price: p.price,
            tag: p.tag
        });
    };
    const openDetails = (p) => {
        setSelectedProduct(p);
        setSelectedSize(p.sizes[0] || null);
    };
    const closeDetails = () => {
        setSelectedProduct(null);
        setSelectedSize(null);
    };
    const handleBuyNow = () => {
        if (!selectedProduct)
            return;
        handleAddToCart(selectedProduct, selectedSize || undefined);
        closeDetails();
        navigate("/cart");
    };
    const handleAddFromDetails = () => {
        if (!selectedProduct)
            return;
        handleAddToCart(selectedProduct, selectedSize || undefined);
    };
    return (_jsxs("div", { className: "space-y-3 pb-16", children: [_jsx("section", { className: "asked-card px-3 py-3 text-sm screen-card-pop", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsx("input", { className: "flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none placeholder:text-slate-500", placeholder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443...", value: query, onChange: (e) => setQuery(e.target.value) }) }), _jsx("div", { className: "flex flex-wrap gap-2 text-[11px]", children: _jsx("div", { className: "flex gap-1 flex-wrap", children: [
                                    { id: "all", label: "Все" },
                                    { id: "hoodie", label: "Худи" },
                                    { id: "tee", label: "Футболки" },
                                    { id: "cap", label: "Кепки" },
                                    { id: "accessory", label: "Аксессуары" }
                                ].map((c) => (_jsx("button", { type: "button", onClick: () => setCategory(c.id), className: `px-3 py-1 rounded-full border asked-tap ${category === c.id
                                        ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                                        : "border-slate-700 text-slate-400"}`, children: c.label }, c.id))) }) }), _jsxs("div", { className: "flex items-center justify-between gap-2 text-[11px] mt-1", children: [_jsx("div", { className: "flex gap-1", children: [
                                        { id: "all", label: "Все" },
                                        { id: "limited", label: "Лимит" },
                                        { id: "drop", label: "Дроп" },
                                        { id: "new", label: "New" }
                                    ].map((t) => (_jsx("button", { type: "button", onClick: () => setTag(t.id), className: `px-2.5 py-1 rounded-full border asked-tap ${tag === t.id
                                            ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                                            : "border-slate-700 text-slate-500"}`, children: t.label }, t.id))) }), _jsxs("select", { className: "bg-slate-950/80 border border-slate-800 rounded-xl px-2 py-1 text-[11px] outline-none", value: sort, onChange: (e) => setSort(e.target.value), children: [_jsx("option", { value: "popular", children: "\u043F\u043E \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u0438" }), _jsx("option", { value: "price-asc", children: "\u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u0435\u0448\u0451\u0432\u044B\u0435" }), _jsx("option", { value: "price-desc", children: "\u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0433\u0438\u0435" })] })] }), error && (_jsx("div", { className: "text-[11px] text-red-400 mt-1", children: error }))] }) }), _jsxs("section", { className: "asked-card px-3 py-3 text-sm screen-card-pop", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.16em] text-slate-500", children: "\u043A\u0430\u0442\u0430\u043B\u043E\u0433" }), _jsx("div", { className: "text-[11px] text-slate-500", children: loading
                                    ? "обновляем…"
                                    : `${filtered.length} из ${allProducts.length} позиций` })] }), loading ? (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2", children: Array.from({ length: 6 }).map((_, idx) => (_jsxs("div", { className: "catalog-card skeleton-card flex flex-col rounded-xl overflow-hidden", children: [_jsx("div", { className: "aspect-square skeleton-block" }), _jsxs("div", { className: "px-2 py-2 flex flex-col gap-1", children: [_jsx("div", { className: "h-3 w-4/5 skeleton-line" }), _jsx("div", { className: "h-3 w-2/5 skeleton-line" })] })] }, idx))) })) : filtered.length === 0 ? (_jsx("div", { className: "text-[12px] text-slate-500 text-center mt-4", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043F\u043E\u0434 \u0442\u0430\u043A\u043E\u0439 \u0437\u0430\u043F\u0440\u043E\u0441. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u0438\u043B\u0438 \u043F\u043E\u0438\u0441\u043A." })) : (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2", children: filtered.map((p) => (_jsxs("article", { className: "catalog-card asked-card flex flex-col overflow-hidden card-pop cursor-pointer", onClick: () => openDetails(p), children: [_jsx("div", { className: "w-full aspect-square bg-slate-900/60 border-b border-slate-800 flex items-center justify-center", children: _jsx("img", { src: p.imageUrl, alt: p.name, className: "w-full h-full object-cover", loading: "lazy" }) }), _jsxs("div", { className: "px-2 py-2 flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between gap-1", children: [_jsx("div", { className: "text-[11px] font-medium text-slate-100 leading-tight line-clamp-2", children: p.name }), p.tag && (_jsx("span", { className: "text-[9px] uppercase tracking-[0.16em] text-askedAccentSoft ml-1", children: p.tag }))] }), _jsxs("div", { className: "mt-1 flex items-center justify-between text-[11px]", children: [_jsxs("span", { className: "text-askedAccentSoft font-semibold", children: [p.price.toLocaleString("ru-RU"), " \u20BD"] }), _jsx("button", { type: "button", className: "asked-tap px-2 py-1 rounded-lg bg-slate-800 text-[10px]", onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(p);
                                                    }, children: "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" })] })] })] }, p.id))) }))] }), selectedProduct && (_jsx("div", { className: "fixed inset-0 z-40 flex flex-col bg-black/60 backdrop-blur-sm details-sheet-backdrop", onClick: closeDetails, children: _jsxs("div", { className: "mt-auto w-full max-w-md mx-auto rounded-t-3xl bg-askedCard border border-slate-800 details-sheet-slide", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between px-4 pt-3 pb-1", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-slate-500", children: "\u0442\u043E\u0432\u0430\u0440" }), _jsx("button", { className: "text-[11px] text-slate-400 asked-tap", onClick: closeDetails, children: "\u0437\u0430\u043A\u0440\u044B\u0442\u044C" })] }), _jsxs("div", { className: "px-4 pb-3", children: [_jsx("div", { className: "w-full aspect-[4/3] rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden mb-3", children: _jsx("img", { src: selectedProduct.imageUrl, alt: selectedProduct.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsx("h2", { className: "text-sm font-semibold text-slate-50", children: selectedProduct.name }), selectedProduct.tag && (_jsx("span", { className: "text-[10px] uppercase tracking-[0.16em] text-askedAccentSoft", children: selectedProduct.tag }))] }), _jsxs("div", { className: "text-[12px] text-askedAccentSoft font-semibold", children: [selectedProduct.price.toLocaleString("ru-RU"), " \u20BD"] }), _jsx("p", { className: "mt-1 text-[11px] text-slate-400", children: selectedProduct.description })] })] }), _jsxs("div", { className: "px-4 pb-3 border-t border-slate-800/80", children: [_jsx("div", { className: "text-[11px] text-slate-400 mb-1", children: "\u0420\u0430\u0437\u043C\u0435\u0440 / Size" }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedProduct.sizes.map((s) => (_jsx("button", { type: "button", className: `px-3 py-1 rounded-full border text-[11px] asked-tap ${selectedSize === s
                                            ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                                            : "border-slate-700 text-slate-300"}`, onClick: () => setSelectedSize(s), children: s }, s))) }), !selectedSize && (_jsx("div", { className: "mt-1 text-[10px] text-red-400", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u043A\u0443\u043F\u043A\u043E\u0439." }))] }), _jsx("div", { className: "px-4 pb-4 pt-2 border-t border-slate-800/80", children: _jsxs("div", { className: "flex flex-col gap-2 text-[12px]", children: [_jsx("button", { type: "button", className: "asked-tap w-full py-2 rounded-xl bg-askedAccentSoft font-semibold disabled:opacity-60", disabled: !selectedSize, onClick: handleBuyNow, children: "\u041A\u0443\u043F\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441" }), _jsx("button", { type: "button", className: "asked-tap w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 disabled:opacity-60", disabled: !selectedSize, onClick: handleAddFromDetails, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "\u041F\u043E\u0437\u0436\u0435 \u043C\u043E\u0436\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0434\u0433\u0440\u0443\u0436\u0430\u0442\u044C \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0444\u043E\u0442\u043E \u0438\u0437 CMS \u0438\u043B\u0438 admin-\u043F\u0430\u043D\u0435\u043B\u0438." })] }) })] }) }))] }));
};
export default CatalogScreen;
