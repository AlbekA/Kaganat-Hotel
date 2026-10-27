import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, MessageSquare } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

interface NavbarProps {
  onOpenBooking: (roomType?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-md text-stone-100 shadow-md border-b border-stone-800'
            : 'bg-stone-900/85 backdrop-blur-sm text-stone-100 border-b border-stone-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Strictly balanced header with responsive spacing */}
          <div className="flex items-center justify-between gap-2 sm:gap-6 h-16 sm:h-20">
            {/* Zone 1: Brand wordmark (compact on mobile so everything fits) */}
            <a
              href="#"
              className="flex items-center gap-1.5 sm:gap-2.5 text-base sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0"
            >
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-sm sm:text-base">
                K
              </span>
              <span className="font-display tracking-wider text-sm sm:text-lg">
                KAGANAT
              </span>
            </a>

            {/* Zone 2: Navigation links (desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-300">
              <a
                href="#rooms"
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                Номера и цены
              </a>
              <a
                href="#services"
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                Услуги
              </a>
              <a
                href="#gallery"
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                Галерея
              </a>
              <a
                href="#reviews"
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                Отзывы 2ГИС
              </a>
              <a
                href="#location"
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                Контакты
              </a>
            </nav>

            {/* Zone 3: Primary Action (fits cleanly on mobile 320px+) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Phone call link on larger screens */}
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="hidden md:flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-300 transition-colors px-2 py-1"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap tabular-nums">{HOTEL_INFO.phone}</span>
              </a>

              {/* Direct Booking Button: Optimized for mobile fit without clipping */}
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="px-2.5 py-1.5 sm:px-4 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-stone-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-lg transition-all shadow-sm flex items-center gap-1 sm:gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 shrink-0" />
                <span>Забронировать</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Меню навигации"
                className="lg:hidden p-1.5 sm:p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-300">
              <a
                href="#rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Номера и цены (от 5 500 сом)
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Услуги и шведский стол
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Галерея (фотографии отеля)
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Отзывы 2ГИС (Рейтинг 4.9)
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Вопросы и ответы
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-stone-800 text-stone-200"
              >
                Контакты и адрес в Оше
              </a>
            </nav>

            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              <a
                href={HOTEL_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Написать в WhatsApp отеля</span>
              </a>
              <a
                href={`tel:${HOTEL_INFO.phoneClean}`}
                className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Позвонить: {HOTEL_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
