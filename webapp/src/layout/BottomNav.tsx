import React from "react";
import { NavLink } from "react-router-dom";

type Item = {
  id: string;
  label: string;
  to: string;
};

const items: Item[] = [
  { id: "home", label: "Главная", to: "/" },
  { id: "catalog", label: "Каталог", to: "/catalog" },
  { id: "limited", label: "Limited", to: "/limited" },
  { id: "cart", label: "Корзина", to: "/cart" }
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-3 mb-3 asked-card px-3 py-2 flex items-center justify-between text-xs">
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex flex-col items-center flex-1 py-1 asked-tap",
                isActive ? "text-slate-50" : "text-slate-500"
              ].join(" ")
            }
          >
            <span className="text-[11px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
