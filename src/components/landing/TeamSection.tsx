import React from 'react';
import { Award, Clock, Heart, ShieldCheck } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      role: 'Служба заботы и ресепшн 24/7',
      title: 'Старшие администраторы Kaganat',
      experience: 'Круглосуточный приём, помощь с багажом и отчетными документами',
      quote: '«Мы встречаем гостей в 3 часа ночи с такой же искренней улыбкой, как и в полдень. Для нас важно, чтобы вы чувствовали себя как дома».'
    },
    {
      role: 'Шеф-повар шведского стола',
      title: 'Кулинарная служба отеля',
      experience: 'Горячие домашние завтраки, свежая выпечка и натуральный зерновой кофе',
      quote: '«Каждое утро мы выпекаем тандырные лепешки, варим домашние каши и подаем свежие сыры, чтобы ваш день в Оше начался с энергии».'
    },
    {
      role: 'Служба безупречной чистоты',
      title: 'Команда клининга и гигиены',
      experience: 'Ежедневная антибактериальная обработка, сатиновое белье и свежесть',
      quote: '«В наших 13 номерах нет посторонних запахов и пыли. Чистота сантехники и свежесть постельного белья — наш строгий стандарт».'
    }
  ];

  return (
    <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-stone-800 shadow-2xl relative aspect-[4/5] bg-stone-950">
              <img
                src="/assets/aistudio/_______________8d0924a1.jpg"
                alt="Команда отеля Kaganat встречает гостей"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-900/90 rounded-xl border border-stone-800 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Heart className="w-4 h-4 fill-amber-400" />
                  <span>Культура кыргызского гостеприимства</span>
                </div>
                <p className="text-xs text-stone-300">
                  Отель Kaganat — это внимание к человеку, тишина для сна и помощь в любой ситуации.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values and Team */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
                Лица и стандарты отеля
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                Вы останавливаетесь у людей, которые искренне заботятся о вашем комфорте
              </h2>
              <p className="mt-3 text-sm sm:text-base text-stone-400">
                За рейтингом 4.9 на 2ГИС стоят реальные сотрудники отеля Kaganat, работающие без выходных и перерывов.
              </p>
            </div>

            <div className="space-y-4">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-2 hover:border-stone-700 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-amber-400">
                      {member.role}
                    </span>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>24/7 на связи</span>
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {member.title}
                  </h3>
                  <p className="text-xs text-stone-300 font-medium">
                    {member.experience}
                  </p>
                  <p className="text-xs italic text-stone-400 pt-1 border-t border-stone-800/80">
                    {member.quote}
                  </p>
                </div>
              ))}
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 bg-stone-950/40 border border-stone-800 rounded-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">
                  Безопасность и видеонаблюдение 24/7
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-stone-950/40 border border-stone-800 rounded-lg">
                <Award className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-300 font-medium">
                  Сертифицированный отель 4 звезды
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
