export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased flex flex-col min-h-dvh relative'>{children}</body>
    </html>
  );
}
