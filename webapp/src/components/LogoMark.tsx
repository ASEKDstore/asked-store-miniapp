import React from "react";

export const LogoMark: React.FC = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src="/asked-logo.png"
        alt="ASKED"
        className="w-9 h-9 rounded-full object-cover"
      />
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
          ASKED
        </span>
        <span className="text-sm font-semibold text-white/90">Store</span>
      </div>
    </div>
  );
};
