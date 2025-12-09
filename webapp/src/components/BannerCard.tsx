import React from "react";
import { useNavigate } from "react-router-dom";

export interface Banner {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string;
  buttonColor?: string;
  description?: string;
  dateEnd?: string;
  isActive: boolean;
  createdAt: string;
}

interface BannerCardProps {
  banner: Banner;
}

export const BannerCard: React.FC<BannerCardProps> = ({ banner }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/promo/${banner.slug}`);
  };

  return (
    <div
      className="relative w-full h-[220px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3b0764] via-[#4c1d95] to-[#7e22ce] shadow-xl active:scale-[0.99] transition-transform cursor-pointer"
      onClick={handleClick}
    >
      {/* картинка */}
      <img
        src={banner.imageUrl}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* затемнение */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      {/* контент */}
      <div className="relative h-full flex flex-col justify-between p-4">
        <div className="space-y-1 max-w-[75%]">
          <h2 className="text-xl font-bold leading-tight text-white">
            {banner.title}
          </h2>
          {banner.subtitle && (
            <p className="text-xs text-white/80">{banner.subtitle}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="px-6 py-2 text-sm font-semibold rounded-full shadow-md text-white"
            style={{ backgroundColor: banner.buttonColor || "#A855F7" }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {banner.buttonText}
          </button>

          <div className="flex flex-col items-end text-[10px] text-white/70">
            <span className="uppercase tracking-[0.15em]">Limited</span>
            <span>от ASKED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

