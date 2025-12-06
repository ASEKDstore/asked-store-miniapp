import React, { useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";

type SecretDrop = {
  id: string;
  name: string;
  level: "limited" | "ultra" | "test";
  status: "online" | "soon";
};

type LimitedPass = {
  series: string;
  batch: string;
  number: string;
  cardId: string;
  ownerName: string;
  tier: "core" | "alpha" | "ghost";
};

type LimitedCheckResponse =
  | {
      ok: true;
      pass: LimitedPass;
      drops: SecretDrop[];
    }
  | {
      ok: false;
      message?: string;
    };

const VipScreen: React.FC = () => {
  const [code, setCode] = useState("AX7$Q2L@");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pass, setPass] = useState<LimitedPass | null>(null);
  const [drops, setDrops] = useState<SecretDrop[]>([]);
  const [activated, setActivated] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/limited/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });

      const data: LimitedCheckResponse = await res.json();

      if (!data.ok) {
        setPass(null);
        setDrops([]);
        setActivated(false);
        setCardFlipped(false);
        setError(data.message || "Промокод не принят.");
      } else {
        setPass(data.pass);
        setDrops(data.drops || []);
        setActivated(true);
        setCardFlipped(true);
        setError(null);
      }
    } catch (e) {
      console.error(e);
      setError("Ошибка соединения с сервером. Проверь backend /limited/check.");
      setPass(null);
      setDrops([]);
      setActivated(false);
      setCardFlipped(false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const tierLabel = (tier: LimitedPass["tier"]) => {
    switch (tier) {
      case "alpha":
        return "ALPHA";
      case "ghost":
        return "GHOST";
      default:
        return "CORE";
    }
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Карта доступа */}
      <section className="asked-card px-4 py-4 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          limited access
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-stretch gap-4">
          <div className="flex-1 space-y-2 text-[12px]">
            <h1 className="text-[16px] font-semibold">
              Лимитированный цифровой пропуск ASKED
            </h1>
            <p className="text-[12px] text-slate-400">
              Цифровая карта доступа к закрытым дропам ASKED. Введите промокод,
              активируйте &quot;магнитный ключ&quot; и переверните карту, чтобы
              увидеть свой пропуск и секретные дропы.
            </p>
            {activated && pass && (
              <div className="mt-2 text-[11px] text-slate-400">
                Пропуск активирован:{" "}
                <span className="text-askedAccentSoft font-semibold">
                  {pass.cardId} · серия {pass.series} · партия {pass.batch}
                </span>
              </div>
            )}
          </div>

          {/* Карта */}
          <div className="w-full md:w-[280px]">
            <button
              type="button"
              className="asked-tap relative w-full aspect-[3/2] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 card-pop"
              onClick={() => {
                if (activated) setCardFlipped((v) => !v);
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.35),transparent_55%)]" />
              <div className="relative w-full h-full px-4 py-3 flex flex-col justify-between text-left">
                {!cardFlipped && (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>ASKED / LIMITED</span>
                      <span className="px-2 py-0.5 rounded-full bg-askedAccentSoft/10 text-askedAccentSoft text-[10px]">
                        magnetic key
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400">
                        digital access pass
                      </div>
                      <div className="text-[14px] font-semibold tracking-[0.24em] uppercase">
                        ASKED·LIM·XXX
                      </div>
                      <div className="text-[10px] text-slate-500">
                        drop season · 2025 · province / street / it
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>ID: ****-****-LIM-***</span>
                      <span className="text-slate-300">
                        {activated ? "tap to flip" : "введите ключ"}
                      </span>
                    </div>
                  </>
                )}
                {cardFlipped && pass && (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>ASKED / LIMITED</span>
                      <span className="px-2 py-0.5 rounded-full bg-askedAccentSoft/10 text-askedAccentSoft text-[10px]">
                        {tierLabel(pass.tier)} ACCESS
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-400">
                        digital pass for
                      </div>
                      <div className="text-[14px] font-semibold uppercase">
                        {pass.ownerName || "limited holder"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ID: {pass.cardId}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        series {pass.series} · batch {pass.batch} · №
                        {pass.number}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>secret drops: {drops.length || "—"}</span>
                      <span className="text-slate-300">tap to flip back</span>
                    </div>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Форма ввода кода */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          ключ доступа
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-[12px] outline-none placeholder:text-slate-500"
              placeholder="Введите промокод / ключ доступа"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              type="button"
              className="asked-tap px-4 py-2 rounded-xl bg-askedAccentSoft text-[12px] font-semibold disabled:opacity-60"
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
            >
              {loading ? "Проверяем..." : "Ключ"}
            </button>
          </div>
          {error && (
            <div className="text-[11px] text-red-400">{error}</div>
          )}
          {!error && activated && (
            <div className="text-[11px] text-askedAccentSoft">
              Ключ принят. Карта активирована, смотри карту и секретные дропы
              ниже.
            </div>
          )}
        </div>
      </section>

      {/* Секретные дропы */}
      <section className="asked-card px-4 py-3 text-sm screen-card-pop">
        <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
          как получить limited-пропуск
        </div>
        <ul className="text-[11px] text-slate-400 space-y-1 mb-3">
          <li>Участвовать в закрытых активностях ASKED.</li>
          <li>Ловить промокоды из дропов, ивентов и коллаб.</li>
          <li>Быть частью ASKED-сообщества (чат, канал, оффлайн-движ).</li>
        </ul>

        <div className="mt-2 border-t border-slate-800/80 pt-2">
          <div className="text-[11px] uppercase tracking-[0.18em] text-askedAccentSoft mb-1">
            секретные дропы
          </div>
          {activated && drops.length > 0 ? (
            <ul className="space-y-1 text-[11px] text-slate-300">
              {drops.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between border border-slate-800 rounded-xl px-3 py-2 bg-slate-950/60"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{d.name}</span>
                    <span className="text-[10px] text-slate-500">
                      уровень: {d.level} · статус:{" "}
                      {d.status === "online" ? "доступен" : "скоро"}
                    </span>
                  </div>
                  {d.status === "online" && (
                    <span className="text-[10px] text-askedAccentSoft">
                      OPEN
                    </span>
                  )}
                  {d.status === "soon" && (
                    <span className="text-[10px] text-slate-500">
                      soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-[11px] text-slate-500">
              Секретные дропы откроются после активации действительного
              limited-кода.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VipScreen;
