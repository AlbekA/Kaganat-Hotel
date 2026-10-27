import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Filter, BookOpen, ExternalLink, Calendar, Tag, ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { HOTEL_SOURCES, SourceDocument } from '../../data/sourcesData';
import { searchSources, generateQuickAnswer, SearchResult } from '../../lib/searchEngine';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onOpenSourceDetail: (doc: SourceDocument) => void;
  onOpenBooking: (roomType?: string) => void;
}

export const SmartSearchModal: React.FC<SmartSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onOpenSourceDetail,
  onOpenBooking
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>('all');
  const [fileType, setFileType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setDebouncedQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);
    return () => clearTimeout(handler);
  }, [query]);

  // Execute search
  const results: SearchResult[] = useMemo(() => {
    return searchSources(debouncedQuery, {
      category,
      type: fileType,
      sortBy
    });
  }, [debouncedQuery, category, fileType, sortBy]);

  // Generate Quick Answer
  const quickAnswer = useMemo(() => {
    return generateQuickAnswer(debouncedQuery, results);
  }, [debouncedQuery, results]);

  if (!isOpen) return null;

  const popularChips = [
    'Завтрак',
    'Цены на номера',
    'Суд 200 м',
    'Ранний заезд 24/7',
    'Трансфер OSS',
    'Оплата QR'
  ];

  const categories = [
    { id: 'all', label: 'Все категории' },
    { id: 'Номера и тарифы', label: 'Номера и тарифы' },
    { id: 'Завтрак и кафе', label: 'Завтрак и кафе' },
    { id: 'Правила и заезд', label: 'Правила и заезд' },
    { id: 'Транспорт и локация', label: 'Транспорт и локация' },
    { id: 'Оплата и документы', label: 'Оплата и документы' },
    { id: 'Удобства и сервис', label: 'Удобства и сервис' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs font-serif">
                K
              </span>
              <h3 className="text-base sm:text-lg font-bold font-display text-white">
                Поиск по источникам отеля Kaganat
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть поиск"
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-3.5" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите запрос: например, «завтрак шведский стол», «суд», «отчетные документы», «twin»..."
              className="w-full bg-stone-900 border border-stone-700 rounded-2xl pl-12 pr-10 py-3 text-sm sm:text-base text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-3.5 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick chips & filters */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-500">Частые:</span>
              {popularChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setQuery(chip)}
                  className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-md transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-stone-800 border border-stone-700 text-stone-300 rounded-md px-2 py-1 text-xs focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-800 border border-stone-700 text-stone-300 rounded-md px-2 py-1 text-xs focus:outline-none"
              >
                <option value="relevance">По релевантности</option>
                <option value="date">По дате</option>
                <option value="title">По названию</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Quick Answer Card if available */}
          {quickAnswer && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/20 border border-amber-500/40 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Краткий ответ по источникам отеля</span>
                </div>
                <span className="text-[10px] text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded">
                  Детерминированная выжимка
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line font-medium">
                {quickAnswer.answer}
              </p>

              {/* Citations */}
              <div className="pt-2 border-t border-amber-500/20 flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                <span className="font-semibold text-amber-300">Подтверждено в:</span>
                {quickAnswer.citations.map((cite, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-stone-300 font-mono text-[10px]"
                  >
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>{cite.title}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Results Count & Status */}
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>
              Найдено источников: <strong className="text-white">{results.length}</strong>
            </span>
            <span className="text-stone-500">База знаний Kaganat (демо-данные на основе 2ГИС)</span>
          </div>

          {/* Result Cards */}
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map(({ source, matchedSnippets, relevancePercent }) => (
                <div
                  key={source.id}
                  className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800 hover:border-stone-700 transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span className="text-amber-400 font-medium">{source.category}</span>
                        <span aria-hidden="true" className="text-stone-700">·</span>
                        <span className="font-mono uppercase text-[11px] text-stone-500">{source.type}</span>
                        <span aria-hidden="true" className="text-stone-700">·</span>
                        <span className="text-stone-500">{source.date}</span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {source.title}
                      </h4>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                        {relevancePercent}% совпадение
                      </span>
                    </div>
                  </div>

                  {/* Matched Snippet */}
                  <div className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                    <p className="line-clamp-2 italic">
                      "{matchedSnippets[0] || source.description}"
                    </p>
                  </div>

                  {/* Tags and Action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-stone-500">
                      {source.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="hover:text-stone-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenSourceDetail(source);
                        }}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Открыть документ</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">Ничего не найдено</h4>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  По запросу «{query}» совпадений не обнаружено. Попробуйте изменить формулировку или выберите один из частых запросов выше.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg transition-colors"
              >
                Показать все 10 документов
              </button>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <span>
            Хотите забронировать номер напрямую?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Забронировать номер</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
