'use client';
import { sendCompleteEmail } from '@/actions/sendCompleteEmail';
import { BootSequence } from '@/components/secret/sys/BootSequence';
import { useDashboardPageContext } from '@/components/secret/sys/context/useDashboardPageContext';
import { useGeneralSysAdminContext } from '@/components/secret/sys/context/useGeneralSysAdminContext';
import Dashboard from '@/components/secret/sys/Dashboard';
import PixelBreakdown from '@/components/secret/sys/PixelBreakdown';
import { PLAYER_EMAIL_COOKIE_NAME, PLAYER_NAME_COOKIE_NAME, STATUS_COOKIE_NAME } from '@/utils/cookieConfig';
import { isBugged } from '@/utils/isBugged';
import Cookies from 'js-cookie';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConsolePage() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuggedState, setIsBuggedState] = useState(true);
  const { setInitialBootComplete } = useGeneralSysAdminContext();
  const { finished } = useDashboardPageContext();

  const onFinish = async () => {
    const name = Cookies.get(PLAYER_NAME_COOKIE_NAME) || '';
    const email = Cookies.get(PLAYER_EMAIL_COOKIE_NAME) || '';

    await sendCompleteEmail(email, name);
    Cookies.set(STATUS_COOKIE_NAME, 'fixed');
    window.location.reload();
  };

  useEffect(() => {
    setIsBuggedState(isBugged());
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isBuggedState) {
    return notFound();
  }

  return (
    <div className='min-h-screen bg-black p-6'>
      <div className='mx-auto max-w-4xl'>
        <div className='relative mt-10 border border-[#0f0] p-6'>
          <div className='absolute -top-4 left-6 border border-[#0f0] bg-black px-4 text-[#0f0]'>
            SYSTEM ACCESS TERMINAL
          </div>
          <div className='h-full w-full max-h-[80dvh] overflow-y-auto'>
            <div className='space-y-2 font-mono text-[#0f0] p-2'>
              <>
                {!bootComplete ? (
                  <BootSequence
                    onComplete={() => {
                      setInitialBootComplete(true);
                      setBootComplete(true);
                    }}
                  />
                ) : (
                  <Dashboard />
                )}
                {finished && <PixelBreakdown onFinishAnimation={onFinish} />}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
