import { DashboardPageContextProvider } from '@/components/secret/sys/context/useDashboardPageContext';
import { GeneralSysAdminContextProvider } from '@/components/secret/sys/context/useGeneralSysAdminContext';
import { PuzzleAnswerContextProvider } from '@/components/secret/sys/context/usePuzzleAnswersContext';

const SystemAdminProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralSysAdminContextProvider>
      <DashboardPageContextProvider>
        <PuzzleAnswerContextProvider>{children}</PuzzleAnswerContextProvider>
      </DashboardPageContextProvider>
    </GeneralSysAdminContextProvider>
  );
};
export default SystemAdminProviders;
