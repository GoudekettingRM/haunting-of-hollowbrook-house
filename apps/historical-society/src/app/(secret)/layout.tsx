import type { Metadata } from 'next';
import SystemAdminProviders from './providers';
import './secret.css';

export const metadata: Metadata = {
  title: 'Console',
  description: 'System Console',
  robots: 'noindex, nofollow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-black text-white selection:bg-[#0f0] selection:bg-opacity-20 sys-admin'>
        <SystemAdminProviders>{children}</SystemAdminProviders>
      </body>
    </html>
  );
}
