import DashboardButton from './DashboardButton';
import { useDashboardPageContext } from './secret/sys/context/useDashboardPageContext';

function DashboardBackButton() {
  const { setPage } = useDashboardPageContext();

  return (
    <DashboardButton
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setPage('dashboard');
        }
      }}
      onClick={() => setPage('dashboard')}
    >
      ‹ Back
    </DashboardButton>
  );
}
export default DashboardBackButton;
