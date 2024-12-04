'use client';

import { WithDisappearingLetters } from '@repo/ui/with-disappearing-letters';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useLetterDropTimer } from './useLetterDropTimer';

function Navbar() {
  const enabled = useLetterDropTimer(10000);

  return (
    <WithDisappearingLetters config={{ enabled }}>
      <nav className='flex flex-col p-4'>
        <Link href='/' className='text-2xl' title='Whispering Hollows Historical Society'>
          <span className='block'>
            WHHS<span className='text-4xl'>.</span>
          </span>
          <span className='block text-sm font-serif italic'>Whispering Hollows Historical Society</span>
        </Link>

        <div className='my-4'>
          <SearchBar />
        </div>

        <NavLink name='Home' href='/' />
        <NavLink name='Blog' href='/blog' />
        <NavLink name='Contact' href='/contact' />
      </nav>
    </WithDisappearingLetters>
  );
}
export default Navbar;

function NavLink({ name, href }: { name: string; href: string }) {
  return (
    <Link
      className='flex justify-between w-full flex-nowrap border-b border-b-dark-wood border-opacity-30 last-of-type:border-b-0 py-2 underline sm:no-underline sm:hover:underline'
      href={href}
    >
      <span className='block'>{name}</span> <span className='block'>›</span>
    </Link>
  );
}
