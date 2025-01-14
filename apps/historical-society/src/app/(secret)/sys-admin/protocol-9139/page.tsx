'use client';
import { BootSequence } from '@/components/secret/sys/BootSequence';
import { useGeneralSysAdminContext } from '@/components/secret/sys/context/useGeneralSysAdminContext';
import Dashboard from '@/components/secret/sys/Dashboard';
import { useState } from 'react';

export default function ConsolePage() {
  const [bootComplete, setBootComplete] = useState(false);
  const { setInitialBootComplete } = useGeneralSysAdminContext();

  return (
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
    </>
  );
}
