'use client';

import DashboardBackButton from '@/components/DashboardBackButton';
import { useState } from 'react';
import Buttons from './Buttons';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { useGeneralSysAdminContext } from './context/useGeneralSysAdminContext';
import CRTFirework from './Firework';
import InitialMessages from './InitialMessages';
import ExecuteProtocol from './pages/ExecuteProtocol';
import FragmentFour from './pages/FragmentFour';
import FragmentOne from './pages/FragmentOne';
import FragmentThree from './pages/FragmentThree';
import FragmentTwo from './pages/FragmentTwo';
import Messages from './pages/Messages';

const encourageMessages = [
  "I've managed to put the first location of the fragments here. Please hurry...",
  'Good, you found the first one. I also tracked down the second location. I linked it below.',
  'You are doing well. I found the third fragment, hurry, I cannot keep this dashboard open for long...',
  "Good job! I found the last one too. Quickly now, once you're done, execute the protocol. We're so close...",
];

const Dashboard = () => {
  const [showFirework, setShowFirework] = useState(false);
  const { page, setPage, completedPuzzles } = useDashboardPageContext();
  const { initialAccessComplete } = useGeneralSysAdminContext();

  const handleSuccessfulFragment = () => {
    setShowFirework(true);
    setTimeout(() => setPage('dashboard'), 500);
  };

  if (!initialAccessComplete) {
    return <InitialMessages completed={false} />;
  }

  return (
    <>
      {page === 'dashboard' ? (
        <>
          <p>{encourageMessages[completedPuzzles.length]}</p>
          <Buttons />
        </>
      ) : (
        <>
          <DashboardBackButton />
          <div className='w-full h-[1px] bg-[#0f0] !mt-4 !mb-1' />
        </>
      )}
      {page === 'messages' && <Messages />}
      {page === 'fragment_1' && <FragmentOne onSuccess={handleSuccessfulFragment} />}
      {page === 'fragment_2' && <FragmentTwo onSuccess={handleSuccessfulFragment} />}
      {page === 'fragment_3' && <FragmentThree />}
      {page === 'fragment_4' && <FragmentFour />}
      {page === 'protocol' && <ExecuteProtocol />}
      <CRTFirework isVisible={showFirework} onAnimationComplete={() => setShowFirework(false)} />
    </>
  );
};
export default Dashboard;
