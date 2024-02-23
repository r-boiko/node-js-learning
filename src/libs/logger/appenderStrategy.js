import { APPENDER } from './constants.js';
import config from './config.js';
import consoleAppender from './appenders/console.js';

const appenders = {
  [APPENDER.CONSOLE]: consoleAppender,
};

const getAppender = () => {
  if (!appenders[config.appender]) return consoleAppender;

  return appenders[config.appender];
};

export { getAppender };
