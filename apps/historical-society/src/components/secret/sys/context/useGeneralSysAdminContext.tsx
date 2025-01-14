'use client';
import { DEFAULT_OPTIONS, GENERAL_SYS_ADMIN_CONTEXT_COOKIE_NAME } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface GeneralSysAdminContextType {
  initialAccessComplete: boolean;
  setInitialAccessComplete: Dispatch<SetStateAction<boolean>>;
  initialBootComplete: boolean;
  setInitialBootComplete: Dispatch<SetStateAction<boolean>>;
  initialTypingAnimationCompleted: boolean;
  setInitialTypingAnimationCompleted: Dispatch<SetStateAction<boolean>>;
}

const GeneralSysAdminContext = createContext<GeneralSysAdminContextType | undefined>(undefined);

export function GeneralSysAdminContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [initialAccessComplete, setInitialAccessComplete] = useState(false);
  const [initialBootComplete, setInitialBootComplete] = useState(false);
  const [initialTypingAnimationCompleted, setInitialTypingAnimationCompleted] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      initialAccessComplete,
      initialBootComplete,
      initialTypingAnimationCompleted,
    };
    Cookies.set(GENERAL_SYS_ADMIN_CONTEXT_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  }, [initialAccessComplete, initialBootComplete, initialTypingAnimationCompleted]);

  useEffect(() => {
    const cookie = Cookies.get(GENERAL_SYS_ADMIN_CONTEXT_COOKIE_NAME);

    if (cookie) {
      const state: {
        initialAccessComplete: boolean;
        initialBootComplete: boolean;
        initialTypingAnimationCompleted: boolean;
      } = JSON.parse(cookie);
      setInitialAccessComplete(state.initialAccessComplete);
      setInitialBootComplete(state.initialBootComplete);
      setInitialTypingAnimationCompleted(state.initialTypingAnimationCompleted);
    }
    setLoaded(true);
  }, []);

  return (
    <GeneralSysAdminContext.Provider
      value={{
        initialAccessComplete,
        setInitialAccessComplete,
        initialBootComplete,
        setInitialBootComplete,
        initialTypingAnimationCompleted,
        setInitialTypingAnimationCompleted,
      }}
    >
      {children}
    </GeneralSysAdminContext.Provider>
  );
}

export function useGeneralSysAdminContext() {
  const context = useContext(GeneralSysAdminContext);
  if (!context) {
    throw new Error('useGeneralSysAdminContext must be used within a GeneralSysAdminContextProvider');
  }
  return context;
}
