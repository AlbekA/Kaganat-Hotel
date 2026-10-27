import React, { useState } from 'react';
import { X, Users, Bed, Check, Sparkles, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Room } from '../../data/hotelData';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (roomId: string) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBook
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!room) return null;

  const photos = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  const nextImg = () => setPhotoIndex((photoIndex + 1) % photos.length);
  const prevImg = () => setPhotoIndex((photoIndex - 1 + photos.length) % photos.length);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo Carousel Area */}
        <div className="relative aspect-[16/10] bg-stone-950 overflow-hidden">
          <img
            src={photos[photoIndex]}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно"
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Nav arrows if multiple photos */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImg}
                aria-label="Предыдущее фото"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 hover:bg-stone-800 text-stone-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImg}
                aria-label="Следующее фото"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/70 hover:bg-stone-800 text-stone-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-4 text-[11px] font-mono text-stone-300 bg-stone-900/80 px-2 py-0.5 rounded">
                {photoIndex + 1} / {photos.length}
              </div>
            </>
          )}

          {/* Price Tag in Photo */}
          <div className="absolute bottom-3 left-4">
            <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold">
              Шведский стол включён
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              {room.priceOneGuest.toLocaleString()} сом
              <span className="text-xs font-normal text-stone-300 font-sans"> / ночь</span>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-bold font-display text-white">
                {room.name}
              </h3>
              <span className="text-xs font-mono text-stone-400">
                Площадь: {room.size}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-400 mt-2">
              <span className="flex items-center gap-1 text-stone-300">
                <Users className="w-3.5 h-3.5" />
                <span>{room.capacity}</span>
              </span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="flex items-center gap-1 text-stone-300">
                <Bed className="w-3.5 h-3.5" />
                <span>{room.bedType}</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {room.description}
          </p>

          {/* Complete amenities list */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Комплектация и удобства:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {room.priceTwoGuests && (
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs space-y-1">
              <div className="text-stone-300">
                • Проживание 1 гостя: <strong className="text-amber-400">{room.priceOneGuest.toLocaleString()} сом</strong>
              </div>
              <div className="text-stone-300">
                • Проживание 2 гостей: <strong className="text-amber-400">{room.priceTwoGuests.toLocaleString()} сом</strong> (включая завтрак на двоих)
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="text-xs text-stone-400 hidden sm:block">
            Оплата при заселении · Без комиссий
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook(room.id);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Забронировать номер</span>
          </button>
        </div>
      </div>
    </div>
  );
};
