'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const BackToBlogIndexLink = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes('/blog/archive')) {
    return (
      <div className='max-w-screen-xl w-11/12 mx-auto flex flex-col sm:flex-row'>
        <Link className='mb-2 text-sm text-gray-700 underline hover:underline sm:no-underline' href='/blog'>
          ‹ Back to recent blogs
        </Link>
      </div>
    );
  }

  if (pathname.includes('/blog/')) {
    return (
      <div className='max-w-screen-xl w-11/12 mx-auto flex flex-col sm:flex-row'>
        <Link
          className='mb-2 text-sm text-gray-700 underline hover:underline sm:no-underline'
          href=''
          onClick={() => router.back()}
        >
          ‹ Back
        </Link>
      </div>
    );
  }

  return null;
};
export default BackToBlogIndexLink;
