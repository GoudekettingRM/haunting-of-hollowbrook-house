interface IBlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: IBlogLayoutProps) {
  return (
    <article className='bg-old-paper text-dark-wood font-serif p-6 border border-light-wood shadow-antique h-full flex flex-col'>
      <div className='max-w-screen-md'>{children}</div>
    </article>
  );
}
