import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ChatWindow from '../components/ChatWindow';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://whisperinghollows.org'),
  title: {
    default: 'Whispering Hollows Historical Society',
    template: '%s | Whispering Hollows Historical Society',
  },
  description:
    "Preserving and sharing the rich history of Whispering Hollows since 1952. Explore our region's fascinating past, from its founding through the present day.",
  keywords: [
    'Whispering Hollows',
    'historical society',
    'local history',
    'community heritage',
    'Hollowbrook House',
    'Edgar Hollowbrook',
    'American history',
    'historical preservation',
    'cultural heritage',
    'community archives',
    'historical research',
    'genealogy',
  ],
  authors: [
    {
      name: 'Whispering Hollows Historical Society',
      url: 'https://whisperinghollows.org/about',
    },
  ],
  creator: 'Whispering Hollows Historical Society',
  publisher: 'Whispering Hollows Historical Society',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Whispering Hollows Historical Society',
    title: 'Whispering Hollows Historical Society',
    description:
      "Preserving and sharing the rich history of Whispering Hollows since 1952. Explore our region's fascinating past, from its founding through the present day.",
    images: [
      {
        url: '/images/historical-society-building.jpg',
        width: 1200,
        height: 630,
        alt: 'Whispering Hollows Historical Society - Victorian mansion housing our collections and exhibits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whispering Hollows Historical Society',
    description:
      "Preserving and sharing the rich history of Whispering Hollows since 1952. Explore our region's fascinating past, from its founding through the present day.",
    images: ['/images/historical-society-building.jpg'],
    creator: '@WhisperingHist',
    site: '@WhisperingHist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}>
        <div className='flex-grow grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-4 shrink-0 basis-full'>
          <aside className='col-span-1 sm:col-span-2'>
            <Navbar />
          </aside>
          <main className='col-span-1 sm:col-span-6 lg:col-span-10'>{children}</main>
          <ChatWindow />
        </div>
        <Footer />
      </body>
    </html>
  );
}
