import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='w-full p-4 bg-white shadow-lg mb-10 flex justify-between'>
      <Link href='/'>
        <div className='font-mono'>Between Apparitions</div>
      </Link>
      <ul className='flex gap-4'>
        <li>
          <Link href='/blog'>Blog</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
