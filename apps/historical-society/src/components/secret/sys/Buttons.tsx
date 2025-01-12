'use client';
import DashboardButton from '@/components/DashboardButton';
import { useDashboardPageContext } from './context/useDashboardPageContext';

const Buttons = () => {
  const { setPage } = useDashboardPageContext();
  return (
    <div>
      <div className='flex flex-col gap-4 mb-4'>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_1');
            }
          }}
          onClick={() => setPage('fragment_1')}
        >
          Fragment 1
        </DashboardButton>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_2');
            }
          }}
          onClick={() => setPage('fragment_2')}
        >
          Fragment 2
        </DashboardButton>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_3');
            }
          }}
          onClick={() => setPage('fragment_3')}
        >
          Fragment 3
        </DashboardButton>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_4');
            }
          }}
          onClick={() => setPage('fragment_4')}
        >
          Fragment 4
        </DashboardButton>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_5');
            }
          }}
          onClick={() => setPage('fragment_5')}
        >
          Fragment 5
        </DashboardButton>
      </div>
      <div className='w-full h-[1px] bg-[#0f0] mb-4' />

      <div className='flex gap-4'>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('messages');
            }
          }}
          onClick={() => setPage('messages')}
        >
          Messages
        </DashboardButton>
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('protocol');
            }
          }}
          onClick={() => setPage('protocol')}
        >
          Protocol
        </DashboardButton>
      </div>
    </div>
  );
};
export default Buttons;
