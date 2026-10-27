import React from 'react';
import { FileCheck, ShieldAlert, Award, FileSpreadsheet, Building, CheckCircle2 } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  const credentials = [
    {
      title: 'Официальный статус 4★',
      desc: 'Соответствие государственным стандартам гостиничных услуг Кыргызской Республики для отелей 4 звезды.',
      icon: Award
    },
    {
      title: 'Полная бухгалтерская отчетность',
      desc: 'Электронные счет-фактуры (ЭСФ) через систему ГНС КР, фискальные кассовые чеки с QR-кодом для бухгалтерии.',
      icon: FileSpreadsheet
    },
    {
      title: 'Санитарный паспорт и гигиена',
      desc: 'Регулярная дезинфекция, гипоаллергенная прачечная, кварцевание холлов и ежедневная обработка поверхностей.',
      icon: FileCheck
    },
    {
      title: 'Пожарная безопасность и охрана',
      desc: 'Круглосуточный пост охраны, датчики дыма в каждом номере, противопожарные двери и система видеонаблюдения.',
      icon: ShieldAlert
    }
  ];

  return (
    <section className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
            Юридическая чистота и гарантии
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
            Официальные стандарты и документы для юридических лиц
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Мы работаем строго в правовом поле. Командировочные и корпоративные заказчики получают 100% закрывающих документов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:border-stone-300 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {cred.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cred.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Стандарт подтвержден</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong className="text-stone-900 font-semibold block sm:inline mr-2">
                Для корпоративных договоров:
              </strong>
              Предоставляем акты сверки, персональные скидки на долгосрочное проживание и оплату по безналичному расчету.
            </div>
          </div>
          <span className="font-mono text-stone-500 whitespace-nowrap">
            ИНН отеля: 01802202610190
          </span>
        </div>
      </div>
    </section>
  );
};
