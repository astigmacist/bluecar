import { ArrowUpRight, BatteryCharging, Gauge, MapPin, PlayCircle } from "lucide-react";
import type { Car } from "../data/cars";

const engineLabels: Record<string, string> = { BEV: "Электро", PHEV: "Гибрид PHEV", EREV: "Гибрид EREV", ICE: "Бензин" };
const formatter = new Intl.NumberFormat("ru-RU");

export function CarCard({ car }: { car: Car }) {
  const minPrice = car.min_price ?? Number(car.price_from);
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img src={car.image_url || "https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=1000&q=80"} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-4 top-4 flex gap-2"><span className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">{engineLabels[car.engine_type] ?? car.engine_type}</span>{car.is_featured && <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-900 shadow-lg">Популярный</span>}</div>
        {car.video_url && <a href={car.video_url} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-blue-600 shadow-lg transition hover:scale-105" aria-label={`Видеообзор ${car.brand} ${car.model}`}><PlayCircle size={22} /></a>}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-wider text-blue-600">{car.brand}</p><h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">{car.model}</h3></div><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">{car.year}</span></div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4 text-center text-xs font-semibold text-slate-500">
          <div className="flex flex-col items-center gap-1.5"><BatteryCharging size={18} className="text-blue-600" /><span>{car.range_km ? `${car.range_km} км` : "—"}</span></div>
          <div className="flex flex-col items-center gap-1.5"><Gauge size={18} className="text-blue-600" /><span>{car.power_hp} л.с.</span></div>
          <div className="flex flex-col items-center gap-1.5"><MapPin size={18} className="text-blue-600" /><span>{car.status === "IN_STOCK" ? "В наличии" : "Под заказ"}</span></div>
        </div>
        <div className="mt-5 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold text-slate-400">Стоимость под ключ от</p><p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{formatter.format(minPrice)} ₸</p><p className="mt-1 text-xs text-slate-400">{car.trims?.length ?? 0} комплектации</p></div><button className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white" aria-label={`Подробнее о ${car.brand} ${car.model}`}><ArrowUpRight size={21} /></button></div>
      </div>
    </article>
  );
}
