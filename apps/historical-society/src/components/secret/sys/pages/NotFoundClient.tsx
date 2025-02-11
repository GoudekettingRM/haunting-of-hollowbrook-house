'use client';

import { STATUS_COOKIE_NAME } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect } from 'react';

export default function NotFoundClient() {
  useEffect(() => {
    const adminReset = (event: KeyboardEvent) => {
      if (!(event.ctrlKey && event.altKey && event.key === 'Enter')) {
        Cookies.set(STATUS_COOKIE_NAME, 'bugged');
        window.location.reload();
      }
    };
    document.addEventListener('keydown', adminReset);
    return () => document.removeEventListener('keydown', adminReset);
  }, []);

  return (
    <div className='flex h-screen flex-col items-center justify-center text-center font-sans'>
      <div className='flex items-center'>
        <h1 className='mr-5 inline-block border-r border-white px-6 text-2xl font-medium leading-[49px]'>404</h1>
        <div className='inline-block'>
          <h2 className='m-0 text-sm font-normal leading-[49px]'>This page could not be found.</h2>
        </div>
      </div>
      <p className='text-sm font-normal leading-[49px] ml-4'>
        Check the URL or navigate back{' '}
        <Link href='/' className='underline'>
          home ›
        </Link>
      </p>
    </div>
  );
}
