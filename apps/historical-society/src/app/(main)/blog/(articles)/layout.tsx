interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <article className='bg-old-paper text-dark-wood font-serif p-6 border-t border-b sm:border-t-0 sm:border-l border-light-wood shadow-antique h-full flex flex-col'>
      <div className='max-w-screen-md'>{children}</div>
    </article>
  );
}
