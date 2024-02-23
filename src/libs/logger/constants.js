const LEVEL = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
};

const SCORE_LEVEL = {
  [LEVEL.ERROR]: 1,
  [LEVEL.WARN]: 2,
  [LEVEL.INFO]: 3,
};

const APPENDER = {
  CONSOLE: 'CONSOLE',
};

export { LEVEL, SCORE_LEVEL, APPENDER };
