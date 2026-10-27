/**
 * Сервис интеграции с Telegram Bot для отправки заявок на бронирование
 * Kaganat Hotel (г. Ош, ул. Алымбека Датка, 322а)
 * 
 * ИНСТРУКЦИЯ ПО ПОДКЛЮЧЕНИЮ БОТА:
 * 1. Создайте бота в Telegram через @BotFather (команда /newbot) и получите HTTP API TOKEN.
 * 2. Узнайте свой Chat ID (или ID группы):
 *    - Напишите в бот @userinfobot или перешлите сообщение в @getmyid_bot
 *    - Если заявки нужны в группу/канал: добавьте созданного бота в группу и выдайте права администратора
 * 3. Укажите токен и chat_id в файле .env или прямо в объекте TELEGRAM_CONFIG ниже:
 *    VITE_TELEGRAM_BOT_TOKEN="ВАШ_ТОКЕН_БОТА"
 *    VITE_TELEGRAM_CHAT_ID="ВАШ_CHAT_ID"
 */

export interface BookingLeadPayload {
  id: string;
  name: string;
  phone: string;
  roomType: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  comment?: string;
  estimatedTotal: number;
  nightsCount: number;
  createdAt: string;
}

export const TELEGRAM_CONFIG = {
  // Получаем из переменных окружения Vite (или укажите прямо сюда строку с токеном)
  botToken: (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN || '',
  chatId: (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID || '',
  
  // Флаг: настроен ли бот
  get isConfigured(): boolean {
    return Boolean(this.botToken && this.chatId && !this.botToken.includes('YOUR_'));
  }
};

/**
 * Формирует читабельный текст для Telegram с эмодзи и форматированием
 */
export function formatTelegramMessage(lead: BookingLeadPayload): string {
  const commentText = lead.comment && lead.comment.trim()
    ? `💬 <b>Пожелания:</b> ${escapeHtml(lead.comment.trim())}\n`
    : '';

  return (
    `🔔 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ — KAGANAT HOTEL</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 <b>Гость:</b> ${escapeHtml(lead.name)}\n` +
    `📞 <b>Телефон:</b> <a href="tel:${lead.phone.replace(/[^+\d]/g, '')}">${escapeHtml(lead.phone)}</a>\n` +
    `🏨 <b>Номер:</b> ${escapeHtml(lead.roomName)}\n` +
    `📅 <b>Даты:</b> ${lead.checkIn} — ${lead.checkOut} (${lead.nightsCount} ноч.)\n` +
    `👥 <b>Гостей:</b> ${lead.guests}\n` +
    `💰 <b>Расчетная сумма:</b> ${lead.estimatedTotal.toLocaleString('ru-RU')} сом (с завтраком)\n` +
    commentText +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📍 <i>Ош, ул. Алымбека Датка, 322а</i>\n` +
    `⏰ <i>Время заявки: ${new Date().toLocaleString('ru-RU')}</i>`
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Отправка лида в Telegram
 */
export async function sendLeadToTelegram(lead: BookingLeadPayload): Promise<{
  success: boolean;
  status: 'sent' | 'queued' | 'mock';
  message: string;
}> {
  // 1. Всегда сохраняем в локальную базу лидов (localStorage)
  try {
    const existing = JSON.parse(localStorage.getItem('kaganat_hotel_leads') || '[]');
    const leadWithTelegramStatus = {
      ...lead,
      telegramDispatched: TELEGRAM_CONFIG.isConfigured
    };
    localStorage.setItem(
      'kaganat_hotel_leads',
      JSON.stringify([leadWithTelegramStatus, ...existing])
    );
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }

  // 2. Если токен бота и chat ID указаны — отправляем реальный запрос в Telegram Bot API
  if (TELEGRAM_CONFIG.isConfigured) {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.chatId,
          text: formatTelegramMessage(lead),
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });

      const resData = await response.json();
      if (resData.ok) {
        return {
          success: true,
          status: 'sent',
          message: 'Заявка успешно отправлена в Telegram бот отеля.'
        };
      } else {
        console.warn('Telegram API error:', resData);
        return {
          success: true, // для пользователя заявка принята и сохранена
          status: 'queued',
          message: `Заявка сохранена. Ошибка Telegram API: ${resData.description || 'Неизвестная ошибка'}`
        };
      }
    } catch (err: any) {
      console.error('Failed to dispatch telegram request:', err);
      return {
        success: true,
        status: 'queued',
        message: 'Заявка сохранена локально. Проверьте соединение с Telegram.'
      };
    }
  }

  // 3. Если бот еще не подключен (структура готова):
  // Логируем форматированное сообщение в консоль, чтобы владелец видел готовый payload
  console.info(
    '%c[Telegram Bot Service - Структура готова]',
    'color: #f59e0b; font-weight: bold;',
    '\nЗаявка сохранена в базу. Для получения в Telegram добавьте VITE_TELEGRAM_BOT_TOKEN и VITE_TELEGRAM_CHAT_ID.\nСообщение, которое будет отправлено:\n',
    formatTelegramMessage(lead)
  );

  return {
    success: true,
    status: 'mock',
    message: 'Структура готова! Заявка зафиксирована и будет отправляться в Telegram бот после добавления токена.'
  };
}
