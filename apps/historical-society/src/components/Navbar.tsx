'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { useBuggingContext } from './useBuggingContext';

function Navbar() {
  const contactPageLinkRef = useRef<HTMLAnchorElement>(null);
  const { isBugged } = useBuggingContext();

  const moveContactPageLink = useCallback(() => {
    if (!isBugged) return;

    const contactPageLink = contactPageLinkRef.current;
    if (!contactPageLink) return;

    const x = Math.random() * (window.innerWidth - contactPageLink.offsetWidth);
    const y = Math.random() * (window.innerHeight - contactPageLink.offsetHeight);

    contactPageLink.style.position = 'absolute';
    contactPageLink.style.left = `${x}px`;
    contactPageLink.style.top = `${y}px`;
    contactPageLink.style.zIndex = '9999';
    contactPageLink.style.width = 'fit-content';
  }, [isBugged, contactPageLinkRef.current]);

  useEffect(() => {
    if (!isBugged) return;

    const contactPageLink = contactPageLinkRef.current;
    if (!contactPageLink) return;

    contactPageLink.addEventListener('mouseover', moveContactPageLink);
    contactPageLink.addEventListener('click', moveContactPageLink);

    return () => {
      contactPageLink.removeEventListener('mouseover', moveContactPageLink);
      contactPageLink.removeEventListener('click', moveContactPageLink);
    };
  }, [contactPageLinkRef.current, moveContactPageLink, isBugged]);

  return (
    <nav className='flex flex-col p-4'>
      <Link
        href='/'
        className={`text-2xl ${isBugged ? 'animate-bounce' : ''}`}
        title='Whispering Hollows Historical Society'
      >
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
      <Link
        ref={contactPageLinkRef}
        className='transition-all ease-in-out duration-500 flex justify-between w-full flex-nowrap border-b border-b-dark-wood border-opacity-30 last-of-type:border-b-0 py-2 underline sm:no-underline sm:hover:underline'
        href={'/contact'}
      >
        <span className='block'>Contact</span> <span className='block'>›</span>
      </Link>
    </nav>
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
