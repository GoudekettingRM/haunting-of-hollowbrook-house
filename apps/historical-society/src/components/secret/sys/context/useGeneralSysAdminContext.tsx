'use client';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

const COOKIE_NAME = 'whhs-general-sys-admin-context';

interface GeneralSysAdminContextType {
  initialAccessComplete: boolean;
  setInitialAccessComplete: Dispatch<SetStateAction<boolean>>;
  initialBootComplete: boolean;
  setInitialBootComplete: Dispatch<SetStateAction<boolean>>;
}

const GeneralSysAdminContext = createContext<GeneralSysAdminContextType | undefined>(undefined);

export function GeneralSysAdminContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [initialAccessComplete, setInitialAccessComplete] = useState(false);
  const [initialBootComplete, setInitialBootComplete] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      initialAccessComplete,
      initialBootComplete,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(state), { expires: 7 });
  }, [initialAccessComplete, initialBootComplete]);

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME);

    if (cookie) {
      const state = JSON.parse(cookie);
      setInitialAccessComplete(state.initialAccessComplete);
      setInitialBootComplete(state.initialBootComplete);
    }
    setLoaded(true);
  }, []);

  return (
    <GeneralSysAdminContext.Provider
      value={{ initialAccessComplete, setInitialAccessComplete, initialBootComplete, setInitialBootComplete }}
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
