import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "@components/BannerCard";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.toString().replace(/\/$/, "") || "";

interface PromoResponse {
  ok: boolean;
  banner: Banner;
  error?: string;
}

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
  const [banner, setBanner] = useState<Banner | null>(null);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeDiff> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBanner = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/banners/${slug}`);
        const data: PromoResponse = await res.json();
        if (data?.ok && data.banner) {
          setBanner(data.banner);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [slug]);

  useEffect(() => {
    if (!banner?.dateEnd) return;
    const tick = () => {
      setTimeLeft(getTimeDiff(banner.dateEnd));
    };
    tick();
    const id = setInterval(tick, 60000); // обновляем раз в минуту
    return () => clearInterval(id);
  }, [banner?.dateEnd]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Загрузка...
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Баннер не найден</h1>
          <p className="text-sm text-white/60">Попробуйте вернуться на главную</p>
        </div>
      </div>
    );
  }

  const expired = banner.dateEnd && !timeLeft;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full h-[260px] overflow-hidden rounded-b-3xl">
        <img
          src={banner.imageUrl}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <h1 className="text-2xl font-bold leading-tight">{banner.title}</h1>
          {banner.subtitle && (
            <p className="text-sm text-white/80">{banner.subtitle}</p>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {banner.dateEnd && (
          <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 flex items-center justify-between">
            <div className="text-xs text-white/60 uppercase tracking-[0.2em]">
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
          className="w-full mt-2 py-3 rounded-full text-sm font-semibold shadow-lg text-white"
          style={{ backgroundColor: banner.buttonColor || "#A855F7" }}
        >
          {banner.buttonText || "Участвовать"}
        </button>
      </div>
    </div>
  );
};

export default PromoPage;

