import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Phone } from 'lucide-react';
import { FAQ_LIST, HOTEL_INFO } from '../../data/hotelData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Частые вопросы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Ответы на вопросы перед бронированием
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            Всё, что важно знать о заезде, завтраке, парковке и оплате в отеле Kaganat.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-800 bg-stone-950/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'text-stone-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-6 bg-stone-950/90 border border-stone-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white">Остались вопросы о проживании?</h4>
            <p className="text-xs text-stone-400 mt-1">
              Администратор отеля на связи круглосуточно 24/7 и ответит в течение 1 минуты.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${HOTEL_INFO.phoneClean}`}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Позвонить</span>
            </a>
            <a
              href={HOTEL_INFO.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp отеля</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
