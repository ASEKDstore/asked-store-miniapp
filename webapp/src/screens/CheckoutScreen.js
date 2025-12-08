import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";
import { useTelegram } from "@auth/useTelegram";
const API_BASE = import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";
const deliveryOptions = [
    "СДЭК",
    "Авито",
    "Почта России",
    "Курьер по городу"
];
const CheckoutScreen = () => {
    const { items, totalPrice, clearCart } = useCart();
    const { user } = useTelegram();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("СДЭК");
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!items.length || submitting)
            return;
        if (!fullName.trim() || !phone.trim() || !address.trim()) {
            setError("Пожалуйста, заполните ФИО, телефон и адрес.");
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            const body = {
                fullName: fullName.trim(),
                phone: phone.trim(),
                address: address.trim(),
                deliveryMethod,
                comment: comment.trim() || undefined,
                items: items.map((it) => ({
                    id: it.id,
                    name: it.name,
                    price: it.price,
                    qty: it.quantity,
                    tag: it.tag
                })),
                totalPrice,
                telegramUserId: user?.id,
                telegramUsername: user?.username
            };
            const res = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!data.ok) {
                setError(data.message || "Не удалось оформить заказ.");
                return;
            }
            clearCart();
            // Можно потом сделать отдельный экран "Спасибо за заказ"
            navigate("/");
        }
        catch (err) {
            console.error(err);
            setError("Ошибка связи с сервером. Попробуйте ещё раз.");
        }
        finally {
            setSubmitting(false);
        }
    };
    if (!items.length) {
        return (_jsx("div", { className: "space-y-4", children: _jsxs("section", { className: "asked-card px-4 py-4 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430" }), _jsx("div", { className: "font-semibold mb-2", children: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u043F\u0435\u0440\u0435\u0434 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435\u043C \u0437\u0430\u043A\u0430\u0437\u0430." })] }) }));
    }
    return (_jsx("div", { className: "space-y-4 pb-16", children: _jsxs("section", { className: "asked-card px-4 py-4 text-sm screen-card-pop", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1", children: "\u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430" }), _jsx("div", { className: "font-semibold mb-1", children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F" }), _jsx("p", { className: "text-[11px] text-slate-400 mb-3", children: "\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u044D\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0438 \u0441\u0432\u044F\u0437\u0438 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0443." }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3 text-xs", children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-slate-400", children: "\u0424\u0418\u041E" }), _jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none", placeholder: "\u041A\u0430\u043A \u043A \u0432\u0430\u043C \u043E\u0431\u0440\u0430\u0449\u0430\u0442\u044C\u0441\u044F", value: fullName, onChange: (e) => setFullName(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-slate-400", children: "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" }), _jsx("input", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none", placeholder: "+7 ...", value: phone, onChange: (e) => setPhone(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-slate-400", children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438" }), _jsx("textarea", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none resize-none min-h-[60px]", placeholder: "\u0413\u043E\u0440\u043E\u0434, \u0443\u043B\u0438\u0446\u0430, \u0434\u043E\u043C, \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u0430 / \u0438\u043B\u0438 \u0430\u0434\u0440\u0435\u0441 \u043F\u0443\u043D\u043A\u0442\u0430 \u0432\u044B\u0434\u0430\u0447\u0438", value: address, onChange: (e) => setAddress(e.target.value) })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-slate-400", children: "\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438" }), _jsx("div", { className: "flex flex-wrap gap-2", children: deliveryOptions.map((opt) => (_jsx("button", { type: "button", className: `px-3 py-1.5 rounded-full border asked-tap ${deliveryMethod === opt
                                            ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                                            : "border-slate-700 text-slate-400"}`, onClick: () => setDeliveryMethod(opt), children: opt }, opt))) })] }), _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("label", { className: "text-slate-400", children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443" }), _jsx("textarea", { className: "bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none resize-none min-h-[60px]", placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C \u0437\u0430 10 \u043C\u0438\u043D\u0443\u0442 \u0434\u043E \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438, \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0443 \u0434\u0432\u0435\u0440\u0438 \u0438 \u0442.\u043F.", value: comment, onChange: (e) => setComment(e.target.value) })] }), error && (_jsx("div", { className: "mt-1 text-[11px] text-red-400", children: error })), _jsxs("div", { className: "mt-2 flex flex-col gap-2", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] text-slate-300", children: [_jsxs("span", { children: ["\u0422\u043E\u0432\u0430\u0440\u043E\u0432: ", items.length] }), _jsxs("span", { className: "text-askedAccentSoft font-semibold", children: ["\u0418\u0442\u043E\u0433\u043E: ", totalPrice.toLocaleString("ru-RU"), " \u20BD"] })] }), _jsx("button", { type: "submit", className: "asked-tap w-full py-2 rounded-xl bg-askedAccentSoft font-semibold text-xs disabled:opacity-60", disabled: submitting, children: submitting ? "Отправляем заказ…" : "Оформить заказ" })] })] })] }) }));
};
export default CheckoutScreen;
