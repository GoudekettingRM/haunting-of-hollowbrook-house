import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Console',
  description: 'System Console',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-white text-black'>{children}</body>
    </html>
  );
}