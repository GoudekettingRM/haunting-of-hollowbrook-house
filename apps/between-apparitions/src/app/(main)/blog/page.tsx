import articles from '@/data/articles.json';
import Link from 'next/link';

const MAX_ARTICLES_BEFORE_ARCHIVE = 6;

const BlogIndex = () => {
  const blogIndexArticles = articles.slice(articles.length - MAX_ARTICLES_BEFORE_ARCHIVE, articles.length);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {blogIndexArticles.reverse().map((article) => {
        return (
          <Link
            href={`/blog/${article.year}/${article.month}/${article.day}/${article.slug}`}
            key={article.slug}
            className='bg-indigo-100 hover:bg-indigo-200 block group rounded-lg overflow-hidden'
          >
            <div
              style={{
                backgroundImage: `url(${article.images[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',
              }}
              className='group-hover:brightness-75'
            />
            <div className='px-4 py-2 mt-auto'>
              <h1>{article.title}</h1>
              <time>
                {article.year}-{article.month}-{article.day}
              </time>
              <p className='hover:underline underline sm:no-underline ml-auto text-right'>Read more ›</p>
            </div>
          </Link>
        );
      })}
      {articles.length > MAX_ARTICLES_BEFORE_ARCHIVE && (
        <div className='text-center underline sm:no-underline hover:underline -mb-2 mt-2 col-span-full'>
          <Link href='/blog/archive'>Go to blog archive ›</Link>
        </div>
      )}
    </div>
  );
};
export default BlogIndex;
