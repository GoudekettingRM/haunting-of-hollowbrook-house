import Cookies from 'js-cookie';

const COOKIE_NAME = 'whhs-bugged-state';

export const isBugged = () => {
  const state = Cookies.get(COOKIE_NAME);

  if (state === 'bugged') {
    return true;
  }

  if (state === 'fixed') {
    return false;
  }

  Cookies.set(COOKIE_NAME, 'bugged');
  return true;
};
