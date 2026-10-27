import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, User, Phone, MessageSquare, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, Send } from 'lucide-react';
import { HOTEL_INFO, ROOMS } from '../../data/hotelData';
import { sendLeadToTelegram, BookingLeadPayload, TELEGRAM_CONFIG } from '../../services/telegramService';

interface BookingSectionProps {
  initialRoomType?: string;
  initialDates?: { checkIn: string; checkOut: string; guests: number };
  initialNote?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialRoomType = 'single',
  initialDates,
  initialNote = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    roomType: initialRoomType,
    checkIn: initialDates?.checkIn || new Date().toISOString().split('T')[0],
    checkOut: initialDates?.checkOut || (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    })(),
    guests: initialDates?.guests ? String(initialDates.guests) : '1',
    comment: initialNote,
    honeypot: '', // anti-spam
    agreeTerms: true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [telegramStatusNote, setTelegramStatusNote] = useState<string>('');

  useEffect(() => {
    if (initialRoomType) {
      setFormData(prev => ({ ...prev, roomType: initialRoomType }));
    }
    if (initialDates) {
      setFormData(prev => ({
        ...prev,
        checkIn: initialDates.checkIn,
        checkOut: initialDates.checkOut,
        guests: String(initialDates.guests)
      }));
    }
    if (initialNote) {
      setFormData(prev => ({ ...prev, comment: initialNote }));
    }
  }, [initialRoomType, initialDates, initialNote]);

  const selectedRoom = ROOMS.find(r => r.id === formData.roomType) || ROOMS[0];

  // Price estimate
  const nightsCount = Math.max(
    1,
    Math.round(
      (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    ) || 1
  );

  const pricePerNight = formData.guests === '2' && selectedRoom.priceTwoGuests
    ? selectedRoom.priceTwoGuests
    : selectedRoom.priceOneGuest;
  const estimatedTotal = pricePerNight * nightsCount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Spam check
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim()) {
      setErrorMsg('Пожалуйста, укажите ваше имя');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Пожалуйста, укажите корректный контактный номер телефона');
      return;
    }

    if (!formData.agreeTerms) {
      setErrorMsg('Необходимо согласие на обработку персональных данных');
      return;
    }

    setLoading(true);

    const leadPayload: BookingLeadPayload = {
      id: 'lead-' + Date.now(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      roomType: formData.roomType,
      roomName: selectedRoom.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      guests: formData.guests,
      comment: formData.comment.trim(),
      estimatedTotal,
      nightsCount,
      createdAt: new Date().toISOString()
    };

    try {
      // Отправка в Telegram-бот (через сервис интеграции)
      const res = await sendLeadToTelegram(leadPayload);
      setTelegramStatusNote(res.message);

      // Launch celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSuccess(true);
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMsg('Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам напрямую.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Прямое бронирование без комиссий</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Забронировать номер в отеле Kaganat
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-400">
            Оплата при заселении. Завтрак-шведский стол включён во все номера.
          </p>
        </div>

        <div className="bg-stone-950/90 border border-stone-800 rounded-3xl p-5 sm:p-10 shadow-2xl relative">
          {success ? (
            <div className="py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-display text-white">
                  Ваша бронь принята!
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                  Благодарим вас, <strong>{formData.name}</strong>! Заявка зафиксирована и передана администраторам Kaganat Hotel. Мы перезвоним по номеру{' '}
                  <strong className="text-amber-400">{formData.phone}</strong> для подтверждения заезда.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 bg-stone-900 rounded-xl border border-stone-800 max-w-md mx-auto text-left text-xs space-y-2 text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-500">Номер:</span>
                  <span className="font-semibold text-white">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Даты проживания:</span>
                  <span>{formData.checkIn} — {formData.checkOut} ({nightsCount} ноч.)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Гостей:</span>
                  <span>{formData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Завтрак:</span>
                  <span className="text-emerald-400 font-medium">Шведский стол включён</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-800">
                  <span className="text-stone-400 font-medium">Сумма к оплате:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {estimatedTotal.toLocaleString()} сом
                  </span>
                </div>
              </div>

              {/* Telegram Integration Notice */}
              <div className="max-w-md mx-auto p-3 rounded-lg bg-stone-900/60 border border-stone-800/80 text-[11px] text-stone-400 flex items-center gap-2 text-left">
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  {TELEGRAM_CONFIG.isConfigured
                    ? 'Уведомление отправлено в Telegram-бот отеля.'
                    : 'Заявка зафиксирована в системе бронирования и готова для передачи в Telegram-бот.'}
                </span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={HOTEL_INFO.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Написать в WhatsApp отеля</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setFormData(prev => ({ ...prev, name: '', phone: '', comment: '' }));
                  }}
                  className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium rounded-lg transition-colors"
                >
                  Оформить еще одну бронь
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="user_website"
                value={formData.honeypot}
                onChange={(e) => setFormData(prev => ({ ...prev, honeypot: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid 1: Name and Phone ONLY (Email removed per user instruction) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Ваше имя *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Азамат или Дарья"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Номер телефона *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+996 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Booking details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Категория номера
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData(prev => ({ ...prev, roomType: e.target.value }))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="single">Одноместный (от 5 500 сом)</option>
                    <option value="twin">Twin 2 кровати (5 500 / 7 000 сом)</option>
                    <option value="queen">Queen King size (5 500 / 7 000 сом)</option>
                    <option value="deluxe">Deluxe 30 м² (8 000 сом)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Дата заезда
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.checkIn}
                    onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Дата выезда
                  </label>
                  <input
                    type="date"
                    min={formData.checkIn}
                    value={formData.checkOut}
                    onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1.5">
                    Гостей
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData(prev => ({ ...prev, guests: e.target.value }))}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="1">1 гость</option>
                    <option value="2">2 гостя</option>
                    <option value="3">3 гостя (+ доп. место)</option>
                  </select>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1.5">
                  Пожелания (время прилета, трансфер, закрывающие документы)
                </label>
                <textarea
                  rows={2}
                  placeholder="Например: прилетаем рейсом в 06:20, нужен трансфер из аэропорта и фискальный чек для командировки"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Summary and CTA */}
              <div className="pt-4 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="text-left w-full md:w-auto">
                  <div className="text-xs text-stone-400">
                    Ориентировочная сумма ({nightsCount} ноч. с завтраком):
                  </div>
                  <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                    {estimatedTotal.toLocaleString()} сом
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Оплата при заселении · Без комиссий</span>
                  </div>
                </div>

                <div className="w-full md:w-auto space-y-1.5 text-center md:text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-sm font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Оформляем...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-stone-950" />
                        <span>Отправить заявку на бронирование</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-stone-500">
                    Отправьте заявку — мы свяжемся с вами для подтверждения бронирования.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
