'use client';
import { DASHBOARD_CONTEXT_COOKIE_NAME, DEFAULT_OPTIONS } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { TPage } from '../types';

export type TPuzzles =
  | 'newspaper_archive'
  | 'document_scan' // archive pdf -> blue light -> frequency
  | 'apparitions_image'
  | 'apparitions_article_images' // EMF readings -> frequency
  | 'audio-recordings';

interface DashboardPageContextType {
  page: TPage;
  setPage: Dispatch<SetStateAction<TPage>>;
  completedPuzzles: TPuzzles[];
  setCompletedPuzzles: Dispatch<SetStateAction<TPuzzles[]>>;
}

const DashboardPageContext = createContext<DashboardPageContextType | undefined>(undefined);

export function DashboardPageContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<TPage>('dashboard');
  const [completedPuzzles, setCompletedPuzzles] = useState<TPuzzles[]>([]);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      completedPuzzles,
      page,
    };
    Cookies.set(DASHBOARD_CONTEXT_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  }, [completedPuzzles, page]);

  useEffect(() => {
    const cookie = Cookies.get(DASHBOARD_CONTEXT_COOKIE_NAME);

    if (cookie) {
      const state: {
        completedPuzzles: TPuzzles[];
        page: TPage;
      } = JSON.parse(cookie);

      setPage(state.page);
      setCompletedPuzzles(state.completedPuzzles);
    }
    setLoaded(true);
  }, []);

  return (
    <DashboardPageContext.Provider value={{ page, setPage, completedPuzzles, setCompletedPuzzles }}>
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
