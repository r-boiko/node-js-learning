import { APPENDER } from '../constants.js';
import config from '../config.js';
import consoleAppender from './console.js';
import fileAppender from './file.js';

const appenders = {
  [APPENDER.CONSOLE]: consoleAppender,
  [APPENDER.FILE]: fileAppender,
};

const getAppender = () => {
  if (!appenders[config.appender]) return consoleAppender;

  return appenders[config.appender];
};

export { getAppender };
