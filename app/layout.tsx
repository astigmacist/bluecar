import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["cyrillic", "latin"] });
const unbounded = Unbounded({ variable: "--font-unbounded", subsets: ["cyrillic", "latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "BLUEWAY — автомобили из Китая под ключ",
  description: "Каталог китайских автомобилей с доставкой, таможней и прозрачной стоимостью до вашего города.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "BLUEWAY — автомобили из Китая", description: "Современные электромобили и гибриды под ключ.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "BLUEWAY — автомобили из Китая", description: "Современные электромобили и гибриды под ключ.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body className={`${manrope.variable} ${unbounded.variable}`}>{children}</body></html>;
}
