"use client";

import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

type Props = { onCatalog: () => void; onCalculator: () => void };

export function Navbar({ onCatalog, onCalculator }: Props) {
  const [open, setOpen] = useState(false);
  const run = (callback: () => void) => { callback(); setOpen(false); };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3" aria-label="BLUEWAY — наверх">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-200">BW</span>
          <span className="text-xl font-black tracking-[-0.03em] text-slate-950">BLUE<span className="text-blue-600">WAY</span></span>
        </button>
        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
          <button onClick={onCatalog} className="transition hover:text-blue-600">Автомобили</button>
          <button onClick={onCalculator} className="transition hover:text-blue-600">Калькулятор</button>
          <a href="#process" className="transition hover:text-blue-600">Как купить</a>
        </nav>
        <a href="tel:+77000000000" className="hidden items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 md:flex"><Phone size={17} /> Контакты</a>
        <button className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-2 text-left font-bold"><button onClick={() => run(onCatalog)} className="rounded-xl px-4 py-3 text-left hover:bg-slate-50">Автомобили</button><button onClick={() => run(onCalculator)} className="rounded-xl px-4 py-3 text-left hover:bg-slate-50">Калькулятор</button><a href="tel:+77000000000" className="rounded-xl bg-blue-600 px-4 py-3 text-center text-white">Позвонить</a></div></nav>}
    </header>
  );
}
