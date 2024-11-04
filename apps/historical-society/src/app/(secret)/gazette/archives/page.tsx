import Link from 'next/link';

const ArchivesPage = ({ searchParams: { q } }: { searchParams: { q?: string } }) => {
  if (!q || !q.includes('hollowbrook')) {
    return (
      <div className='p-4 font-serif'>
        <p>404 - Not Found</p>
      </div>
    );
  }

  const articles = [
    {
      date: '1934-06-15',
      title: 'Modern Mansion Rises on Town Outskirts',
      filename: 'hbtl-15061934',
    },
    {
      date: '1939-09-02',
      title: 'Inventor Hollowbrook Vanishes in Night of Mystery',
      filename: 'hbtl-02091939',
    },
    {
      date: '1960-09-01',
      title: 'Court Declares Edgar Hollowbrook Legally Dead',
      filename: 'hbtl-01091960',
    },
    {
      date: '1980-03-19',
      title: 'Hollowbrook House to Reopen After Four Decades',
      filename: 'hbtl-19031980',
    },
    {
      date: '1981-06-16',
      title: 'History Repeats at Hollowbrook House',
      filename: 'hbtl-16061981',
    },
    {
      date: '2002-06-15',
      title: 'Second Hollowbrook Disappearance Case Closed',
      filename: 'hbtl-15062002',
    },
    {
      date: '2005-10-15',
      title: 'Hollowbrook House Enters New Era',
      filename: 'hbtl-15062005',
    },
  ].reverse();

  return (
    <div className='p-8 max-w-3xl mx-auto font-serif bg-white'>
      <h1 className='text-2xl mb-6'>Whispering Hollows Gazette Archives</h1>
      <p className='text-sm mb-4'>Found {articles.length} results for "hollowbrook"</p>
      <hr className='mb-6 border-gray-300' />

      <div className='space-y-4'>
        {articles.map((article) => (
          <div key={article.date} className='flex gap-4'>
            <div className='w-24 text-gray-600 shrink-0'>[{article.date}]</div>
            <div>
              <Link
                href={`/gazette/archives/${article.filename}?title=${encodeURIComponent(article.title)}&date=${article.date}`}
                className='text-blue-800 hover:underline visited:text-purple-900'
                rel='noopener noreferrer'
              >
                {article.title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <hr className='mt-6 mb-4 border-gray-300' />
      <footer className='text-sm text-gray-600'>
        <p>Archive maintained by Whispering Hollows Historical Society</p>
      </footer>
    </div>
  );
};

export default ArchivesPage;
