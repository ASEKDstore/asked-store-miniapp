import React from "react";

const chips = [
  "INSIDE-74",
  "ACCESS-01",
  "DROP-02",
  "ASKED-93KJ",
  "INSIDE-91",
  "DROP-002",
  "ACCESS-91",
  "INSIDE-17",
  "ASKED-93K4",
  "DROP-01",
  "INSIDE-01",
  "ACCESS-02"
];

const chipLayout: { top: string; left: string; delay: string; scale: number }[] =
  [
    { top: "8%", left: "12%", delay: "0s", scale: 1 },
    { top: "5%", left: "55%", delay: "0.3s", scale: 1.1 },
    { top: "14%", left: "72%", delay: "0.6s", scale: 0.95 },
    { top: "19%", left: "28%", delay: "0.9s", scale: 1.05 },
    { top: "24%", left: "8%", delay: "1.1s", scale: 0.9 },
    { top: "27%", left: "63%", delay: "1.4s", scale: 1.15 },
    { top: "31%", left: "40%", delay: "1.7s", scale: 1 },
    { top: "34%", left: "78%", delay: "2s", scale: 0.9 },
    { top: "38%", left: "18%", delay: "2.3s", scale: 1.05 },
    { top: "42%", left: "52%", delay: "2.6s", scale: 1 },
    { top: "46%", left: "68%", delay: "2.9s", scale: 0.95 },
    { top: "50%", left: "30%", delay: "3.1s", scale: 1.1 }
  ];

const appVersion: string =
  (import.meta.env.VITE_APP_VERSION as string | undefined) ||
  ((window as any).__APP_VERSION__ as string | undefined) ||
  "2.1.0";

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-root min-h-screen w-full bg-black text-slate-50 flex flex-col items-center justify-between relative overflow-hidden">
      {/* фоновые свечения */}
      <div className="pointer-events-none absolute inset-0 splash-bg" />

      {/* облако плашек */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-md h-[60vh]">
          {chips.map((label, index) => {
            const layout = chipLayout[index % chipLayout.length];

            return (
              <div
                key={label + index}
                className="glow-chip text-[10px] tracking-[0.16em] uppercase"
                style={{
                  top: layout.top,
                  left: layout.left,
                  animationDelay: layout.delay,
                  transform: `scale(${layout.scale})`
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* логотип, прогресс, подписи */}
      <div className="relative w-full max-w-md px-6 pb-10 flex flex-col items-center gap-4">
        <div className="text-[40px] md:text-[48px] font-semibold tracking-[0.28em] uppercase splash-logo-gradient">
          ASKED
        </div>

        <div className="w-full h-[2px] rounded-full overflow-hidden bg-slate-800/40">
          <div className="h-full splash-progress-bar" />
        </div>

        <div className="text-[11px] tracking-[0.25em] uppercase text-slate-400">
          LOADING…
        </div>

        <div className="mt-1 text-[10px] text-slate-500 text-center">
          v{appVersion} · разработано командой ASKED · 2025
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
