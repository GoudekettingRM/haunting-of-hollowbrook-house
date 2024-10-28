'use client';
import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import allArticles from './articles.json';

const ARTICLES_PER_PAGE = 6;

export default function BlogIndex() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(allArticles.length / ARTICLES_PER_PAGE));
  const [articlesToShow, setArticlesToShow] = useState(allArticles);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = articlesToShow.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toLowerCase();

    if (search === 'edgar is still alive') {
      router.push('/blog/whhs-secret-archives/is-edgar-still-alive');
    }

    const filteredArticles = allArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search) ||
        article.tags.some((tag) => tag.toLowerCase().includes(search))
      );
    });
    setArticlesToShow(filteredArticles);
    setTotalPages(Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
    setCurrentPage(1);
  };

  return (
    <div className='pt-4'>
      <div className='flex justify-between align-center max-w-screen-lg mb-6'>
        <h2 className='text-4xl'>Recent Posts</h2>
        <div className='relative'>
          <input
            type='search'
            onChange={(e) => handleSearch(e)}
            className='h-8 self-end rounded-sm min-w-60 px-2 text-black text-sm'
            placeholder='Search for articles...'
          />
          <SearchIcon className='absolute right-2 top-2 text-black w-4 h-4' />
        </div>
      </div>
      <ul className='space-y-4 mb-8'>
        {currentArticles.map((article) => (
          <li key={article.slug} className='bg-white bg-opacity-10 p-4 space-y-2 max-w-screen-lg'>
            <h3 className='text-xl text-parchment'>{article.title}</h3>
            <p className='text-parchment'>{article.excerpt}</p>
            <p className='text-sm text-dark-wood font-serif flex justify-between items-center'>
              <span>Published on {article.date}</span>
              <Link
                className='text-dark-wood text-base italic underline sm:no-underline sm:hover:underline'
                href={`/blog/${article.slug}`}
              >
                Read more ›
              </Link>
            </p>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className='flex justify-center items-center space-x-4 my-6 max-w-screen-lg'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? 'invisible pointer-events-none' : ''
            } text-parchment transition duration-300 text-2xl relative bottom-0.5 border-b border-transparent sm:hover:border-parchment`}
          >
            ‹
          </button>

          <div className='flex items-center space-x-2'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-4 border-b text-lg hover:opacity-80 ${
                  currentPage === pageNum ? 'border-parchment' : 'border-transparent hover:border-parchment'
                } transition duration-300`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages ? 'invisible pointer-events-none' : ''
            } text-parchment transition duration-300 text-2xl relative bottom-0.5 border-b border-transparent sm:hover:border-parchment`}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
