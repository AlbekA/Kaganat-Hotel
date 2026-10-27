import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../../data/hotelData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Политика конфиденциальности' : 'Пользовательское соглашение и правила проживания';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          {isPrivacy ? (
            <>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей сайта отеля Kaganat ({HOTEL_INFO.address}).
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">1. Сбор персональных данных</h4>
              <p>
                Мы собираем только те данные, которые необходимы для бронирования номеров и связи с гостем: имя, контактный телефон, адрес электронной почты и даты заезда/выезда.
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">2. Использование информации</h4>
              <p>
                Полученная информация используется исключительно для подтверждения бронирования, координации трансфера и оформления закрывающих бухгалтерских документов. Мы никогда не передаем персональные данные третьим лицам.
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">3. Безопасность и хранение</h4>
              <p>
                Все переданные данные шифруются по протоколам SSL. Гость в любой момент может запросить удаление своих контактных данных, обратившись к администрации отеля по адресу {HOTEL_INFO.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                Настоящие Правила регулируют порядок бронирования и проживания в отеле Kaganat (г. Ош, ул. Алымбека Датка, 322а).
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">1. Порядок заезда и выезда</h4>
              <p>
                Расчетный час заселения — 14:00, время выезда — 12:00. При наличии свободных номеров предоставляется бесплатный ранний заезд с 06:00 утра. Для заселения требуется оригинал документа, удостоверяющего личность (паспорт гражданина КР или заграничный паспорт).
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">2. Оплата и отмена</h4>
              <p>
                Оплата производится при заселении на ресепшн. Принимаются сомы, банковские карты Visa / Mastercard, QR-коды банков и безналичные переводы по договорам. Отмена бронирования осуществляется без штрафных санкций при уведомлении за 24 часа.
              </p>
              <h4 className="text-white font-semibold text-sm pt-2">3. Правила тишины и безопасности</h4>
              <p>
                В отеле соблюдается режим тишины с 23:00 до 07:00. Курение в номерах строго запрещено (оборудованы специализированные уличные зоны). Проживание с животными требует предварительного согласования с администрацией.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-stone-950 border-t border-stone-800 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
