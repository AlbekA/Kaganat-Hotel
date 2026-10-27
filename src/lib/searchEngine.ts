import { HOTEL_SOURCES, SourceDocument } from '../data/sourcesData';

export interface SearchResult {
  source: SourceDocument;
  score: number;
  matchedSnippets: string[];
  relevancePercent: number;
}

export interface ConciergeDialogMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  citedSources?: {
    id: string;
    title: string;
    category: string;
    snippet: string;
  }[];
}

export interface ConciergeDialog {
  id: string;
  title: string;
  updatedAt: string;
  messages: ConciergeDialogMessage[];
}

export interface SearchFilterState {
  category: string;
  type: string;
  sortBy: 'relevance' | 'date' | 'title';
}

/**
 * Searches the hotel knowledge base and ranks by relevance
 */
export function searchSources(
  query: string,
  filters?: Partial<SearchFilterState>
): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  let results: SearchResult[] = [];

  const sources = HOTEL_SOURCES.filter(doc => {
    if (filters?.category && filters.category !== 'all' && doc.category !== filters.category) {
      return false;
    }
    if (filters?.type && filters.type !== 'all' && doc.type !== filters.type) {
      return false;
    }
    return true;
  });

  if (!cleanQuery) {
    // Return all filtered sources with neutral score
    results = sources.map(doc => ({
      source: doc,
      score: doc.featured ? 10 : 5,
      matchedSnippets: [doc.description],
      relevancePercent: doc.featured ? 98 : 85
    }));
  } else {
    const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);

    for (const doc of sources) {
      let score = 0;
      const matchedSnippets: string[] = [];

      const titleLower = doc.title.toLowerCase();
      const descLower = doc.description.toLowerCase();
      const tagsLower = doc.tags.map(t => t.toLowerCase()).join(' ');
      const contentLower = doc.content.toLowerCase();

      // Exact phrase match bonus
      if (titleLower.includes(cleanQuery)) score += 40;
      if (descLower.includes(cleanQuery)) score += 20;
      if (tagsLower.includes(cleanQuery)) score += 25;
      if (contentLower.includes(cleanQuery)) score += 15;

      // Token match
      for (const token of queryTokens) {
        if (titleLower.includes(token)) score += 15;
        if (tagsLower.includes(token)) score += 12;
        if (descLower.includes(token)) score += 8;
        if (contentLower.includes(token)) {
          score += 5;
          // Extract snippet around token
          const idx = contentLower.indexOf(token);
          const start = Math.max(0, idx - 60);
          const end = Math.min(doc.content.length, idx + 120);
          let snippet = doc.content.substring(start, end).replace(/[#*`]/g, '').trim();
          if (start > 0) snippet = '...' + snippet;
          if (end < doc.content.length) snippet = snippet + '...';
          if (!matchedSnippets.includes(snippet) && matchedSnippets.length < 2) {
            matchedSnippets.push(snippet);
          }
        }
      }

      if (score > 0) {
        if (matchedSnippets.length === 0) {
          matchedSnippets.push(doc.description);
        }
        const relevancePercent = Math.min(99, Math.round(50 + score * 1.2));
        results.push({
          source: doc,
          score,
          matchedSnippets,
          relevancePercent
        });
      }
    }
  }

  // Sorting
  const sortBy = filters?.sortBy || 'relevance';
  results.sort((a, b) => {
    if (sortBy === 'relevance') {
      return b.score - a.score;
    }
    if (sortBy === 'date') {
      return new Date(b.source.date).getTime() - new Date(a.source.date).getTime();
    }
    if (sortBy === 'title') {
      return a.source.title.localeCompare(b.source.title, 'ru');
    }
    return 0;
  });

  return results;
}

/**
 * Deterministic Quick Answer Generator with strictly cited sources
 */
