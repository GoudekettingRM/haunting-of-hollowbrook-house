import InitialMessages from '../InitialMessages';
import { useGeneralSysAdminContext } from '../context/useGeneralSysAdminContext';

function Messages() {
  const { initialAccessComplete } = useGeneralSysAdminContext();
  return (
    <>
      <InitialMessages completed={initialAccessComplete} />
    </>
  );
}
export default Messages;
