"use client";

import { ArrowRight, Calculator, Info } from "lucide-react";
import { useMemo, useState } from "react";

const destinationRates: Record<string, { delivery: number; duty: number; label: string }> = {
  KZ: { delivery: 850000, duty: 0.15, label: "Казахстан" },
  RU: { delivery: 1100000, duty: 0.20, label: "Россия" },
  BY: { delivery: 1200000, duty: 0.18, label: "Беларусь" },
};
const format = new Intl.NumberFormat("ru-RU");

export function CustomsCalculator() {
  const [price, setPrice] = useState(12000000);
  const [destination, setDestination] = useState("KZ");
  const [engine, setEngine] = useState("BEV");
  const result = useMemo(() => {
    const base = Number.isFinite(price) ? price : 0;
    const rate = destinationRates[destination];
    const engineFactor = engine === "BEV" ? 0.035 : engine === "PHEV" || engine === "EREV" ? 0.055 : 0.08;
    const customs = Math.round(base * (rate.duty + engineFactor));
    const broker = 185000;
    return { customs, delivery: rate.delivery, broker, total: base + customs + rate.delivery + broker };
  }, [destination, engine, price]);

  return (
    <section id="calculator" className="scroll-mt-24 bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="self-center">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-400"><Calculator size={18} /> Онлайн-калькулятор</div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Узнайте бюджет до вашего города</h2>
          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-400">Предварительный расчёт включает стоимость автомобиля, логистику, таможенные платежи и оформление.</p>
          <div id="process" className="mt-8 space-y-4">{["Выберите автомобиль", "Получите точную смету", "Заключите договор и отслеживайте доставку"].map((text, index) => <div key={text} className="flex items-center gap-4"><span className="grid h-9 w-9 place-items-center rounded-full border border-blue-500/40 bg-blue-500/10 text-sm font-black text-blue-300">{index + 1}</span><span className="font-semibold text-slate-200">{text}</span></div>)}</div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className="mb-2 block text-sm font-bold text-slate-700">Стоимость автомобиля в Китае, ₸</span><input type="number" min="1000000" step="100000" value={price} onChange={(event) => setPrice(Number(event.target.value))} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-lg font-bold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></label>
            <label><span className="mb-2 block text-sm font-bold text-slate-700">Страна назначения</span><select value={destination} onChange={(event) => setDestination(event.target.value)} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-semibold outline-none focus:border-blue-500"><option value="KZ">Казахстан</option><option value="RU">Россия</option><option value="BY">Беларусь</option></select></label>
            <label><span className="mb-2 block text-sm font-bold text-slate-700">Силовая установка</span><select value={engine} onChange={(event) => setEngine(event.target.value)} className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 font-semibold outline-none focus:border-blue-500"><option value="BEV">BEV — электро</option><option value="PHEV">PHEV — гибрид</option><option value="EREV">EREV — последовательный гибрид</option><option value="ICE">ICE — бензин</option></select></label>
          </div>
          <div className="mt-7 rounded-2xl bg-blue-50 p-5 sm:p-6">
            <div className="space-y-3 border-b border-blue-100 pb-5 text-sm">{[["Автомобиль", price], ["Доставка до страны", result.delivery], ["Таможня и сборы", result.customs], ["Оформление", result.broker]].map(([label, value]) => <div key={String(label)} className="flex justify-between gap-4"><span className="text-slate-500">{label}</span><span className="font-bold">{format.format(Number(value))} ₸</span></div>)}</div>
            <div className="flex items-end justify-between gap-4 pt-5"><div><p className="text-sm font-bold text-blue-700">Ориентировочно под ключ</p><p className="mt-1 text-3xl font-black tracking-tight text-slate-950">{format.format(result.total)} ₸</p></div><button className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-600 text-white"><ArrowRight /></button></div>
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-400"><Info size={15} className="mt-0.5 shrink-0" /> Расчёт ориентировочный и не является публичной офертой. Итог зависит от курса, объёма двигателя, возраста авто и города доставки.</p>
        </div>
      </div>
    </section>
  );
}
