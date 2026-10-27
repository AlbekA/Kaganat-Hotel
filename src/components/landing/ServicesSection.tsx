import React from 'react';
import {
  Coffee,
  Wifi,
  Utensils,
  Car,
  ShieldCheck,
  Shirt,
  Clock,
  HeartHandshake,
  CreditCard,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SERVICES } from '../../data/hotelData';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return Coffee;
      case 'Wifi': return Wifi;
      case 'Utensils': return Utensils;
      case 'Car': return Car;
      case 'ShieldCheck': return ShieldCheck;
      case 'Shirt': return Shirt;
      case 'Clock': return Clock;
      case 'HeartHandshake': return HeartHandshake;
      default: return Sparkles;
    }
  };

  const paymentBadges = [
    'Visa & Mastercard',
    'Элкарт',
    'QR-код (МБанк, О!Деньги)',
    'Безналичный расчет для юрлиц',
    'Наличные в сомах'
  ];

  return (
    <section id="services" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
            Гостиничный сервис
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Все условия для комфортного отдыха и деловой работы
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400">
            Мы продумали каждую деталь: от шведского стола и скоростного интернета до персонального трансфера в аэропорт.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv) => {
            const Icon = getIcon(srv.iconName);
            return (
              <div
                key={srv.id}
                className="bg-stone-950/70 border border-stone-800 hover:border-stone-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {srv.included ? (
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Включено</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400 font-mono">
                        {srv.priceTag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-800/80">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span>Забронировать с этой услугой</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment Methods and Requisites Strip */}
        <div className="mt-12 p-6 sm:p-8 bg-stone-950/90 border border-stone-800 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" />
              <span>Любые формы оплаты без комиссии</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Принимаем карты всех банков, QR-платежи и безналичные договоры
            </h4>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-stone-300">
              {paymentBadges.map((badge, idx) => (
                <span key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 shadow cursor-pointer"
          >
            Забронировать номер
          </button>
        </div>
      </div>
    </section>
  );
};
