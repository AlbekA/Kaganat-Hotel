import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Coffee, Gift } from 'lucide-react';
import { ROOMS } from '../../data/hotelData';

interface QuizLeadMagnetProps {
  onApplyRoomRecommendation: (roomType: string, bonusNote: string) => void;
}

export const QuizLeadMagnet: React.FC<QuizLeadMagnetProps> = ({
  onApplyRoomRecommendation
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState({
    purpose: '',
    beds: '',
    addService: ''
  });
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelectPurpose = (val: string) => {
    setAnswers(prev => ({ ...prev, purpose: val }));
    setStep(2);
  };

  const handleSelectBeds = (val: string) => {
    setAnswers(prev => ({ ...prev, beds: val }));
    setStep(3);
  };

  const handleSelectService = (val: string) => {
    setAnswers(prev => ({ ...prev, addService: val }));
    setCompleted(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ purpose: '', beds: '', addService: '' });
    setCompleted(false);
  };

  // Determine recommended room based on answers
  const getRecommendation = () => {
    if (answers.beds === 'twin') {
      return {
        room: ROOMS.find(r => r.id === 'twin') || ROOMS[1],
        reason: 'Две раздельные кровати с мягким велюровым изголовьем — идеальное решение для коллег или друзей.'
      };
    }
    if (answers.beds === 'queen') {
      return {
        room: ROOMS.find(r => r.id === 'queen') || ROOMS[2],
        reason: 'Кровать King Size, сатиновое белье и тишина для романтического или спокойного отдыха вдвоем.'
      };
    }
    if (answers.purpose === 'family' || answers.beds === 'deluxe') {
      return {
        room: ROOMS.find(r => r.id === 'deluxe') || ROOMS[3],
        reason: 'Максимальный комфорт 30 м² с чайной станцией, увеличенной ванной и возможностью детского места.'
      };
    }
    return {
      room: ROOMS.find(r => r.id === 'single') || ROOMS[0],
      reason: 'Эргономичный светлый номер с рабочим столом, Smart TV и завтраком для продуктивной командировки.'
    };
  };

  const recommendation = getRecommendation();

  return (
    <section className="py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-3">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Умный подбор номера + комплимент от отеля</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900 tracking-tight">
              Подберите идеальный номер за 3 вопроса
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              Ответьте на 3 простых вопроса и получите персональную рекомендацию номера + промокод на бесплатный зерновой кофе в кафе отеля.
            </p>
          </div>

          {!completed ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>Вопрос {step} из 3</span>
                <span>{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              {/* Step 1: Purpose */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 text-center">
                    Какова главная цель вашего визита в Ош?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'business', title: 'Деловая поездка / суд / командировка', desc: 'Нужен стабильный Wi-Fi, стол и документы' },
                      { id: 'leisure', title: 'Отдых или туризм вдвоем', desc: 'Важны кровать King Size, тишина и романтика' },
                      { id: 'twin_friends', title: 'Поездка с коллегой или другом', desc: 'Нужны 2 раздельные комфортные кровати' },
                      { id: 'family', title: 'Семейная поездка с детьми', desc: 'Требуется просторный номер и вкусные завтраки' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectPurpose(opt.id)}
                        className="p-4 rounded-xl border border-stone-200 text-left hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer group"
                      >
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-800">
                          {opt.title}
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Beds */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 text-center">
                    Какой формат спальных мест вам комфортнее?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'single', title: 'Одноместная кровать (1 гость)', desc: 'Компактно и выгодно: от 5 500 сом' },
                      { id: 'twin', title: 'Две раздельные кровати', desc: 'Номер Twin для 2 гостей: 7 000 сом' },
                      { id: 'queen', title: 'Одна широкая кровать King Size', desc: 'Номер Queen для 1-2 гостей: от 5 500 сом' },
                      { id: 'deluxe', title: 'Максимальный комфорт 30 м² (Deluxe)', desc: 'Премиум номер с зоной отдыха: 8 000 сом' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectBeds(opt.id)}
                        className="p-4 rounded-xl border border-stone-200 text-left hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer group"
                      >
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-800">
                          {opt.title}
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Additional Services */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 text-center">
                    Потребуется ли вам трансфер или ранний заезд?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'transfer', title: 'Да, нужен трансфер из аэропорта Ош', desc: 'Встретим с табличкой в зале прилета' },
                      { id: 'early', title: 'Да, нужен ранний заезд рано утром', desc: 'Прилет утренним рейсом до 08:00' },
                      { id: 'parking', title: 'Нужна охраняемая парковка для авто', desc: 'Бесплатное место на территории' },
                      { id: 'standard', title: 'Только номер и вкусный завтрак', desc: 'Стандартный заезд после 14:00' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectService(opt.id)}
                        className="p-4 rounded-xl border border-stone-200 text-left hover:border-amber-500 hover:bg-amber-50/40 transition-all cursor-pointer group"
                      >
                        <div className="font-semibold text-stone-900 text-sm group-hover:text-amber-800">
                          {opt.title}
                        </div>
                        <div className="text-xs text-stone-500 mt-1">
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="space-y-6 pt-2">
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col md:flex-row items-center gap-6">
                <img
                  src={recommendation.room.image}
                  alt={recommendation.room.name}
                  className="w-full md:w-48 h-36 object-cover rounded-xl shadow-sm"
                />
                <div className="space-y-2 text-center md:text-left flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    Ваш идеальный номер:
                  </span>
                  <h3 className="text-xl font-bold font-display text-stone-900">
                    {recommendation.room.name}
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {recommendation.reason}
                  </p>
                  <div className="text-base font-bold font-mono text-amber-900 pt-1">
                    От {recommendation.room.priceOneGuest.toLocaleString()} сом / ночь с завтраком
                  </div>
                </div>
              </div>

              {/* Bonus Voucher */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-900">
                      Ваш комплимент: Бесплатный зерновой кофе в кафе отеля
                    </h4>
                    <p className="text-[11px] text-emerald-700">
                      Промокод: <strong className="font-mono">KAGANAT2026</strong> (будет автоматически активирован при бронировании)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onApplyRoomRecommendation(
                      recommendation.room.id,
                      `Подобрано через квиз: ${recommendation.room.name}. Промокод на кофе: KAGANAT2026`
                    )
                  }
                  className="w-full sm:flex-1 py-3 px-6 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-sm font-semibold rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Забронировать этот номер с бонусом</span>
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="w-full sm:w-auto py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
