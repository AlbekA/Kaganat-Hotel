import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Coffee, Sparkles, MessageSquare, Phone } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

interface HeroSectionProps {
  onOpenBooking: (roomType?: string, dates?: { checkIn: string; checkOut: string; guests: number }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [checkIn, setCheckIn] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [checkOut, setCheckOut] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('1');
  const [roomType, setRoomType] = useState('single');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(roomType, {
      checkIn,
      checkOut,
      guests: parseInt(guests, 10) || 1
    });
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-14 bg-stone-950 overflow-hidden">
      {/* Background with measured luxury scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/_______________8d0924a1.jpg"
          alt="Отель Kaganat в Оше: атмосфера, комфортные номера и сервис"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
          {/* Trust strip kicker: unboxed text with subtle typographic separators */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 text-[11px] sm:text-xs text-stone-300 backdrop-blur-sm">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 на 2ГИС</span>
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>131 реальная оценка</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Центр Оша</span>
          </div>

          {/* 5-second offer headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.15] text-balance">
            Kaganat — новый отель в самом центре Оша
          </h1>

          {/* Value proposition subtext */}
          <p className="text-xs sm:text-base md:text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            13 чистых современных номеров, включённый горячий завтрак-шведский стол, стабильный Wi-Fi 100 Мбит/с и заботливый сервис 24/7.
          </p>

          {/* Direct CTA buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#rooms"
              className="px-5 py-2.5 bg-stone-800/90 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-medium rounded-xl border border-stone-700 transition-colors"
            >
              Посмотреть номера (от 5 500 сом)
            </a>
            <a
              href={HOTEL_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Написать в WhatsApp</span>
            </a>
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="px-4 py-2.5 bg-stone-900/90 hover:bg-stone-800 text-stone-300 text-xs sm:text-sm font-medium rounded-xl border border-stone-800 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
          </div>

          {/* Key trust bullets under hero */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Шведский стол включён</span>
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>300 м до парка Навои</span>
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Номера от 5 500 сом</span>
            </span>
          </div>
        </div>

        {/* Quick Booking Strip Container */}
        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto bg-stone-900/95 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <form
            onSubmit={handleBookingSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end"
          >
            {/* Check-in */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-300">
                Дата заезда
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Check-out */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-300">
                Дата выезда
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Room Category */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-300">
                Тип номера
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="single">Одноместный (от 5 500 сом)</option>
                <option value="twin">Twin 2 кровати (5 500 / 7 000 сом)</option>
                <option value="queen">Queen King size (5 500 / 7 000 сом)</option>
                <option value="deluxe">Deluxe (8 000 сом)</option>
              </select>
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-300">
                Гости
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              >
                <option value="1">1 гость</option>
                <option value="2">2 гостя</option>
                <option value="3">3 гостя (+ доп. место)</option>
              </select>
            </div>

            {/* CTA button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
                <span>Забронировать</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
