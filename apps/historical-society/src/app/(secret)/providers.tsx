import { DashboardPageContextProvider } from '@/components/secret/sys/context/useDashboardPageContext';
import { FragmentsContextProvider } from '@/components/secret/sys/context/useFragmentsContext';
import { GeneralSysAdminContextProvider } from '@/components/secret/sys/context/useGeneralSysAdminContext';
import { PuzzleAnswerContextProvider } from '@/components/secret/sys/context/usePuzzleAnswersContext';

const SystemAdminProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GeneralSysAdminContextProvider>
      <DashboardPageContextProvider>
        <PuzzleAnswerContextProvider>
          <FragmentsContextProvider>{children}</FragmentsContextProvider>
        </PuzzleAnswerContextProvider>
      </DashboardPageContextProvider>
    </GeneralSysAdminContextProvider>
  );
};
export default SystemAdminProviders;
