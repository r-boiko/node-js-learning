import { EventEmitter } from 'node:events';
import config from './config/config.js';
import { SCORE_LEVEL, LEVEL, EVENT_TYPES } from './constants.js';
import * as appenderStrategy from './appenders/appenderStrategy.js';
import * as formatterStrategy from './formatters/formatterStrategy.js';

const logger = (category) => ({
  info: (...message) => {
    executeLog(LEVEL.INFO, category, message);
  },
  warn: (...message) => {
    executeLog(LEVEL.WARN, category, message);
  },
  error: (...message) => {
    executeLog(LEVEL.ERROR, category, message);
  },
  debug: (...message) => {
    executeLog(LEVEL.DEBUG, category, message);
  },
  trace: (...message) => {
    executeLog(LEVEL.TRACE, category, message);
  },
});

const ee = new EventEmitter();
const appenders = appenderStrategy.getAppenders();
const formatter = formatterStrategy.getFormatter();

const executeLog = (level, category, message) => {
  if (SCORE_LEVEL[level] <= config.scoreLevel) {
    for (const appender of appenders) appender.log({ ee });

    ee.emit(EVENT_TYPES.LOG, {
      data: {
        date: Date.now(),
        level,
        category,
        message,
      },
      formatter,
    });
  }
};

export default {
  getLogger: (category) => logger(category),
};
