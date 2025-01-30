'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get('q') ?? '');

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();

    router.push(`/blog/archive?q=${searchTerm}`);
  };

  return (
    <form className='w-full' onSubmit={handleSearch}>
      <label htmlFor='search-field' className='font-semibold mb-1 inline-block'>
        Access the blog archive:
      </label>
      <div className='w-full relative'>
        <input
          name='search-field'
          id='search-field'
          type='search'
          className='py-2 pl-2 pr-16 border rounded border-gray-300 w-full'
          value={searchTerm}
          onChange={(e) => {
            if (e.target.value === '') {
              const url = new URL(window.location.href);

              router.replace(url.pathname);
            }
            setSearchTerm(e.target.value);
          }}
        />
        <button className='absolute right-2 top-1/2 -translate-y-1/2' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
