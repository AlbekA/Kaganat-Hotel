import React from 'react';
import { Star, Building2, Clock, Coffee, ShieldCheck } from 'lucide-react';

export const TrustNumbers: React.FC = () => {
  const stats = [
    {
      value: '4.9',
      unit: '/ 5.0',
      label: 'Рейтинг на 2ГИС',
      subtext: '131 подтвержденная оценка',
      icon: Star
    },
    {
      value: '13',
      unit: 'номеров',
      label: 'Новый номерной фонд',
      subtext: 'Свежий ремонт, дуб и сатин',
      icon: Building2
    },
    {
      value: '24/7',
      unit: 'сервис',
      label: 'Круглосуточный приём',
      subtext: 'Заселение в любое время ночи',
      icon: Clock
    },
    {
      value: '100%',
      unit: 'завтрак',
      label: 'Шведский стол включён',
      subtext: 'Горячие блюда, кофе, выпечка',
      icon: Coffee
    },
    {
      value: '200',
      unit: 'метров',
      label: 'До Ошского горсуда',
      subtext: '300 м до парка Навои',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-stone-900 border-y border-stone-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-4 rounded-xl bg-stone-950/40 border border-stone-800/80 transition-all hover:border-stone-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums tracking-tight">
                    {item.value}
                  </span>
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-200">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {item.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
