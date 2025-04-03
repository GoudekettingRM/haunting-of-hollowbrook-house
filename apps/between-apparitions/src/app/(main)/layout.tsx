import Aside from '@/components/Aside';
import BackToBlogIndexLink from '@/components/BackToBlogIndexLink';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';

const minerva = localFont({
  src: [
    {
      path: '../../../public/fonts/minerva.woff2',
      style: 'normal',
    },
  ],
  variable: '--font-minerva',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.betweenapparitions.net'),
  title: 'Between Apparitions | Paranormal Investigations',
  description: 'Personal accounts and investigations of paranormal activity from a part-time investigator',
  authors: [{ name: 'James Chen' }],

  // Basic SEO
  keywords: [
    'paranormal',
    'investigation',
    'ghost hunting',
    'haunted places',
    'EMF readings',
    'supernatural',
    'unexplained phenomena',
  ],
  robots: 'index, follow',

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    url: 'https://www.betweenapparitions.net/',
    title: 'Between Apparitions | Paranormal Investigations',
    description: 'Personal accounts and investigations of paranormal activity from a part-time investigator',
    images: [
      {
        url: '/images/social-share.jpg',
        width: 1200,
        height: 630,
        alt: 'Between Apparitions',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Between Apparitions | Paranormal Investigations',
    description: 'Personal accounts and investigations of paranormal activity from a part-time investigator',
    images: ['/images/social-share.jpg'],
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${minerva.variable} antialiased flex flex-col h-dvh`}>
        <div className='flex-1 w-full'>
          <NavBar />
          <BackToBlogIndexLink />
          <div className='max-w-screen-xl w-11/12 mx-auto flex flex-col sm:flex-row'>
            <main className='p-4 sm:p-8 shadow-lg bg-white rounded sm:grow overflow-hidden'>{children}</main>
            <Aside />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
