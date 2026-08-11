import { ArrowRight, Calculator, CheckCircle2, Play, Star } from "lucide-react";

type Props = { onCatalog: () => void; onCalculator: () => void };

export function Hero({ onCatalog, onCalculator }: Props) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid min-h-[690px] max-w-[1320px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"><span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" /> Поставки из Китая напрямую</div>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">Ваш новый автомобиль — <span className="text-blue-600">без переплат</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-550 sm:text-xl">Привезём современный автомобиль из Китая в Россию, Беларусь или Казахстан. Под ключ: подбор, проверка, доставка и таможня.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={onCatalog} className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700">Смотреть автомобили <ArrowRight className="transition group-hover:translate-x-1" size={20} /></button>
            <button onClick={onCalculator} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"><Calculator size={20} className="text-blue-600" /> Рассчитать стоимость</button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">{["Договор и гарантия", "Оплата по этапам", "Фотоотчёт 24/7"].map((item) => <span className="flex items-center gap-2" key={item}><CheckCircle2 className="text-blue-600" size={18} />{item}</span>)}</div>
        </div>

        <div className="relative lg:pl-6">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=88" alt="Современный синий электромобиль" className="h-[520px] w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-blue-900/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-7 text-white sm:p-8">
              <div><p className="text-sm font-semibold text-blue-200">Хит недели</p><p className="mt-1 text-2xl font-bold">Электрокроссоверы</p><p className="mt-1 text-sm text-slate-300">от 14 900 000 ₸ под ключ</p></div>
              <button aria-label="Смотреть видеообзор" className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-blue-600 shadow-lg transition hover:scale-105"><Play fill="currentColor" size={19} /></button>
            </div>
          </div>
          <div className="absolute -left-2 top-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:-left-8">
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-amber-50 text-amber-500"><Star fill="currentColor" size={18} /></span><div><p className="text-lg font-black">4.9</p><p className="text-xs font-semibold text-slate-500">128 отзывов</p></div></div>
          </div>
          <div className="absolute -bottom-6 right-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-xl sm:right-8"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Средний срок</p><p className="mt-1 text-2xl font-black text-blue-600">18–35 дней</p></div>
        </div>
      </div>
    </section>
  );
}
