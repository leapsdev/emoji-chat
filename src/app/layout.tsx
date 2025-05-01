'use client';

import '@/styles/globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { PrivyProvider } from '@/components/providers/privy-provider';
import { Toaster } from 'sonner';

// メタデータは別ファイルに移動するため、一時的にここでは型のみ定義
type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrivyProvider>
          {children}
          <Toaster />
        </PrivyProvider>
      </body>
    </html>
  );
}
