import Link from 'next/link';
import { Fragment } from 'react';
import allArticles from '../../articles.json';

interface IArticlePageProps {
  params: { articleSlug: string };
}

const ArticlePage = ({ params: { articleSlug } }: IArticlePageProps) => {
  const article = allArticles.find((article) => article.slug === articleSlug);

  if (!article) {
    return <p>Article not found</p>;
  }

  const parseParagraph = (paragraph: string) => {
    if (paragraph.startsWith('h2:')) {
      const title = paragraph.replace('h2:', '');
      return <h2 className='text-xl font-semibold mt-5 sm:mt-8 mb-2'>{title}</h2>;
    } else if (paragraph.startsWith('ul:')) {
      const listItems = paragraph.slice(3).split('|');
      return (
        <ul className='list-[circle] list-inside mb-3 sm:mb-5 pl-2 sm:pl-6'>
          {listItems.map((item, index) => (
            <li key={index} className='mb-1'>
              {parseInlineElements(item.trim())}
            </li>
          ))}
        </ul>
      );
    } else if (paragraph.startsWith('no-i:')) {
      return (
        <p key={paragraph} className=''>
          {parseInlineElements(paragraph.slice(5))}
        </p>
      );
    } else {
      return (
        <p key={paragraph} className='indent-6 mb-3 sm:mb-5'>
          {parseInlineElements(paragraph)}
        </p>
      );
    }
  };

  const parseInlineElements = (text: string) => {
    const splitText = text.split(/(<a.*?>.*?<\/a>)/g);
    return splitText.map((part, index) => {
      if (part.startsWith('<a')) {
        const pattern = /<a href='([^']*)'>(.*?)<\/a>/;
        const match = part.match(pattern);

        if (match) {
          const [, hrefValue, content] = match;
          return (
            <Link key={index} href={hrefValue} className='text-medium-wood hover:text-dark-wood underline'>
              {content}
            </Link>
          );
        }
      }
      return part;
    });
  };

  return (
    <>
      <Link href='/blog' className='text-sm text-medium-wood hover:text-dark-wood mb-4'>
        ‹ Back to overview
      </Link>
      <h1 className='text-3xl mb-6 mt-3 text-medium-wood'>{article.title}</h1>
      <div className=''>
        {article.paragraphs.map((paragraph, index) => {
          return <Fragment key={`${paragraph}_${index}`}>{parseParagraph(paragraph)}</Fragment>;
        })}
      </div>
      <div className='mt-8 text-sm text-medium-wood italic'>
        <p>
          Published on {article.date} | Last updated on {article.lastEdited}
        </p>
      </div>

      <div className='flex flex-wrap gap-1 mt-8 text-sm italic'>
        {article.tags.map((tag) => {
          return (
            <span key={tag} className='py-1 px-2 rounded-md bg-light-wood text-white'>
              {tag}
            </span>
          );
        })}
      </div>
    </>
  );
};
export default ArticlePage;
