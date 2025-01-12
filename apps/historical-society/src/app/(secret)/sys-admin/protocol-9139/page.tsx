'use client';
import { BootSequence } from '@/components/secret/sys/BootSequence';
import { useGeneralSysAdminContext } from '@/components/secret/sys/context/useGeneralSysAdminContext';
import Dashboard from '@/components/secret/sys/Dashboard';

export default function ConsolePage() {
  const { initialBootComplete, setInitialBootComplete } = useGeneralSysAdminContext();

  return <>{!initialBootComplete ? <BootSequence onComplete={() => setInitialBootComplete(true)} /> : <Dashboard />}</>;
}
