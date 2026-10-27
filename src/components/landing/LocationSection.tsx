import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, MessageCircle } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>Центр города Ош</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
            Расположение и как до нас добраться
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Отель Kaganat находится по адресу: ул. Алымбека Датка, 322а, в тихом дворе рядом с городским судом и парком Навои.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards and Landmarks */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold font-display text-stone-900">
                Контакты отеля Kaganat
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Фактический адрес:
                    </span>
                    <strong className="text-stone-900">
                      {HOTEL_INFO.address}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Круглосуточный телефон:
                    </span>
                    <a
                      href={`tel:${HOTEL_INFO.phoneClean}`}
                      className="font-mono text-stone-900 font-bold hover:text-amber-700 transition-colors"
                    >
                      {HOTEL_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Электронная почта:
                    </span>
                    <a
                      href={`mailto:${HOTEL_INFO.email}`}
                      className="text-stone-900 hover:text-amber-700 transition-colors"
                    >
                      {HOTEL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      Режим работы:
                    </span>
                    <span className="text-stone-900">
                      Круглосуточно 24/7 (заселение в любое время)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={HOTEL_INFO.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Написать в WhatsApp</span>
                </a>
                <a
                  href={`tel:${HOTEL_INFO.phoneClean}`}
                  className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Позвонить</span>
                </a>
              </div>
            </div>

            {/* Nearby Distances */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Ориентиры рядом с отелем:
              </h4>
              <div className="space-y-2 text-xs">
                {HOTEL_INFO.landmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1.5 border-b border-stone-100 last:border-0"
                  >
                    <span className="text-stone-700">{lm.name}</span>
                    <strong className="text-stone-900 font-mono text-[11px]">
                      {lm.distance}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Widget */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col min-h-[420px]">
            {/* Map Frame */}
            <div className="relative flex-1 bg-stone-200 min-h-[340px]">
              {/* Embed responsive OpenStreetMap centered on Osh Alymbyek Datka */}
              <iframe
                title="Карта расположения отеля Kaganat в Оше"
                src="https://www.openstreetmap.org/export/embed.html?bbox=72.7850%2C40.5200%2C72.8100%2C40.5350&amp;layer=mapnik&amp;marker=40.5283%2C72.7985"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
              />

              {/* Kaganat Pin overlay banner */}
              <div className="absolute top-4 left-4 z-10 bg-stone-900/90 text-white p-3.5 rounded-xl shadow-xl border border-stone-700 backdrop-blur-sm max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-xs">
                    K
                  </div>
                  <strong className="text-xs font-bold font-display">Kaganat Hotel</strong>
                </div>
                <p className="text-[11px] text-stone-300">
                  ул. Алымбека Датка, 322а (200м от горсуда)
                </p>
              </div>
            </div>

            {/* Route buttons strip */}
            <div className="p-4 bg-stone-100/80 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-stone-600 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                <span>Координаты: 40.5283° N, 72.7985° E</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://2gis.kg/osh"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Маршрут в 2ГИС</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
                <a
                  href="https://yandex.com/maps/?text=%D0%9E%D1%88+%D0%90%D0%BB%D1%8B%D0%BC%D0%B1%D0%B5%D0%BA%D0%B0+%D0%94%D0%B0%D1%82%D0%BA%D0%B0+322%D0%B0"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Яндекс Карты</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
