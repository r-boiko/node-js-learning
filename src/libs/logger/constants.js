const LEVEL = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
  TRACE: 'TRACE',
};

const SCORE_LEVEL = {
  [LEVEL.ERROR]: 1,
  [LEVEL.WARN]: 2,
  [LEVEL.INFO]: 3,
  [LEVEL.DEBUG]: 4,
  [LEVEL.TRACE]: 5,
};

const APPENDER = {
  CONSOLE: 'CONSOLE',
  FILE: 'FILE',
};

export { LEVEL, SCORE_LEVEL, APPENDER };
