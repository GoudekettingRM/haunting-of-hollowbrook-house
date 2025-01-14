'use client';
import { DEFAULT_OPTIONS, FRAGMENTS_CONTEXT_COOKIE_NAME } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface FragmentsContextType {
  accessedFragmentOneOnce: boolean;
  setAccessedFragmentOneOnce: Dispatch<SetStateAction<boolean>>;
  fragmentOneNextHintNumber: number;
  setFragmentOneNextHintNumber: Dispatch<SetStateAction<number>>;
  accessedFragmentTwoOnce: boolean;
  setAccessedFragmentTwoOnce: Dispatch<SetStateAction<boolean>>;
  fragmentTwoNextHintNumber: number;
  setFragmentTwoNextHintNumber: Dispatch<SetStateAction<number>>;
  accessedFragmentThreeOnce: boolean;
  setAccessedFragmentThreeOnce: Dispatch<SetStateAction<boolean>>;
  fragmentThreeNextHintNumber: number;
  setFragmentThreeNextHintNumber: Dispatch<SetStateAction<number>>;
  accessedFragmentFourOnce: boolean;
  setAccessedFragmentFourOnce: Dispatch<SetStateAction<boolean>>;
  fragmentFourNextHintNumber: number;
  setFragmentFourNextHintNumber: Dispatch<SetStateAction<number>>;
}

const FragmentsContext = createContext<FragmentsContextType | undefined>(undefined);

export function FragmentsContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [accessedFragmentOneOnce, setAccessedFragmentOneOnce] = useState<boolean>(false);
  const [fragmentOneNextHintNumber, setFragmentOneNextHintNumber] = useState<number>(1);
  const [accessedFragmentTwoOnce, setAccessedFragmentTwoOnce] = useState<boolean>(false);
  const [fragmentTwoNextHintNumber, setFragmentTwoNextHintNumber] = useState<number>(1);
  const [accessedFragmentThreeOnce, setAccessedFragmentThreeOnce] = useState<boolean>(false);
  const [fragmentThreeNextHintNumber, setFragmentThreeNextHintNumber] = useState<number>(1);
  const [accessedFragmentFourOnce, setAccessedFragmentFourOnce] = useState<boolean>(false);
  const [fragmentFourNextHintNumber, setFragmentFourNextHintNumber] = useState<number>(1);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      accessedFragmentOneOnce,
      fragmentOneNextHintNumber,
      accessedFragmentTwoOnce,
      fragmentTwoNextHintNumber,
      accessedFragmentThreeOnce,
      fragmentThreeNextHintNumber,
      accessedFragmentFourOnce,
      fragmentFourNextHintNumber,
    };
    Cookies.set(FRAGMENTS_CONTEXT_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  }, [
    accessedFragmentOneOnce,
    fragmentOneNextHintNumber,
    accessedFragmentTwoOnce,
    fragmentTwoNextHintNumber,
    accessedFragmentThreeOnce,
    fragmentThreeNextHintNumber,
    accessedFragmentFourOnce,
    fragmentFourNextHintNumber,
  ]);

  useEffect(() => {
    const cookie = Cookies.get(FRAGMENTS_CONTEXT_COOKIE_NAME);

    if (cookie) {
      const state: {
        accessedFragmentOneOnce: boolean;
        fragmentOneNextHintNumber: number;
        accessedFragmentTwoOnce: boolean;
        fragmentTwoNextHintNumber: number;
        accessedFragmentThreeOnce: boolean;
        fragmentThreeNextHintNumber: number;
        accessedFragmentFourOnce: boolean;
        fragmentFourNextHintNumber: number;
      } = JSON.parse(cookie);
      setAccessedFragmentOneOnce(state.accessedFragmentOneOnce);
      setAccessedFragmentTwoOnce(state.accessedFragmentTwoOnce);
      setAccessedFragmentThreeOnce(state.accessedFragmentThreeOnce);
      setAccessedFragmentFourOnce(state.accessedFragmentFourOnce);
      setFragmentOneNextHintNumber(state.fragmentOneNextHintNumber);
      setFragmentTwoNextHintNumber(state.fragmentTwoNextHintNumber);
      setFragmentThreeNextHintNumber(state.fragmentThreeNextHintNumber);
      setFragmentFourNextHintNumber(state.fragmentFourNextHintNumber);
    }
    setLoaded(true);
  }, []);

  return (
    <FragmentsContext.Provider
      value={{
        accessedFragmentOneOnce,
        setAccessedFragmentOneOnce,
        fragmentOneNextHintNumber,
        setFragmentOneNextHintNumber,
        accessedFragmentTwoOnce,
        setAccessedFragmentTwoOnce,
        fragmentTwoNextHintNumber,
        setFragmentTwoNextHintNumber,
        accessedFragmentThreeOnce,
        setAccessedFragmentThreeOnce,
        fragmentThreeNextHintNumber,
        setFragmentThreeNextHintNumber,
        accessedFragmentFourOnce,
        setAccessedFragmentFourOnce,
        fragmentFourNextHintNumber,
        setFragmentFourNextHintNumber,
      }}
    >
      {children}
    </FragmentsContext.Provider>
  );
}

export function useFragmentsContext() {
  const context = useContext(FragmentsContext);
  if (!context) {
    throw new Error('useFragmentsContext must be used within a FragmentsContextProvider');
  }
  return context;
}
