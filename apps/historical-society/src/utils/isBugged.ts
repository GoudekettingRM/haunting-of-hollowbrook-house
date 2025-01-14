import Cookies from 'js-cookie';
import { STATUS_COOKIE_NAME } from './cookieConfig';

export const isBugged = () => {
  const state = Cookies.get(STATUS_COOKIE_NAME);

  if (state === 'bugged') {
    return true;
  }

  if (state === 'fixed') {
    return false;
  }

  Cookies.set(STATUS_COOKIE_NAME, 'bugged');
  return true;
};
