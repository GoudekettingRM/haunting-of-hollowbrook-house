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

export const metadata = {
  title: 'The Whispering Hollows Gazette Archive',
  description:
    'Digital archives of The Whispering Hollows Gazette, containing the historical issues of our beloved local newspaper.',
  keywords: ['Whispering Hollows', 'Newspaper', 'Gazette', 'Digital Archive', 'Local History'],
  authors: [{ name: 'Whispering Hollows Historical Society' }],
  creator: 'Whispering Hollows Historical Society',
  publisher: 'Whispering Hollows Historical Society',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'The Whispering Hollows Gazette Archive',
    description:
      'Digital archives of The Whispering Hollows Gazette, documenting the historical issues of our beloved local newspaper.',
    url: 'https://gazette.goudeketting.nl/',
    siteName: 'The Whispering Hollows Gazette Archive',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Whispering Hollows Gazette Archive',
    description: 'Digital archives of The Whispering Hollows Gazette',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: false,
    follow: false,
  },
  category: 'Historical Archives',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
