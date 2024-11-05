'use client';

import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    const search = input.value.toLowerCase().replace(/\s+/g, '');

    try {
      const response = await fetch('/api/sys-redirect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search }),
      });

      if (response.status === 200) {
        const { redirectUrl } = await response.json();
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push(`/blog?search=${encodeURIComponent(search)}`);
        }
      } else if (response.status === 204) {
        router.push(`/blog?search=${encodeURIComponent(search)}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error redirecting search:', error);
    }
  };

  return (
    <>
      <form className='flex flex-row flex-wrap items-center gap-1' onSubmit={(e) => handleSearch(e)}>
        <label className='w-full leading-tight text-sm' htmlFor='search'>
          Search
        </label>
        <input
          type='search'
          name='search'
          id='search'
          className='h-7 text-black text-sm px-2 grow shrink-0 border border-gray-300 outline-none focus:border-gray-500 hover:border-gray-500 focus-within:border-gray-500'
          placeholder='Search for articles...'
        />
        <button
          type='submit'
          className='border border-gray-300 px-2 h-7 bg-gray-200 hover:bg-gray-300 hover:border-gray-400 rounded'
        >
          Go
        </button>
      </form>
    </>
  );
};
export default SearchBar;
