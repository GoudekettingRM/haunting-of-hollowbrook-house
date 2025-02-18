import Cookies from 'js-cookie';

const PREFIX = 'whhs';

export const PLAYER_NAME_COOKIE_NAME = `${PREFIX}.player.name`;
export const PLAYER_EMAIL_COOKIE_NAME = `${PREFIX}.player.email`;
export const PLAYER_EMAIL_CONFIRMED_COOKIE_NAME = `${PREFIX}.player.emailConfirmed`;
export const STATUS_COOKIE_NAME = `${PREFIX}.status`;
export const CHAT_STATE_COOKIE_NAME = `${PREFIX}.chat.state`;
export const DASHBOARD_CONTEXT_COOKIE_NAME = `${PREFIX}.context.dashboard`;
export const FRAGMENTS_CONTEXT_COOKIE_NAME = `${PREFIX}.context.fragments`;
export const GENERAL_SYS_ADMIN_CONTEXT_COOKIE_NAME = `${PREFIX}.context.sysAdmin`;
export const PUZZLE_ANSWERS_CONTEXT_COOKIE_NAME = `${PREFIX}.context.puzzleAnswers`;

export const DEFAULT_EXPIRATION = 7;

export const DEFAULT_OPTIONS: typeof Cookies.attributes = {
  expires: DEFAULT_EXPIRATION,
};
