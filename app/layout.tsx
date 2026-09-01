import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Группа «Эталон» — квартиры в новых домах",
    template: "%s | Эталон",
  },
  description:
    "Новые жилые проекты Группы «Эталон» в Москве. Подбор квартир, условия покупки и информация о строительстве.",
  icons: {
    icon: "/brand/symbol-etalon.svg",
    shortcut: "/brand/symbol-etalon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
