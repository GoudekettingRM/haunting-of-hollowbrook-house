const Footer = () => {
  return (
    <footer className='flex gap-6 flex-col items-center justify-center pt-8 pb-4'>
      <div>Socials</div>
      <p className='text-sm'>Copyrighted property of James Chen 2001 - {new Date().getFullYear()}</p>
    </footer>
  );
};
export default Footer;
