'use client';
import DashboardButton from '@/components/DashboardButton';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { usePuzzleAnswerContext } from './context/usePuzzleAnswersContext';

const Buttons = () => {
  const { setPage } = useDashboardPageContext();
  const { frequencyOne, frequencyTwo, frequencyThree } = usePuzzleAnswerContext();

  return (
    <div>
      <div className='flex flex-col gap-4 mb-4'>
        <DashboardButton
          disabled={frequencyOne !== null}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setPage('fragment_1');
            }
          }}
          onClick={() => setPage('fragment_1')}
        >
          Fragment 1
        </DashboardButton>
        {frequencyOne !== null && (
          <DashboardButton
            disabled={frequencyTwo !== null}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setPage('fragment_2');
              }
            }}
            onClick={() => setPage('fragment_2')}
          >
            Fragment 2
          </DashboardButton>
        )}
        {frequencyTwo !== null && (
          <DashboardButton
            disabled={frequencyThree !== null}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setPage('fragment_3');
              }
            }}
            onClick={() => setPage('fragment_3')}
          >
            Fragment 3
          </DashboardButton>
        )}
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
        {frequencyThree !== null && (
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
        )}
      </div>
    </div>
  );
};

export default Buttons;
