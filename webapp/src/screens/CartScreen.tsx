import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@context/CartContext";

const CartScreen: React.FC = () => {
  const { items, totalPrice, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <div className="space-y-4">
        <section className="asked-card px-4 py-4 text-sm screen-card-pop">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
            корзина
          </div>
          <div className="font-semibold mb-1">У тебя пока ничего нет</div>
          <p className="text-[11px] text-slate-400 mb-2">
            Добавляй вещи из каталога и limited-раздела — здесь появится сборка
            твоего заказа.
          </p>
          <button
            className="asked-tap mt-1 px-3 py-1.5 rounded-xl bg-askedAccentSoft text-[11px] font-semibold"
            onClick={() => navigate("/catalog")}
          >
            Перейти в каталог
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft">
            корзина
          </div>
          <button
            className="text-[11px] text-slate-500 asked-tap"
            onClick={clearCart}
          >
            Очистить
          </button>
        </div>
        <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto no-scrollbar">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60 last:border-b-0"
            >
              <div className="flex-1 pr-2">
                <div className="text-slate-100 text-[11px] leading-snug">
                  {item.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {item.price.toLocaleString("ru-RU")} ₽ × {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-slate-200">
                  {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                </span>
                <button
                  className="text-[10px] text-slate-500 asked-tap"
                  onClick={() => removeFromCart(item.id)}
                >
                  убрать
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Итого</span>
          <span className="text-askedAccentSoft font-semibold">
            {totalPrice.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-2 text-[11px]">
          <button
            className="asked-tap w-full py-2 rounded-xl bg-askedAccentSoft font-semibold"
            onClick={() => navigate("/checkout")}
          >
            Оформить заказ
          </button>
          <p className="text-[10px] text-slate-500">
            После подтверждения заказа его данные уйдут модератору в Telegram, а
            статус можно будет смотреть на главной странице.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CartScreen;
