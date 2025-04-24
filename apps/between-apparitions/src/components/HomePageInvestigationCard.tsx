'use client';
import { Article } from '@/types/article';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface InvestigationCardProps {
  article: Article;
}

const HomePageInvestigationCard = ({ article }: InvestigationCardProps) => {
  const router = useRouter();
  const href = useMemo(() => {
    return `/blog/${article.year}/${article.month}/${article.day}/${article.slug}`;
  }, [article]);

  return (
    <div
      className='mb-8 overflow-hidden rounded-lg shadow-md border border-gray-400 hover:shadow-lg hover:cursor-pointer hover:bg-gray-100'
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') {
          router.push(href);
        }
      }}
      role='button'
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        router.push(href);
      }}
    >
      <div className='md:flex'>
        <div className='md:w-1/3 relative h-48 md:h-auto'>
          <Image src={article.images[0]} alt={article.title} fill className='object-cover' />
        </div>
        <div className='p-6 md:w-2/3'>
          <h3 className='text-xl font-bold mb-1'>
            <Link href={href} className='hover:underline'>
              {article.title}
            </Link>
          </h3>
          <p className='text-gray-800 text-sm mb-3'>
            {article.day}/{article.month}/{article.year}
          </p>
          <p className='text-gray-700 mb-4'>{article.paragraphs[0].slice(0, 100)}...</p>
          <Link href={href} className='hover:text-indigo-700 font-medium inline-flex items-center'>
            Read the full story
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 ml-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageInvestigationCard;
