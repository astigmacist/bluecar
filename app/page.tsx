"use client";

import { useMemo, useState } from "react";
import { Calculator, CarFront, Check, ChevronDown, MessageCircle, Search, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react";
import { CarCard } from "./components/CarCard";
import { CustomsCalculator } from "./components/CustomsCalculator";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { DEMO_CARS, type Car } from "./data/cars";

const engineFilters = [
  { value: "ALL", label: "Все" },
  { value: "BEV", label: "Электро" },
  { value: "PHEV", label: "PHEV" },
  { value: "EREV", label: "EREV" },
  { value: "ICE", label: "Бензин" },
];

export default function Home() {
  const cars: Car[] = DEMO_CARS;
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState("ALL");
  const [sort, setSort] = useState("popular");

  const filteredCars = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = cars.filter((car) => {
      const matchesEngine = engine === "ALL" || car.engine_type === engine;
      const matchesQuery = !normalized || `${car.brand} ${car.model}`.toLowerCase().includes(normalized);
      return matchesEngine && matchesQuery;
    });
    if (sort === "price_asc") return [...result].sort((a, b) => Number(a.price_from) - Number(b.price_from));
    if (sort === "range_desc") return [...result].sort((a, b) => b.range_km - a.range_km);
    return [...result].sort((a, b) => Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured)) || Number(a.price_from) - Number(b.price_from));
  }, [cars, engine, query, sort]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <Navbar onCatalog={() => scrollTo("catalog")} onCalculator={() => scrollTo("calculator")} />
      <Hero onCatalog={() => scrollTo("catalog")} onCalculator={() => scrollTo("calculator")} />

      <section id="catalog" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              <CarFront size={18} /> Каталог в наличии и под заказ
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Автомобили из Китая</h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-500">Проверенные комплектации с прозрачной стоимостью до вашего города.</p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 lg:self-auto">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            5 моделей в каталоге
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)] sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <span className="sr-only">Поиск автомобиля</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Марка или модель, например BYD Song Plus"
                className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 xl:pb-0" aria-label="Тип двигателя">
              {engineFilters.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setEngine(item.value)}
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold transition ${engine === item.value ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="relative min-w-52">
              <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <span className="sr-only">Сортировка</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-13 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-bold outline-none focus:border-blue-400">
                <option value="popular">Сначала популярные</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="range_desc">Больший запас хода</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </label>
          </div>
        </div>

        {filteredCars.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <Search className="mx-auto mb-4 text-slate-300" size={42} />
            <h3 className="text-xl font-bold">Ничего не найдено</h3>
            <p className="mt-2 text-slate-500">Попробуйте изменить запрос или тип двигателя.</p>
          </div>
        )}
      </section>

      <section className="border-y border-blue-100 bg-blue-600">
        <div className="mx-auto grid max-w-[1320px] gap-6 px-5 py-9 text-white sm:px-8 md:grid-cols-3 lg:px-10">
          {[
            [ShieldCheck, "Юридическая чистота", "Проверка VIN, истории и документов"],
            [Check, "Фиксированная смета", "Без скрытых платежей после договора"],
            [Zap, "Быстрая логистика", "От 18 дней из Китая до вашего города"],
          ].map(([Icon, title, text]) => {
            const FeatureIcon = Icon as typeof ShieldCheck;
            return <div key={String(title)} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"><FeatureIcon size={26} /><div><p className="font-bold">{String(title)}</p><p className="text-sm text-blue-100">{String(text)}</p></div></div>;
          })}
        </div>
      </section>

      <CustomsCalculator />
      <Footer />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a href="https://t.me/blueway_auto" target="_blank" rel="noreferrer" aria-label="Написать в Telegram" className="grid h-14 w-14 place-items-center rounded-full bg-sky-500 text-white shadow-xl shadow-sky-200 transition hover:-translate-y-1 hover:bg-sky-600"><MessageCircle size={24} /></a>
        <a href="https://wa.me/77000000000" target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp" className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-200 transition hover:-translate-y-1 hover:bg-emerald-600"><Calculator size={24} /></a>
      </div>
    </main>
  );
}
