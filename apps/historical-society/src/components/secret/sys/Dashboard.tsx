import DashboardBackButton from '@/components/DashboardBackButton';
import DashboardButton from '@/components/DashboardButton';
import {
  PLAYER_EMAIL_CONFIRMED_COOKIE_NAME,
  PLAYER_EMAIL_COOKIE_NAME,
  PLAYER_NAME_COOKIE_NAME,
} from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { FormEvent, useEffect, useState } from 'react';
import Buttons from './Buttons';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { useGeneralSysAdminContext } from './context/useGeneralSysAdminContext';
import DashboardInput from './DashboardInput';
import CRTFirework from './Firework';
import InitialMessages from './InitialMessages';
import ExecuteProtocol from './pages/ExecuteProtocol';
import FragmentOne from './pages/FragmentOne';
import FragmentThree from './pages/FragmentThree';
import FragmentTwo from './pages/FragmentTwo';
import Messages from './pages/Messages';

const encourageMessages = [
  'Click the button below to get started on the first frequency. Please hurry...',
  'Good, you found the first one. I linked the next one below.',
  'You are doing well. Let\s get started on the third frequency.',
  "Good job! I found the last one too. Quickly now, figure out how to execute the protocol. We're so close...",
];

const Dashboard = () => {
  const [showFirework, setShowFirework] = useState(false);
  const { page, setPage, completedPuzzles } = useDashboardPageContext();
  const { initialAccessComplete } = useGeneralSysAdminContext();

  const [playerName, setPlayerName] = useState('');
  const [tempName, setTempName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);

  useEffect(() => {
    const name = Cookies.get(PLAYER_NAME_COOKIE_NAME);
    const email = Cookies.get(PLAYER_EMAIL_COOKIE_NAME);
    const emailConf = Cookies.get(PLAYER_EMAIL_CONFIRMED_COOKIE_NAME);
    if (name) setPlayerName(name);
    if (email) {
      setPlayerEmail(email);
      const confirmed: boolean = JSON.parse(emailConf || 'false');
      setEmailConfirmed(confirmed);
      setShowEmailConfirm(!confirmed);
    }
  }, []);

  const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      Cookies.set(PLAYER_NAME_COOKIE_NAME, tempName.trim());
      setTempName('');
    }
  };

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempEmail.trim()) {
      setPlayerEmail(tempEmail.trim());
      Cookies.set(PLAYER_EMAIL_COOKIE_NAME, tempEmail.trim());
      Cookies.set(PLAYER_EMAIL_CONFIRMED_COOKIE_NAME, 'true');
      setEmailConfirmed(true);
      setShowEmailConfirm(false);
      setTempEmail('');
    }
  };

  const handleEmailConfirm = () => {
    Cookies.set(PLAYER_EMAIL_CONFIRMED_COOKIE_NAME, 'true');
    setEmailConfirmed(true);
    setShowEmailConfirm(false);
  };

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
        <div className='space-y-4'>
          {/* Name Section */}
          {!playerName ? (
            <form onSubmit={handleNameSubmit} className='space-y-2'>
              <div>I didn&apos;t catch your name, what was it again?</div>
              <div className='flex gap-2'>
                <DashboardInput
                  type='text'
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className='bg-black border border-[#0f0] text-[#0f0] px-2 py-1'
                  placeholder='Name...'
                />
                <DashboardButton type='submit'>Here you go</DashboardButton>
              </div>
            </form>
          ) : (
            <div>
              Hey {playerName}, {encourageMessages[completedPuzzles.length]}
            </div>
          )}

          {!playerEmail ? (
            <form onSubmit={handleEmailSubmit} className='space-y-2'>
              <div>I need your email to keep you updated on any developments.</div>
              <div className='flex gap-2'>
                <DashboardInput
                  type='email'
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className='bg-black border border-[#0f0] text-[#0f0] px-2 py-1'
                  placeholder='Email...'
                />
                <DashboardButton type='submit'>Here you go</DashboardButton>
              </div>
            </form>
          ) : showEmailConfirm && !emailConfirmed ? (
            <div className='space-y-2'>
              <div>Just to check, is this your email: {playerEmail}?</div>
              <div className='flex gap-2'>
                <DashboardButton type='button' onClick={handleEmailConfirm}>
                  Yes it is
                </DashboardButton>
                <DashboardButton
                  type='button'
                  onClick={() => {
                    setPlayerEmail('');
                  }}
                >
                  No, it&apos;s not
                </DashboardButton>
              </div>
            </div>
          ) : null}

          <Buttons />
        </div>
      ) : (
        <>
          <DashboardBackButton />
          <div className='w-full h-[1px] bg-[#0f0] !mt-4 !mb-1' />
        </>
      )}

      {page === 'messages' && <Messages />}
      {page === 'fragment_1' && <FragmentOne onSuccess={handleSuccessfulFragment} />}
      {page === 'fragment_2' && <FragmentTwo onSuccess={handleSuccessfulFragment} />}
      {page === 'fragment_3' && <FragmentThree onSuccess={handleSuccessfulFragment} />}
      {page === 'protocol' && <ExecuteProtocol />}
      <CRTFirework isVisible={showFirework} onAnimationComplete={() => setShowFirework(false)} />
    </>
  );
};

export default Dashboard;
