'use client';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type ScanContextType = {
  documentUrl: string;
  setDocumentUrl: Dispatch<SetStateAction<string>>;
};

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export function ScanProvider({ children }: { children: React.ReactNode }) {
  const [documentUrl, setDocumentUrl] = useState('');

  return <ScanContext.Provider value={{ documentUrl, setDocumentUrl }}>{children}</ScanContext.Provider>;
}

export function useScanContext() {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScanContext must be used within a ScanProvider');
  }
  return context;
}
