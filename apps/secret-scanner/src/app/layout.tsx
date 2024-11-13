import { ScanProvider } from '@/components/useScanContext';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'PDF Reveal',
  description: "The one and only tool for revealing what's hidden in PDFs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-center`}>
        <main className='min-h-dvh flex flex-col items-center justify-center'>
          <h1 className='mt-4 text-4xl font-semibold'>PDF Reveal</h1>
          <p className='italic text-sm'>The one and only tool for revealing what&apos;s hidden in PDFs.</p>
          <ScanProvider>{children}</ScanProvider>
        </main>
      </body>
    </html>
  );
}
