'use client';
import { useScanContext } from '@/components/useScanContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();
  const { setDocumentUrl } = useScanContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setDocumentUrl(url);
    router.push('/reveal');
  };

  return (
    <div className='max-w-4xl w-full p-6'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder='Enter document URL...'
            className='flex-1 p-2 border rounded-lg'
          />
          <button
            type='submit'
            disabled={!url}
            className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 max-w-fit mx-auto'
          >
            Load PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
