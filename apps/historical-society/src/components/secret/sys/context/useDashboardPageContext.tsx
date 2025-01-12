'use client';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { TPage } from '../Dashboard';

const COOKIE_NAME = 'whhs-dashboard-page-context';

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
    Cookies.set(COOKIE_NAME, JSON.stringify(state), { expires: 7 });
  }, [completedPuzzles, page]);

  useEffect(() => {
    const cookie = Cookies.get(COOKIE_NAME);

    if (cookie) {
      const state = JSON.parse(cookie);
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
