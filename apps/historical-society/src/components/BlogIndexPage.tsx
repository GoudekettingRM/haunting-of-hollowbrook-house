'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import allArticles from '../app/(main)/blog/articles.json';
import ArticleCard, { Article } from './ArticleCard';
import SwingingDiv from './SwingingBoard';
import { useBuggingContext } from './useBuggingContext';

const ARTICLES_PER_PAGE = 6;

const BlogIndexPage = () => {
  const { isBugged } = useBuggingContext();
  const searchParams = useSearchParams() as { get: (str: string) => string | undefined };
  const articlesToShow = useMemo<Article[]>(() => {
    const search = searchParams.get('search');
    if (search) {
      const searchTerm = search.toLowerCase();
      return allArticles.filter((article) => {
        return (
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      });
    }
    return allArticles;
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articlesToShow.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articlesToShow.slice(startIndex, endIndex);

  const randomBrokenArticleIndexes = useMemo(() => {
    const indexes: number[] = [];
    while (indexes.length < 2) {
      indexes.push(Math.floor(Math.random() * currentArticles.length));
    }
    return Array.from(indexes);
  }, [currentArticles]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(currentPage + 1, totalPages - 1);

      // Adjust if we're near the start or end
      if (currentPage <= 2) {
        endPage = maxVisiblePages - 1;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - (maxVisiblePages - 1);
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className='pt-4'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center max-w-screen-lg mb-6 gap-4 px-4 sm:pl-0'>
        <h1 className={`text-4xl text-dark-wood ${isBugged ? 'rotate-180 w-full' : ''}`}>Recent Posts</h1>
      </div>
      <ul className='space-y-4 mb-8'>
        {currentArticles.map((article) => {
          if (randomBrokenArticleIndexes.includes(currentArticles.indexOf(article))) {
            const index = currentArticles.indexOf(article);
            return (
              <SwingingDiv originSide={randomBrokenArticleIndexes[0] === index ? 'left' : 'right'} key={article.slug}>
                <ArticleCard article={article} />
              </SwingingDiv>
            );
          }
          return <ArticleCard article={article} key={article.slug} />;
        })}
      </ul>

      {totalPages > 1 && (
        <div className='flex justify-center items-center space-x-1 sm:space-x-2 my-6 max-w-screen-lg'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type='button'
            className={`${
              currentPage === 1 ? 'invisible' : ''
            } w-8 h-8 text-dark-wood transition duration-300 text-2xl relative bottom-0.5 border-b border-transparent sm:hover:border-dark-wood`}
          >
            ‹
          </button>

          <div className='flex items-center space-x-1 sm:space-x-2'>
            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                type='button'
                onClick={() => (typeof pageNum === 'number' ? handlePageChange(pageNum) : null)}
                disabled={typeof pageNum !== 'number'}
                className={`w-8 h-8 border-b text-lg hover:opacity-80 ${
                  currentPage === pageNum ? 'border-dark-wood' : 'border-transparent hover:border-dark-wood'
                } ${typeof pageNum !== 'number' ? 'cursor-default' : ''} transition duration-300`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            type='button'
            className={`${
              currentPage === totalPages ? 'invisible' : ''
            } w-8 h-8 text-dark-wood transition duration-300 text-2xl relative bottom-0.5 border-b border-transparent sm:hover:border-dark-wood`}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};
export default BlogIndexPage;
