import React from 'react';
import { CalendarCheck, MessageSquare, KeyRound, Coffee, ArrowRight } from 'lucide-react';

interface HowWeWorkSectionProps {
  onOpenBooking: () => void;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Выбор номера и дат',
      description: 'Выберите Single, Twin, Queen или Deluxe на сайте без скрытых комиссий и без обязательной предоплаты.',
      icon: CalendarCheck
    },
    {
      number: '02',
      title: 'Быстрое подтверждение',
      description: 'Администратор подтвердит бронь в WhatsApp или по телефону за 2 минуты, зафиксирует цену и учтет пожелания.',
      icon: MessageSquare
    },
    {
      number: '03',
      title: 'Встреча и заезд 24/7',
      description: 'Круглосуточная стойка регистрации. Поможем с трансфером из аэропорта, донесем багаж и заселим в готовый номер.',
      icon: KeyRound
    },
    {
      number: '04',
      title: 'Отдых и шведский стол',
      description: 'Наслаждайтесь тишиной, ортопедической кроватью, Smart TV и горячим завтраком каждое утро с 07:30 до 10:30.',
      icon: Coffee
    }
  ];

  return (
    <section className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
            Прозрачный процесс
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
            Как проходит бронирование и заселение
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Никаких лишних сложностей. Вы получаете гарантированный номер в центре Оша за 4 простых шага.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-amber-400 hover:shadow-lg transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-display font-bold text-amber-600/40 group-hover:text-amber-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] font-medium text-stone-400 flex items-center gap-1">
                  <span>Шаг {idx + 1} из 4</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-md cursor-pointer"
          >
            <span>Начать бронирование прямо сейчас</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>
        </div>
      </div>
    </section>
  );
};
