'use client';
import { DASHBOARD_CONTEXT_COOKIE_NAME, DEFAULT_OPTIONS } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { TPage } from '../types';

export type TPuzzles =
  | 'newspaper_archive'
  | 'emf_readings'
  | 'wikipedia_search'
  | 'document_scan' // archive pdf -> blue light -> frequency
  | 'apparitions_image'
  | 'audio_recordings';

interface DashboardPageContextType {
  page: TPage;
  setPage: Dispatch<SetStateAction<TPage>>;
  completedPuzzles: TPuzzles[];
  setCompletedPuzzles: Dispatch<SetStateAction<TPuzzles[]>>;
  finished: boolean;
  setFinished: Dispatch<SetStateAction<boolean>>;
}

const DashboardPageContext = createContext<DashboardPageContextType | undefined>(undefined);

export function DashboardPageContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [finished, setFinished] = useState(false);
  const [page, setPage] = useState<TPage>('dashboard');
  const [completedPuzzles, setCompletedPuzzles] = useState<TPuzzles[]>([]);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      completedPuzzles,
      page,
      finished,
    };
    Cookies.set(DASHBOARD_CONTEXT_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  }, [completedPuzzles, page]);

  useEffect(() => {
    const cookie = Cookies.get(DASHBOARD_CONTEXT_COOKIE_NAME);

    if (cookie) {
      const state: {
        completedPuzzles: TPuzzles[];
        page: TPage;
        finished: boolean;
      } = JSON.parse(cookie);

      setPage(state.page);
      setCompletedPuzzles(state.completedPuzzles);
      setFinished(state.finished);
    }
    setLoaded(true);
  }, []);

  return (
    <DashboardPageContext.Provider
      value={{ page, setPage, completedPuzzles, setCompletedPuzzles, finished, setFinished }}
    >
      {children}
    </DashboardPageContext.Provider>
  );
}

export function useDashboardPageContext() {
  const context = useContext(DashboardPageContext);
  if (!context) {
    throw new Error('useDashboardPageContext must be used within a DashboardPageContextProvider');
  }
  return context;
}
