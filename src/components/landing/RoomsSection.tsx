import React, { useState } from 'react';
import { Users, Bed, Check, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { ROOMS, Room } from '../../data/hotelData';

interface RoomsSectionProps {
  onOpenBooking: (roomType?: string) => void;
  onSelectRoom: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onOpenBooking,
  onSelectRoom
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'single' | 'twin' | 'queen' | 'deluxe'>('all');

  const filteredRooms = activeTab === 'all'
    ? ROOMS
    : ROOMS.filter(r => r.category === activeTab);

  return (
    <section id="rooms" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              Номерной фонд
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
              Номера и цены с включённым завтраком
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600">
              13 абсолютно новых комнат с отделкой натуральным дубом, премиальным бельем и тишиной в центре Оша.
            </p>
          </div>

          {/* Interactive filter buttons / segmented control (Functional buttons) */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg shrink-0 overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Все (13 номеров)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'single'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Одноместные
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('twin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'twin'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Twin (2 кровати)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('queen')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'queen'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Queen King size
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('deluxe')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'deluxe'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Deluxe 30 м²
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo carrier */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price tag on photo */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-200 font-medium">
                      Завтрак включён
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                      {room.priceOneGuest.toLocaleString()} сом
                      <span className="text-xs font-sans text-stone-300 font-normal"> / ночь</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectRoom(room)}
                    className="p-2 bg-stone-900/80 hover:bg-stone-900 text-stone-100 rounded-lg backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5 border border-stone-700"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span className="hidden sm:inline">Галерея номера</span>
                  </button>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold font-display text-stone-900">
                      {room.name}
                    </h3>
                    <span className="text-xs text-stone-500 font-mono">
                      {room.size}
                    </span>
                  </div>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-500" />
                      <span>{room.capacity}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-stone-500" />
                      <span>{room.bedType}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-stone-100 space-y-2">
                    {room.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {room.priceTwoGuests && (
                    <div className="mt-3 py-1.5 px-3 bg-amber-50/80 rounded-md border border-amber-200/60 text-[11px] text-amber-900">
                      Тариф для 1 гостя: <strong className="tabular-nums">{room.priceOneGuest.toLocaleString()} сом</strong> · Для 2 гостей: <strong className="tabular-nums">{room.priceTwoGuests.toLocaleString()} сом</strong> (с 2 завтраками)
                    </div>
                  )}
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenBooking(room.id)}
                    className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>Забронировать номер</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectRoom(room)}
                    className="py-3 px-3.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-lg transition-colors border border-stone-200"
                  >
                    <span>Все детали</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions summary strip */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-stone-900">
              Что включено в каждый номер без скрытых доплат:
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Горячий завтрак «шведский стол» · Wi-Fi 100 Мбит/с · Охраняемая парковка · Халаты и тапочки · Ежедневная влажная уборка
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span>Выбрать даты проживания</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
