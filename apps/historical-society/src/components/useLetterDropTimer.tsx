'use client';
import { useEffect, useState } from 'react';

export const useLetterDropTimer = (baseDelay: number) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setEnabled(true);
      },
      baseDelay + Math.random() * 5000,
    );

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return enabled;
};
