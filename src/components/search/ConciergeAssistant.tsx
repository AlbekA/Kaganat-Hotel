import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, BookOpen, Clock, Plus, Trash2, ArrowRight } from 'lucide-react';
import {
  ConciergeDialog,
  ConciergeDialogMessage,
  loadStoredDialogs,
  saveDialog,
  searchSources,
  generateQuickAnswer
} from '../../lib/searchEngine';
import { SourceDocument } from '../../data/sourcesData';

interface ConciergeAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSourceDetail: (doc: SourceDocument) => void;
  onOpenBooking: (roomType?: string) => void;
}

export const ConciergeAssistant: React.FC<ConciergeAssistantProps> = ({
  isOpen,
  onClose,
  onOpenSourceDetail,
  onOpenBooking
}) => {
  const [dialogs, setDialogs] = useState<ConciergeDialog[]>([]);
  const [activeDialogId, setActiveDialogId] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Load dialogs on open
  useEffect(() => {
    if (isOpen) {
      const stored = loadStoredDialogs();
      setDialogs(stored);
      if (stored.length > 0) {
        setActiveDialogId(stored[0].id);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const activeDialog = dialogs.find(d => d.id === activeDialogId) || dialogs[0];

  const handleStartNewDialog = () => {
    const newId = 'dlg-' + Date.now();
    const newDialog: ConciergeDialog = {
      id: newId,
      title: 'Новый вопрос консьержу',
      updatedAt: 'Только что',
      messages: [
        {
          id: 'welcome-' + Date.now(),
          sender: 'concierge',
          text: 'Здравствуйте! Я онлайн-консьерж отеля Kaganat. Задайте любой вопрос о номерах, шведском столе, трансфере или правилах проживания.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    // Save and enforce preserving strictly the last two dialogs
    const updated = saveDialog(newDialog);
    setDialogs(updated);
    setActiveDialogId(newId);
  };

  const handleSendMessage = (textToSend?: string) => {
    const queryText = (textToSend || inputMessage).trim();
    if (!queryText) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ConciergeDialogMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: timeStr
    };

    // If no active dialog exists, create one
    let targetDialog = activeDialog;
    if (!targetDialog) {
      targetDialog = {
        id: 'dlg-' + Date.now(),
        title: queryText.slice(0, 32) + '...',
        updatedAt: 'Только что',
        messages: []
      };
    }

    const updatedMessages = [...(targetDialog.messages || []), userMsg];
    setInputMessage('');
    setIsTyping(true);

    // Form title from user's query if it was default
    const dialogTitle = targetDialog.title === 'Новый вопрос консьержу'
      ? queryText.slice(0, 30) + '...'
      : targetDialog.title;

    setTimeout(() => {
      // Find answer in knowledge base
      const results = searchSources(queryText);
      const quickAns = generateQuickAnswer(queryText, results);

      let answerText = '';
      let citedSources: ConciergeDialogMessage['citedSources'] = [];

      if (quickAns) {
        answerText = quickAns.answer;
        citedSources = quickAns.citations.map(c => ({
          id: c.id,
          title: c.title,
          category: c.category,
          snippet: c.excerpt
        }));
      } else if (results.length > 0) {
        const top = results[0];
        answerText = `По вашему запросу найдена информация в материале «${top.source.title}»:\n\n${top.matchedSnippets[0] || top.source.description}\n\nСтойка регистрации работает 24/7, и вы также можете забронировать номер прямо на сайте.`;
        citedSources = [
          {
            id: top.source.id,
            title: top.source.title,
            category: top.source.category,
            snippet: top.matchedSnippets[0] || top.source.description
          }
        ];
      } else {
        answerText = `Благодарим за вопрос! По точной формулировке «${queryText}» данных не найдено, но наш дежурный администратор на ресепшн круглосуточно готов ответить по телефону +996 224 000 000 или в WhatsApp.`;
      }

      const botMsg: ConciergeDialogMessage = {
        id: 'bot-' + Date.now(),
        sender: 'concierge',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citedSources
      };

      const updatedDialog: ConciergeDialog = {
        id: targetDialog.id,
        title: dialogTitle,
        updatedAt: 'Сегодня, ' + timeStr,
        messages: [...updatedMessages, botMsg]
      };

      // User instruction: preserve strictly the last 2 dialogs in storage
      const refreshedDialogs = saveDialog(updatedDialog);
      setDialogs(refreshedDialogs);
      setIsTyping(false);
    }, 450);
  };

  const sampleQuestions = [
    'Во сколько подают завтрак?',
    'Сколько стоит номер на двоих?',
    'Как заказать трансфер из аэропорта?',
    'Выдаете ли вы документы для командировки?'
  ];

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
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-serif font-bold">
              K
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">
                Онлайн-консьерж Kaganat Hotel
              </h3>
              <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ответы по источникам · В истории сохраняются последние 2 диалога</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStartNewDialog}
              title="Начать новый диалог"
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Новый вопрос</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть консьержа"
              className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DIALOG HISTORY TABS: Strictly preserves the last 2 dialogs */}
        <div className="px-4 py-2 bg-stone-950/60 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] text-stone-500 whitespace-nowrap mr-1">
            История (2 диалога):
          </span>
          {dialogs.map((dlg, idx) => (
            <button
              key={dlg.id}
              type="button"
              onClick={() => setActiveDialogId(dlg.id)}
              className={`px-3 py-1 text-xs rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                (activeDialog?.id === dlg.id)
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <MessageSquare className="w-3 h-3" />
              <span className="max-w-[140px] truncate">{dlg.title}</span>
              <span className="text-[10px] opacity-70">#{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-900/40">
          {activeDialog?.messages?.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 font-medium rounded-br-none shadow-sm'
                      : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Cited source citations */}
                  {msg.citedSources && msg.citedSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-stone-800/80 space-y-1.5 text-[11px]">
                      <span className="font-semibold text-amber-400 block">
                        Источники информации:
                      </span>
                      {msg.citedSources.map((cite, i) => (
                        <div
                          key={i}
                          className="p-2 bg-stone-900/80 rounded-lg border border-stone-800 flex items-start justify-between gap-2"
                        >
                          <div>
                            <strong className="text-white block font-medium">
                              {cite.title}
                            </strong>
                            <span className="text-stone-400 text-[10px]">
                              {cite.snippet}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-500 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic bg-stone-950 border border-stone-800 p-3 rounded-2xl rounded-bl-none max-w-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Консьерж ищет ответ в базе знаний...</span>
            </div>
          )}
        </div>

        {/* Sample questions chips */}
        <div className="px-4 py-2 bg-stone-950/60 border-t border-stone-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-500 whitespace-nowrap text-[11px]">Спросить:</span>
          {sampleQuestions.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(sq)}
              className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-md transition-colors whitespace-nowrap cursor-pointer text-[11px]"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Спросите о номерах, завтраке, парковке, суде..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Отправить вопрос"
              className="p-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 disabled:opacity-40 text-stone-950 rounded-xl transition-all cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
