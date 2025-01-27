import Image from 'next/image';
import SearchBar from './SearchBar';

const Aside = () => {
  return (
    <aside className='min-w-48 max-w-[30%] lg:min-w-80 sm:ml-12 '>
      <SearchBar />
      <div className='flex flex-col items-center'>
        <h2 className='text-lg mt-4 mb-2 lg:my-4 lg:text-2xl text-indigo-900 w-fit'>Who am I</h2>
        <div className='w-full'>
          <Image
            src='https://images.pexels.com/photos/19123685/pexels-photo-19123685/free-photo-of-black-and-white-photograph-of-a-rocky-coast-with-a-lighthouse.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            width={200}
            height={200}
            alt=''
            className='w-full h-auto'
          />
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
