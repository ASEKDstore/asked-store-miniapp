import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Banner } from "@components/BannerCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getTimeDiff = (dateEnd?: string) => {
  if (!dateEnd) return null;
  const target = new Date(dateEnd).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
};

const PromoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [banner, setBanner] = useState<Banner | null>(null);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeDiff> | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;

      try {
        const res = await fetch(`${API_BASE}/api/banners/${slug}`);
        const json = await res.json();
        if (json.ok && json.banner) {
          setBanner(json.banner);
        } else {
          // fallback: вернуться назад
          navigate(-1);
        }
      } catch (e) {
        navigate(-1);
      }
    };
    load();
  }, [slug, navigate]);

  useEffect(() => {
    if (!banner?.dateEnd) return;

    const tick = () => {
      setTimeLeft(getTimeDiff(banner.dateEnd));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [banner?.dateEnd]);

  if (!banner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Загрузка…
      </div>
    );
  }

  const expired = banner.dateEnd && !timeLeft;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* верхний баннер */}
      <div className="relative w-full h-[260px] overflow-hidden rounded-b-3xl">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/80 text-lg"
        >
          ←
        </button>
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <h1 className="text-2xl font-bold leading-tight">{banner.title}</h1>
          {banner.subtitle && (
            <p className="text-sm text-white/80">{banner.subtitle}</p>
          )}
        </div>
      </div>

      {/* контент */}
      <div className="px-4 py-4 space-y-4">
        {banner.dateEnd && (
          <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">
              До конца акции
            </div>
            {expired ? (
              <div className="text-sm text-red-400 font-semibold">
                Акция завершилась
              </div>
            ) : timeLeft ? (
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>{timeLeft.days}д</span>
                <span>{timeLeft.hours}ч</span>
                <span>{timeLeft.minutes}м</span>
              </div>
            ) : (
              <div className="text-sm text-white/70">Скоро завершится</div>
            )}
          </div>
        )}

        {banner.description && (
          <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80 leading-relaxed">
            {banner.description}
          </div>
        )}

        <button
          type="button"
          className="w-full mt-2 py-3 rounded-full text-sm font-semibold shadow-lg bg-[#A855F7] active:scale-95 transition"
        >
          {banner.buttonText || "Участвовать"}
        </button>
      </div>
    </div>
  );
};

export default PromoPage;
