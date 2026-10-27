import React, { useState } from 'react';
import { Star, ExternalLink, MessageCircle, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../../data/hotelData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = filter === 'all'
    ? REVIEWS
    : REVIEWS.filter(r => r.stayType === filter);

  const categories = [
    { id: 'all', label: 'Все отзывы (131)' },
    { id: 'Деловая поездка', label: 'Командировки' },
    { id: 'Отдых вдвоем', label: 'Отдых' },
    { id: 'Семейная поездка', label: 'Семьи с детьми' }
  ];

  return (
    <section id="reviews" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 2GIS Proof */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Реальные оценки из 2ГИС Ош</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              4.9 из 5.0 — что говорят наши гости
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-400">
              131 подтвержденный отзыв в городском справочнике 2ГИС. Мы ценим обратную связь и держим планку качества.
            </p>
          </div>

          {/* 2GIS Card Badge */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-300 font-medium">131 оценка на 2ГИС</p>
              <a
                href="https://2gis.kg/osh"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 mt-0.5"
              >
                <span>Смотреть карточку в 2ГИС</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                filter === cat.id
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-950/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-700 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">
                    {rev.source}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  «{rev.text}»
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-white">{rev.author}</h4>
                  <p className="text-[11px] text-stone-500">{rev.stayType} · {rev.date}</p>
                </div>
                <span className="text-[11px] text-amber-400/90 font-medium bg-amber-500/10 px-2 py-0.5 rounded">
                  {rev.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-12 text-center text-xs text-stone-400">
          <p>
            Все отзывы оставлены реальными гостями после фактического проживания в отеле Kaganat в Оше.
          </p>
        </div>
      </div>
    </section>
  );
};
