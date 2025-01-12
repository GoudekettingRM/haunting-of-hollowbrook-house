'use client';
import SetDashboardBackButton from '@/components/SetDashboardBackButton';
import Buttons from './Buttons';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { useGeneralSysAdminContext } from './context/useGeneralSysAdminContext';
import InitialMessages from './InitialMessages';

export type TPage = 'messages' | 'dashboard' | 'fragment_1' | 'fragment_2' | 'fragment_3' | 'fragment_4' | 'fragment_5';

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

  if (page === 'messages') {
    return (
      <>
        <SetDashboardBackButton setPage={setPage} />
        <InitialMessages completed={initialAccessComplete} />
      </>
    );
  }

  if (page === 'fragment_1') {
    return (
      <>
        <SetDashboardBackButton setPage={setPage} />
        Fragment 1
      </>
    );
  }

  return (
    <>
      <p>{encourageMessages[completedPuzzles.length]}</p>
      <Buttons />
    </>
  );
};
export default Dashboard;
