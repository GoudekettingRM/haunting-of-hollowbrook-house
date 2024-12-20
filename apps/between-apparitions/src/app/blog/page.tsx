import articles from '@/data/articles.json';
import Link from 'next/link';

const BlogIndex = () => {
  return (
    <div>
      {articles.map((article) => {
        return (
          <article key={article.slug} className=''>
            <h1>{article.title}</h1>
            <time>
              {article.year}-{article.month}-{article.day}
            </time>
            <Link href={`/blog/${article.year}/${article.month}/${article.day}/${article.slug}`}>Read more ›</Link>
          </article>
        );
      })}
    </div>
  );
};
export default BlogIndex;
