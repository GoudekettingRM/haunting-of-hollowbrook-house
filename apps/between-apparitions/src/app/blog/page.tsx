import articles from '@/data/articles.json';
import Link from 'next/link';

const BlogIndex = () => {
  return (
    <div>
      {articles.reverse().map((article) => {
        return (
          <Link
            href={`/blog/${article.year}/${article.month}/${article.day}/${article.slug}`}
            key={article.slug}
            className=''
          >
            <article className=''>
              <h1>{article.title}</h1>
              <time>
                {article.year}-{article.month}-{article.day}
              </time>
              <p className='hover:underline underline sm:no-underline'>Read more ›</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
};
export default BlogIndex;
