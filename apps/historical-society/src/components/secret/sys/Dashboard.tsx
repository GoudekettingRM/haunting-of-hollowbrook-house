'use client';
import SetDashboardBackButton from '@/components/SetDashboardBackButton';
import Buttons from './Buttons';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { useGeneralSysAdminContext } from './context/useGeneralSysAdminContext';
import InitialMessages from './InitialMessages';
import ExecuteProtocol from './pages/ExecuteProtocol';
import FragmentFive from './pages/FragmentFive';
import FragmentFour from './pages/FragmentFour';
import FragmentOne from './pages/FragmentOne';
import FragmentThree from './pages/FragmentThree';
import FragmentTwo from './pages/FragmentTwo';
import Messages from './pages/Messages';

export type TPage =
  | 'messages'
  | 'dashboard'
  | 'fragment_1'
  | 'fragment_2'
  | 'fragment_3'
  | 'fragment_4'
  | 'fragment_5'
  | 'protocol';

const encourageMessages = [
  "I've managed to put the locations of the fragments here. Please hurry...",
  'Good, you found the first one. Keep going...',
  'You are doing well. Hurry, I cannot keep this dashboard open for long...',
  "You are almost there. One more fragment to go... we're so close...",
  'You did it! You found all protocol fragments. Now, quickly, go to the console and execute the protocol.',
];

const Dashboard = () => {
  const { page, setPage, completedPuzzles } = useDashboardPageContext();
  const { initialAccessComplete } = useGeneralSysAdminContext();

  if (!initialAccessComplete) {
    return <InitialMessages completed={false} />;
  }

  if (page === 'dashboard') {
    return (
      <>
        <p>{encourageMessages[completedPuzzles.length]}</p>
        <Buttons />
      </>
    );
  }

  return (
    <>
      <SetDashboardBackButton setPage={setPage} />
      <div className='w-full h-[1px] bg-[#0f0] !mt-4 !mb-1' />
      {page === 'messages' && <Messages />}
      {page === 'fragment_1' && <FragmentOne />}
      {page === 'fragment_2' && <FragmentTwo />}
      {page === 'fragment_3' && <FragmentThree />}
      {page === 'fragment_4' && <FragmentFour />}
      {page === 'fragment_5' && <FragmentFive />}
      {page === 'protocol' && <ExecuteProtocol />}
    </>
  );
};
export default Dashboard;
