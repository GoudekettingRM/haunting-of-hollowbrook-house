import Cookies from 'js-cookie';

export const isBugged = () => {
  const state = Cookies.get('whhs_state');

  if (state === 'bugged') {
    return true;
  }

  if (state === 'fixed') {
    return false;
  }

  Cookies.set('whhs_state', 'bugged');
  return true;
};
