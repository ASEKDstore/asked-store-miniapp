import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from "react";
const CartContext = createContext(undefined);
export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const addToCart = (product) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };
    const removeFromCart = (id) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };
    const clearCart = () => setItems([]);
    const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    const value = {
        items,
        total,
        totalPrice: total,
        addToCart,
        removeFromCart,
        clearCart
    };
    return _jsx(CartContext.Provider, { value: value, children: children });
};
export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return ctx;
};
