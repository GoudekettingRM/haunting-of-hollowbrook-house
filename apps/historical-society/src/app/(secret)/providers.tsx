import { DashboardPageContextProvider } from '@/components/secret/sys/context/useDashboardPageContext';
import { GeneralSysAdminContextProvider } from '@/components/secret/sys/context/useGeneralSysAdminContext';

const SystemAdminProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralSysAdminContextProvider>
      <DashboardPageContextProvider>{children}</DashboardPageContextProvider>
    </GeneralSysAdminContextProvider>
  );
};
export default SystemAdminProviders;
