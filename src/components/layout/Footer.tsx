import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Desc */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-white font-bold text-lg">
              <span className="w-8 h-8 rounded-sm bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-serif font-bold text-base">
                K
              </span>
              <span className="font-display tracking-wider">KAGANAT HOTEL</span>
            </a>
            <p className="text-xs text-stone-400 leading-relaxed">
              Новый четырехзвездочный отель в самом центре города Ош. 13 уютных номеров, завтрак-шведский стол, тишина и круглосуточное гостеприимство.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Оценка 4.9 из 5 на 2ГИС (131 отзыв)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Навигация
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#rooms" className="hover:text-amber-400 transition-colors">
                  Номера и тарифы (от 5 500 сом)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Услуги и шведский стол
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Галерея реальных фото
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Отзывы гостей из 2ГИС
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Вопросы и ответы
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-amber-400 transition-colors">
                  Забронировать номер
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Контакты и адрес
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phoneClean}`} className="hover:text-white font-mono">
                  {HOTEL_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white">
                  {HOTEL_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Круглосуточно 24/7 (заезд в любое время)</span>
              </p>
            </div>
          </div>

          {/* Col 4: Messengers & Requisites */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Быстрая связь
            </h4>
            <div className="space-y-2">
              <a
                href={HOTEL_INFO.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: Написать администратору</span>
              </a>
              <a
                href="https://2gis.kg/osh"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 rounded-lg transition-colors flex items-center justify-center gap-2 text-xs font-medium"
              >
                <span>Карточка отеля в 2ГИС Ош</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 font-mono">
              ИП/ОсОО «Kaganat Hotel Osh»<br />
              ИНН: 01802202610190 · ОКПО: 31054920
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Kaganat Hotel (Мейманкана Каганат). Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Пользовательское соглашение
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
