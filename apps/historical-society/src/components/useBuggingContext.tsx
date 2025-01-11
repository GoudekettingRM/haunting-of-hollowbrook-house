'use client';
import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react';
import { isBugged } from '@/utils/isBugged';

export type FollowingItem =
  | 'title'
  | 'edgar'
  | 'margaret'
  | 'copyright'
  | 'hollowbrook'
  | 'stuck'
  | 'help'
  | 'read more';

interface BuggingContextType {
  followingItem: FollowingItem;
  setFollowingItem: Dispatch<SetStateAction<FollowingItem>>;
  isBugged: boolean;
}

const BuggingContext = createContext<BuggingContextType | undefined>(undefined);

export function BuggingProvider({ children }: { children: React.ReactNode }) {
  const bugged = isBugged();
  const [followingItem, setFollowingItem] = useState<FollowingItem>('title');

  return (
    <BuggingContext.Provider value={{ isBugged: bugged, followingItem, setFollowingItem }}>
      {children}
    </BuggingContext.Provider>
  );
}

export function useBuggingContext() {
  const context = useContext(BuggingContext);
  if (!context) {
    throw new Error('useBuggingContext must be used within a BuggingProvider');
  }
  return context;
}
