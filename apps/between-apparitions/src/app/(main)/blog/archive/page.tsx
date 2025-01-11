'use client';
import arts from '@/data/articles.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = Math.ceil(arts.length / ITEMS_PER_PAGE);

const Archive = () => {
  const [page, setPage] = useState(1);
  const [articles] = useState(() => arts.reverse());
  const [articlesToShow, setArticlesToShow] = useState(() => {
    return articles.slice(0, ITEMS_PER_PAGE);
  });

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setArticlesToShow(() => articles.slice(start, end));
    if (typeof window !== undefined) {
      window.scrollTo(0, 0);
    }
  }, [page]);

  const previousPage = () => {
    setPage((prev) => {
      if (prev <= 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const nextPage = () => {
    setPage((prev) => {
      if (prev >= MAX_PAGES) {
        return MAX_PAGES;
      }
      return prev + 1;
    });
  };

  return (
    <div>
      {articlesToShow.map((article) => {
        return (
          <Link
            href={`/blog/${article.year}/${article.month}/${article.day}/${article.slug}`}
            key={article.slug}
            className='hover:bg-indigo-100 block -mx-8 px-8 py-2'
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
      {MAX_PAGES > 1 && (
        <div className='flex gap-1 flex-row flex-nowrap'>
          <button type='button' onClick={() => setPage(1)}>
            ‹‹
          </button>
          <button type='button' onClick={previousPage}>
            ‹
          </button>
          {page - 2 > 0 && (
            <button type='button' onClick={() => setPage(page - 2)}>
              {page - 2}
            </button>
          )}
          {page - 1 > 0 && (
            <button type='button' onClick={() => setPage(page - 1)}>
              {page - 1}
            </button>
          )}
          <button type='button' className='underline text-indigo-700'>
            {page}
          </button>
          {page + 1 <= MAX_PAGES && (
            <button type='button' onClick={() => setPage(page + 1)}>
              {page + 1}
            </button>
          )}
          {page + 2 <= MAX_PAGES && (
            <button type='button' onClick={() => setPage(page + 2)}>
              {page + 2}
            </button>
          )}
          <button type='button' onClick={nextPage}>
            ›
          </button>
          <button type='button' onClick={() => setPage(MAX_PAGES)}>
            ››
          </button>
        </div>
      )}
    </div>
  );
};
export default Archive;
