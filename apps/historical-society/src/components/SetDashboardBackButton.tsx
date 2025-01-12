import { Dispatch, SetStateAction } from 'react';
import DashboardButton from './DashboardButton';
import { TPage } from './secret/sys/Dashboard';

const SetDashboardBackButton = ({ setPage }: { setPage: Dispatch<SetStateAction<TPage>> }) => {
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
};
export default SetDashboardBackButton;
