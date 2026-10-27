import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, FileText, ArrowRight } from 'lucide-react';
import { SourceDocument } from '../../data/sourcesData';

interface SourceDetailModalProps {
  source: SourceDocument | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const SourceDetailModal: React.FC<SourceDetailModalProps> = ({
  source,
  onClose,
  onOpenBooking
}) => {
  const [copied, setCopied] = useState(false);

  if (!source) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(source.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-800 bg-stone-950/90 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="text-amber-400 font-semibold">{source.category}</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="font-mono uppercase text-stone-500">{source.type}</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span>{source.date}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-white">
              {source.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
              title="Скопировать текст"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400">Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Копировать</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-sans text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-900/60">
          <div className="p-3 bg-stone-950/80 rounded-xl border border-stone-800/80 text-xs text-stone-400 italic">
            Путь к источнику: <code className="text-amber-400/90 font-mono">{source.file}</code>
          </div>

          <div className="prose prose-invert max-w-none whitespace-pre-wrap font-sans text-stone-200">
            {source.content}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-1.5 text-xs text-stone-400">
            <span className="text-stone-500">Теги документа:</span>
            {source.tags.map((t, idx) => (
              <span key={idx} className="bg-stone-800 px-2 py-0.5 rounded text-stone-300 font-mono text-[11px]">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <span className="text-xs text-stone-500 hidden sm:inline">
            Источник верифицирован администрацией отеля Kaganat
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Забронировать номер</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
