import React from 'react';
import { Briefcase, Users, Compass, Quote, ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/hotelData';

interface CasesSectionProps {
  onOpenBooking: () => void;
}

export const CasesSection: React.FC<CasesSectionProps> = ({ onOpenBooking }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'case-business': return Briefcase;
      case 'case-family': return Users;
      default: return Compass;
    }
  };

  return (
    <section className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
            Реальные сценарии
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
            Как мы решаем задачи наших гостей
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Каждый гость приезжает со своей целью: суд, командировка, семейный отдых или экспедиция. Вот как мы помогаем каждому.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((c) => {
            const Icon = getIcon(c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-stone-500">{c.guestType}</p>
                    </div>
                  </div>

                  {/* Situation */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
                      Ситуация гостя
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {c.situation}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
                      Что сделал отель
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {c.action}
                    </p>
                  </div>

                  {/* Result */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                      Итоговый результат
                    </div>
                    <p className="text-xs text-stone-900 font-medium leading-relaxed">
                      {c.result}
                    </p>
                  </div>
                </div>

                {/* Quote block */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-start gap-2.5 text-xs italic text-stone-600 bg-stone-50 p-3 rounded-lg">
                  <Quote className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{c.quote}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow"
          >
            <span>Подобрать номер под вашу задачу</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
