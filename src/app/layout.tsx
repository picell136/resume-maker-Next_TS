import type { Metadata } from "next";
import { Inter, Lora, Merriweather, Open_Sans, PT_Sans, PT_Serif, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

const ptSans = PT_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-sans",
});

const ptSerif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const merriweather = Merriweather({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Resume Constructor | Сервис по созданию своего резюме",
  description: "Сервис по созданию своего резюме: секции, шаблоны, превью, PDF и черновики",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${roboto.variable} ${openSans.variable} ${ptSans.variable} ${ptSerif.variable} ${lora.variable} ${merriweather.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
