import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/theme-provider';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const metadata: Metadata = {
  title: 'GSB AlmaU — AI-консультант для поступления',
  description: 'Graduate School of Business AlmaU: программы MBA, EMBA, DBA и short programs. AI-ассистент для абитуриентов.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
