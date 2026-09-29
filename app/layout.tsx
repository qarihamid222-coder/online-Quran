import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'Online Quran',
  description: 'Read, listen to, and study the Holy Quran online.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoNaskhArabic.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the saved theme before first paint, avoiding a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
