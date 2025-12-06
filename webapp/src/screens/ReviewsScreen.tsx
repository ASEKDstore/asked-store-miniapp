import React, { useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

type Props = {
  compact?: boolean;
};

const initialReviews: Review[] = [
  {
    id: "1",
    name: "ASKED Family",
    rating: 5,
    text: "Худи с .BOT — топ. Вживую выглядит ещё жирнее, чем на превью."
  },
  {
    id: "2",
    name: "dev.province",
    rating: 5,
    text: "Вайб улицы + IT — прям то, чего не хватало."
  }
];

const ReviewsScreen: React.FC<Props> = ({ compact }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const r: Review = {
      id: String(Date.now()),
      name: name.trim() || "Аноним",
      rating,
      text: text.trim()
    };

    setReviews((prev) => [r, ...prev]);
    setName("");
    setRating(5);
    setText("");
  };

  const list = compact ? reviews.slice(0, 2) : reviews;

  return (
    <div className="space-y-3">
      {!compact && (
        <form
          onSubmit={handleSubmit}
          className="asked-card px-3 py-3 flex flex-col gap-2 text-sm screen-card-pop"
        >
          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
            Оставить отзыв
          </div>
          <input
            className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none"
            placeholder="Имя (опционально)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Оценка:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`asked-tap text-base ${
                    star <= rating ? "text-yellow-400" : "text-slate-600"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-2 text-xs outline-none min-h-[70px]"
            placeholder="Напишите, как вам качество, посадка, вайб..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="mt-1 asked-tap self-end px-3 py-1.5 text-[11px] rounded-xl bg-askedAccentSoft font-semibold"
          >
            Опубликовать
          </button>
        </form>
      )}

      <div className={compact ? "space-y-2" : "space-y-2 pb-16"}>
        {list.map((r) => (
          <article
            key={r.id}
            className="asked-card px-3 py-2 text-xs flex flex-col gap-1 card-pop"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.name}</span>
              <span className="text-[11px] text-yellow-400">
                {"★".repeat(r.rating)}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 whitespace-pre-line">
              {r.text}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ReviewsScreen;

