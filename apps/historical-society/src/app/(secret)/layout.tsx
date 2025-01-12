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
      <body className='bg-white text-black'>
        <div className='min-h-screen bg-black p-6'>
          <div className='mx-auto max-w-4xl'>
            <div className='relative mt-10 border border-[#0f0] p-6'>
              <div className='absolute -top-4 left-6 border border-[#0f0] bg-black px-4 text-[#0f0]'>
                SYSTEM ACCESS TERMINAL
              </div>
              <div className='h-full w-full max-h-[80dvh] overflow-y-scroll'>
                <div className='space-y-2 font-mono text-[#0f0]'>
                  <SystemAdminProviders>{children}</SystemAdminProviders>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
