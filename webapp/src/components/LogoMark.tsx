import React from "react";

export const LogoMark: React.FC<{ compact?: boolean }> = ({ compact }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-violet-500 shadow-[0_0_18px_rgba(56,189,248,0.6)]">
        <img
          src="/asked-logo.svg"
          alt="ASKED"
          className="w-5 h-5 object-contain"
        />
      </div>
      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/40">
            ASKED
          </span>
          <span className="text-sm font-semibold text-white/90">
            Store
          </span>
        </div>
      )}
    </div>
  );
};

