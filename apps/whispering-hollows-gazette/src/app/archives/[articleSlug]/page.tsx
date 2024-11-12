import Link from 'next/link';

interface ArticlePageProps {
  params: Promise<{
    articleSlug: string;
  }>;
  searchParams: Promise<{
    title: string;
    date: string;
  }>;
}

const ArticlePage = async (props: ArticlePageProps) => {
  const { title, date } = await props.searchParams;

  const { articleSlug } = await props.params;

  return (
    <div className='max-w-4xl mx-auto p-8 font-serif'>
      <div className='mb-8'>
        <Link href='/archives?q=hollowbrook' className='text-blue-800 hover:underline text-sm'>
          ← Return to Archive
        </Link>
      </div>

      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold mb-4'>THE WHISPERING HOLLOWS GAZETTE</h1>
        <div className='flex justify-between text-sm text-gray-600 mb-4'>
          <span>{date}</span>
        </div>
      </div>

      <div className='mb-12'>
        <h2 className='text-2xl font-bold mb-2'>{title}</h2>
      </div>

      <div className='w-full h-[min(800px,80dvh)] bg-gray-100'>
        <iframe
          src={`https://res.cloudinary.com/robin-random-files/image/upload/v1731403634/${articleSlug.replace('hbtl-', '')}.pdf#toolbar=0&navpanes=0`}
          className='w-full h-full'
          title={`Whispering Hollows Gazette - ${date}`}
        />
      </div>

      <hr className='my-8 border-gray-300' />

      <footer className='text-sm text-gray-600'>
        <p>
          From the Archives of the{' '}
          <Link href='https://whhs.goudeketting.nl/' className='underline'>
            Whispering Hollows Historical Society
          </Link>
        </p>
        <p className='mt-1'>Digitized and preserved for historical research</p>
      </footer>
    </div>
  );
};

export default ArticlePage;