export function generateQuickAnswer(query: string, results: SearchResult[]): {
  answer: string;
  citations: { id: string; title: string; category: string; excerpt: string }[];
} | null {
  if (!query.trim() || results.length === 0) return null;

  const q = query.toLowerCase();
  const topDoc = results[0]?.source;
  if (!topDoc) return null;

  const citations: { id: string; title: string; category: string; excerpt: string }[] = [];

  // 1. Room rates / prices
  if (q.includes('цен') || q.includes('стоим') || q.includes('тариф') || q.includes('номер') || q.includes('скольк')) {
    const single = 'Одноместный номер — от 5 500 сом/ночь';
    const twin = 'Twin (2 раздельные кровати) — 5 500 сом (1 гость) / 7 000 сом (2 гостя)';
    const queen = 'Queen (King Size кровать) — 5 500 сом (1 гость) / 7 000 сом (2 гостя)';
    const deluxe = 'Deluxe — 8 000 сом/ночь';
    citations.push({
      id: 'src-rates-rooms',
      title: 'Тарифная сетка и номера Kaganat',
      category: 'Номера и тарифы',
      excerpt: `${single}; ${twin}; ${queen}; ${deluxe}. Во все номера включен шведский стол.`
    });
    return {
      answer: `В отеле Kaganat цены начинаются от 5 500 сом в сутки. Во все тарифы уже включен сытный завтрак «шведский стол», Wi-Fi 100 Мбит/с, парковка и уборка:
• Одноместный номер: 5 500 KGS / ночь
• Номер Twin (2 раздельные кровати): 5 500 KGS (1 гость) или 7 000 KGS (2 гостя)
• Номер Queen (большая кровать King size): 5 500 KGS (1 гость) или 7 000 KGS (2 гостя)
• Номер Deluxe (повышенный комфорт, 30 м²): 8 000 KGS / ночь`,
      citations
    };
  }

  // 2. Breakfast
  if (q.includes('завтрак') || q.includes('шведск') || q.includes('кафе') || q.includes('еда') || q.includes('меню') || q.includes('кофе')) {
    citations.push({
      id: 'src-breakfast-menu',
      title: 'Завтрак «Шведский стол» и меню кафе',
      category: 'Завтрак и кафе',
      excerpt: 'Шведский стол сервируется ежедневно с 07:30 до 10:30. Включен во все тарифы.'
    });
    return {
      answer: `Завтрак «шведский стол» в отеле Kaganat сервируется каждое утро с 07:30 до 10:30 в нашем ресторане и уже включён в стоимость каждого номера. В меню: омлеты, каши со сливочным маслом, сосиски халяль, домашние сыры, тандырные лепешки, свежая выпечка, фрукты и натуральный зерновой кофе. При раннем выезде готовим ланч-бокс с собой!`,
      citations
    };
  }

  // 3. Location / landmarks
  if (q.includes('где') || q.includes('адрес') || q.includes('наход') || q.includes('парк') || q.includes('суд') || q.includes('сулайман') || q.includes('центр')) {
    citations.push({
      id: 'src-location-guide',
      title: 'Локация в центре Оша и пешеходный гид',
      category: 'Транспорт и локация',
      excerpt: 'Отель расположен по адресу: ул. Алымбека Датка, 322а. 200 м до суда, 300 м до парка Навои.'
    });
    return {
      answer: `Отель Kaganat находится в центре города Ош по адресу: ул. Алымбека Датка, 322а.
Рядом с отелем в пешей доступности:
• Ошский городской суд — 200 метров (2 минуты пешком)
• Парк им. Алишера Навои — 300 метров (3 минуты пешком)
• Перекресток ул. Гапара Айтиева и Алымбека Датка — 150 метров
• Гора Сулайман-Тоо — 1.8 км (~5 минут на авто)`,
      citations
    };
  }

  // 4. Checkin / checkout
  if (q.includes('заезд') || q.includes('выезд') || q.includes('ранн') || q.includes('поздн') || q.includes('час') || q.includes('круглосуточ')) {
    citations.push({
      id: 'src-checkin-rules',
      title: 'Регламент заезда, выезда и круглосуточного приёма гостей',
      category: 'Правила и заезд',
      excerpt: 'Заезд с 14:00, выезд до 12:00. Стойка регистрации работает 24/7. Ранний заезд с 06:00 бесплатно при наличии комнат.'
    });
    return {
      answer: `Стандартный заезд — с 14:00, выезд — до 12:00. Стойка регистрации работает круглосуточно 24/7! Если вы прилетаете рано утром, с 06:00 до 14:00 мы заселим вас бесплатно при наличии свободного чистого номера. При заезде до 06:00 утра действует доплата 50% от суточного тарифа с включенным завтраком.`,
      citations
    };
  }

  // 5. Payment / documents
  if (q.includes('оплат') || q.includes('карт') || q.includes('qr') || q.includes('документ') || q.includes('чек') || q.includes('счет') || q.includes('командиров')) {
    citations.push({
      id: 'src-payment-accounting',
      title: 'Способы оплаты и отчетность командировочным',
      category: 'Оплата и документы',
      excerpt: 'Принимаются карты Visa/Mastercard, QR (MBank, О!Деньги), безнал по договору. Выдаются фискальные чеки с QR и ЭСФ.'
    });
    return {
      answer: `Оплатить проживание можно любым удобным способом: банковскими картами Visa, Mastercard и Элкарт, бесконтактно по QR-коду (МБанк, О!Деньги, Bakai, Optima), наличными или по безналичному расчету для юридических лиц.
Командировочным предоставляется полный комплект документов: ЭСФ, кассовый фискальный чек с QR налоговой КР, акт выполненных работ.`,
      citations
    };
  }

  // 6. Transfer / airport
  if (q.includes('трансфер') || q.includes('аэропорт') || q.includes('такси') || q.includes('прилет')) {
    citations.push({
      id: 'src-transfer-airport',
      title: 'Организация трансфера в аэропорт Ош (OSS)',
      category: 'Транспорт и локация',
      excerpt: 'Аэропорт Ош находится в 12 км (18–25 минут). Водитель встречает с именной табличкой в зале прилета.'
    });
    return {
      answer: `Отель организует персональный трансфер из/в Международный аэропорт Ош (OSS). Расстояние — 12 км (около 20 минут в пути). Водитель встретит вас прямо в зале прилета с именной табличкой, поможет донести багаж и с комфортом доставит к отелю. Стоимость трансфера от 600 до 1 000 KGS.`,
      citations
    };
  }

  // Default synthesis based on top matching snippets
  const snippet = results[0]?.matchedSnippets[0] || topDoc.description;
  citations.push({
    id: topDoc.id,
    title: topDoc.title,
    category: topDoc.category,
    excerpt: snippet
  });

  return {
    answer: `По вашему запросу найдена подтвержденная информация в источнике «${topDoc.title}»:
${snippet.replace(/#/g, '')}
Вы можете ознакомиться с полным документом в карточке источника ниже или забронировать номер напрямую.`,
    citations
  };
}

