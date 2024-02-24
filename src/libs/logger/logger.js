import config from './config.js';
import { SCORE_LEVEL, LEVEL } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';

const logger = (category) => ({
  info: (message) => {
    executeLog(LEVEL.INFO, category, message);
  },
  warn: (message) => {
    executeLog(LEVEL.WARN, category, message);
  },
  error: (message) => {
    executeLog(LEVEL.ERROR, category, message);
  },
  debug: (message) => {
    executeLog(LEVEL.DEBUG, category, message);
  },
  trace: (message) => {
    executeLog(LEVEL.TRACE, category, message);
  },
});

const appender = appenderStrategy.getAppender();

const executeLog = (level, category, message) => {
  if (SCORE_LEVEL[level] <= config.scoreLevel) {
    appender.log(Date.now(), level, category, message);
  }
};

export default {
  getLogger: (category) => logger(category),
};
