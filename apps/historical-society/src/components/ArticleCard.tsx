import Link from 'next/link';

export interface Article {
  title: string;
  date: string;
  lastEdited: string;
  excerpt: string;
  paragraphs: string[];
  tags: string[];
  slug: string;
}

interface ArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <li className='bg-light-wood bg-opacity-10 p-4 space-y-2 max-w-screen-lg'>
      <Link className='underline hover:underline sm:no-underline' href={`/blog/${article.slug}`}>
        <h2 className='text-lg text-dark-wood'>{article.title}</h2>
      </Link>
      <p className='text-sm text-dark-wood'>{article.excerpt}</p>
      <p className='text-sm text-dark-wood font-serif flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <span>Published on {article.date}</span>
        <Link
          className='text-dark-wood text-sm italic underline sm:no-underline sm:hover:underline'
          href={`/blog/${article.slug}`}
        >
          Read more ›
        </Link>
      </p>
    </li>
  );
}
export default ArticleCard;
