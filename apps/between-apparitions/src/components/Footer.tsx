const Footer = () => {
  return (
    <footer className='py-6 text-center text-gray-700 text-sm'>
      <div className='max-w-4xl mx-auto px-4'>
        <p>© 2001-{new Date().getFullYear()} Between Apparitions. All investigations conducted by James Chen.</p>
        <p className='mt-2'>
          This site presents accounts of paranormal investigations. Names and locations may be altered to protect
          privacy.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
