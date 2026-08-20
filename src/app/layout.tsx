import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Maker",
  description: "Конструктор резюме с шаблонами, превью, PDF и черновиками",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