// -------------------------------------------------------------
// USER INSTRUCTION REQUIREMENT:
// "сохраняй в истории последние два диалога"
// KEEP THE LAST TWO DIALOGS IN LOCAL STORAGE HISTORY
// -------------------------------------------------------------
const DIALOGS_STORAGE_KEY = 'kaganat_hotel_concierge_dialogs_v1';

export function loadStoredDialogs(): ConciergeDialog[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DIALOGS_STORAGE_KEY);
    if (!raw) {
      // Seed default two helpful dialogs for immediate value
      const initial: ConciergeDialog[] = [
        {
          id: 'dlg-1',
          title: 'Вопрос о завтраке и времени заезда',
          updatedAt: 'Сегодня, 10:15',
          messages: [
            {
              id: 'm-1',
              sender: 'user',
              text: 'Здравствуйте! Входит ли завтрак в стоимость и можно ли заселиться в 6 утра?',
              timestamp: '10:14'
            },
            {
              id: 'm-2',
              sender: 'concierge',
              text: 'Здравствуйте! Да, горячий завтрак «шведский стол» (07:30–10:30) уже включён в абсолютно все номера Kaganat. Стойка регистрации работает 24/7: если чистый номер готов, с 06:00 мы заселим вас бесплатно!',
              timestamp: '10:15',
              citedSources: [
                {
                  id: 'src-breakfast-menu',
                  title: 'Завтрак «Шведский стол» и меню кафе',
                  category: 'Завтрак и кафе',
                  snippet: 'Шведский стол сервируется ежедневно с 07:30 до 10:30. Включен во все тарифы.'
                },
                {
                  id: 'src-checkin-rules',
                  title: 'Регламент заезда, выезда и круглосуточного приёма',
                  category: 'Правила и заезд',
                  snippet: 'С 06:00 до 14:00 предоставляется бесплатно при наличии готового свободного номера.'
                }
              ]
            }
          ]
        },
        {
          id: 'dlg-2',
          title: 'Трансфер из аэропорта и оплата картой',
          updatedAt: 'Вчера, 18:40',
          messages: [
            {
              id: 'm-3',
              sender: 'user',
              text: 'Встречаете ли вы в аэропорту Ош и принимаете ли карты Visa?',
              timestamp: '18:39'
            },
            {
              id: 'm-4',
              sender: 'concierge',
              text: 'Да, мы организуем встречу в зале прилета с именной табличкой (12 км, 20 минут в пути). Оплатить номер можно картой Visa, Mastercard, наличными или по QR-коду МБанк/О!Деньги при заселении.',
              timestamp: '18:40',
              citedSources: [
                {
                  id: 'src-transfer-airport',
                  title: 'Организация трансфера в Международный аэропорт Ош (OSS)',
                  category: 'Транспорт и локация',
                  snippet: 'Водитель ожидает с фирменной табличкой в зале прилета. Время в пути ~20 минут.'
                },
                {
                  id: 'src-payment-accounting',
                  title: 'Способы оплаты и отчетность командировочным',
                  category: 'Оплата и документы',
                  snippet: 'Банковские карты через POS-терминал: Visa, Mastercard, Элкарт, QR-код.'
                }
              ]
            }
          ]
        }
      ];
      localStorage.setItem(DIALOGS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, 2); // Strictly preserve the last two dialogs
    }
  } catch (err) {
    console.error('Error loading dialogs:', err);
  }
  return [];
}

/**
 * Saves or updates a dialog, ensuring STRICTLY the last two dialogs are preserved.
 */
export function saveDialog(dialog: ConciergeDialog): ConciergeDialog[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = loadStoredDialogs();
    const existingIndex = current.findIndex(d => d.id === dialog.id);

    let updatedList: ConciergeDialog[];
    if (existingIndex >= 0) {
      updatedList = [
        dialog,
        ...current.filter(d => d.id !== dialog.id)
      ];
    } else {
      updatedList = [dialog, ...current];
    }

    // Strictly keep only the last TWO dialogs
    const lastTwo = updatedList.slice(0, 2);
    localStorage.setItem(DIALOGS_STORAGE_KEY, JSON.stringify(lastTwo));
    return lastTwo;
  } catch (err) {
    console.error('Error saving dialog:', err);
    return [];
  }
}
