'use client';
import Image from 'next/image';
import { Suspense } from 'react';
import SearchBar from './SearchBar';

const Aside = () => {
  return (
    <aside className='min-w-48 sm:max-w-[20%] lg:min-w-80 sm:ml-12 mt-8 sm:mt-0'>
      <Suspense>
        <SearchBar />
      </Suspense>
      <div className='flex flex-col items-center'>
        <h2 className='text-lg mt-4 mb-2 lg:my-4 lg:text-2xl text-indigo-900 w-fit'>Who am I</h2>
        <div className='w-full max-w-48'>
          <Image src='/images/james-chen-portrait.png' width={200} height={200} alt='' className='w-full h-auto' />
        </div>
        <p className='prose font-minerva text-base/tight mt-4 text-justify'>
          I started my research into the unknown back in the mid 90&apos;s. I was a young - but ambitions - anthropology
          student. During one of my classes I got introduced to the different beliefs people have. I felt in my bones
          that this was not always merely about belief.
        </p>
      </div>
    </aside>
  );
};
export default Aside;
