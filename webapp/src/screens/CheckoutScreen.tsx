import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";
import { useTelegram } from "@auth/useTelegram";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";

type DeliveryMethod = "СДЭК" | "Авито" | "Почта России" | "Курьер по городу";

const deliveryOptions: DeliveryMethod[] = [
  "СДЭК",
  "Авито",
  "Почта России",
  "Курьер по городу"
];

type OrderResponse =
  | {
      ok: true;
      order: {
        id: number;
        number: string;
      };
    }
  | {
      ok: false;
      message?: string;
    };

const CheckoutScreen: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useTelegram();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("СДЭК");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length || submitting) return;

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

      const data: OrderResponse = await res.json();

      if (!data.ok) {
        setError(data.message || "Не удалось оформить заказ.");
        return;
      }

      clearCart();

      // Можно потом сделать отдельный экран "Спасибо за заказ"
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Ошибка связи с сервером. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="space-y-4">
        <section className="asked-card px-4 py-4 text-sm screen-card-pop">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
            оформление заказа
          </div>
          <div className="font-semibold mb-2">Корзина пуста</div>
          <p className="text-[11px] text-slate-400">
            Добавьте товары в корзину перед оформлением заказа.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          оформление заказа
        </div>
        <div className="font-semibold mb-1">Заполните данные получателя</div>
        <p className="text-[11px] text-slate-400 mb-3">
          Мы используем эти данные только для доставки и связи по заказу.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <label className="text-slate-400">ФИО</label>
            <input
              className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none"
              placeholder="Как к вам обращаться"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-400">Номер телефона</label>
            <input
              className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none"
              placeholder="+7 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-400">Адрес доставки</label>
            <textarea
              className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none resize-none min-h-[60px]"
              placeholder="Город, улица, дом, квартира / или адрес пункта выдачи"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-slate-400">Способ доставки</span>
            <div className="flex flex-wrap gap-2">
              {deliveryOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`px-3 py-1.5 rounded-full border asked-tap ${
                    deliveryMethod === opt
                      ? "border-askedAccentSoft bg-askedAccentSoft/10 text-slate-50"
                      : "border-slate-700 text-slate-400"
                  }`}
                  onClick={() => setDeliveryMethod(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-400">Комментарий к заказу</label>
            <textarea
              className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 outline-none resize-none min-h-[60px]"
              placeholder="Например: позвонить за 10 минут до доставки, оставить у двери и т.п."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          {error && (
            <div className="mt-1 text-[11px] text-red-400">{error}</div>
          )}
          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>Товаров: {items.length}</span>
              <span className="text-askedAccentSoft font-semibold">
                Итого: {totalPrice.toLocaleString("ru-RU")} ₽
              </span>
            </div>
            <button
              type="submit"
              className="asked-tap w-full py-2 rounded-xl bg-askedAccentSoft font-semibold text-xs disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Отправляем заказ…" : "Оформить заказ"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CheckoutScreen;

