'use client';
import arts from '@/data/articles.json';
import { filterArticles } from '@/utils/filterArticles';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 10;

interface IArchivePageContentParams {
  query?: string;
}

const ArchivePageContent = ({ query }: IArchivePageContentParams) => {
  const [page, setPage] = useState(1);
  const [articles] = useState(() => arts.reverse());
  const [articlesToShow, setArticlesToShow] = useState(() => {
    return filterArticles(articles, query);
  });
  const [articlesOnPage, setArticlesOnPage] = useState(() => {
    return articlesToShow.slice(0, ITEMS_PER_PAGE);
  });

  const maxPageNumber = useMemo(() => Math.ceil(articlesToShow.length / ITEMS_PER_PAGE), [articlesToShow]);

  useEffect(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    setArticlesOnPage(() => articlesToShow.slice(start, end));
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
      if (prev >= maxPageNumber) {
        return maxPageNumber;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const newArts = filterArticles(articles, query);
    setArticlesToShow(newArts);
    setArticlesOnPage(newArts.slice(0, ITEMS_PER_PAGE));
  }, [query]);

  return (
    <>
      <h1 className='text-3xl font-semibold text-indigo-900 flex justify-between flex-col sm:flex-row w-full items-center'>
        The Archives{' '}
        {query && (
          <span className='text-sm text-gray-600 italic font-normal'>
            {articlesToShow.length} results for {query}
          </span>
        )}
      </h1>
      <div>
        <div>
          {articlesOnPage.map((article) => {
            return (
              <Link
                href={`/blog/${article.year}/${article.month}/${article.day}/${article.slug}`}
                key={article.slug}
                className={`hover:bg-indigo-100 block -mx-8 px-8 py-6 border-b border-gray-300 first:border-t first:mt-4 ${maxPageNumber > 1 ? 'last:mb-4' : 'last:border-none'}`}
              >
                <article className=''>
                  <h2 className=''>{article.title}</h2>
                  <div className='flex justify-between items-center'>
                    <time className='text-sm italic'>
                      {article.year}-{article.month}-{article.day}
                    </time>
                    <p className='hover:underline underline sm:no-underline text-sm'>Read more ›</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
        {maxPageNumber > 1 && (
          <div className='flex gap-4 flex-row flex-nowrap w-fit mx-auto'>
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
            {page + 1 <= maxPageNumber && (
              <button type='button' onClick={() => setPage(page + 1)}>
                {page + 1}
              </button>
            )}
            {page + 2 <= maxPageNumber && (
              <button type='button' onClick={() => setPage(page + 2)}>
                {page + 2}
              </button>
            )}
            <button type='button' onClick={nextPage}>
              ›
            </button>
            <button type='button' onClick={() => setPage(maxPageNumber)}>
              ››
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default ArchivePageContent;
