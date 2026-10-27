import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../../data/hotelData';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'rooms' | 'interior' | 'bathroom' | 'facade'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = filter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === filter || p.category === 'all');

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Реальные фотографии</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Галерея отеля Kaganat
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-400">
              Посмотрите номера, интерьер и атмосферу отеля Kaganat. Все фотографии подлинные, сделаны в нашем отеле в Оше.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-950/80 rounded-lg border border-stone-800 shrink-0 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'Все фото' },
              { id: 'rooms', label: 'Номера' },
              { id: 'interior', label: 'Интерьер и холлы' },
              { id: 'bathroom', label: 'Ванные' },
              { id: 'facade', label: 'Фасад и сервис' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  filter === tab.id
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry-like Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-950 border border-stone-800 cursor-pointer shadow-sm hover:border-amber-500/60 transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] text-white font-medium line-clamp-1">
                    {photo.title}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center shrink-0">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtitle caption */}
        <div className="mt-8 text-center text-xs text-stone-500">
          Нажмите на любую фотографию для полноэкранного просмотра.
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Закрыть галерею"
            className="absolute top-5 right-5 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition-colors z-20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Предыдущее фото"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Следующее фото"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Photo container */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[activePhotoIndex].src}
              alt={filteredPhotos[activePhotoIndex].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {activePhotoIndex + 1} из {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
