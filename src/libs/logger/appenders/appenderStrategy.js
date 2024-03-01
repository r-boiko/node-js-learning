import { APPENDER } from '../constants.js';
import config from '../config/config.js';
import consoleAppender from './console.js';
import fileAppender from './file.js';

const appenders = {
  [APPENDER.CONSOLE]: consoleAppender,
  [APPENDER.FILE]: fileAppender,
};

const getAppenders = () => {
  return config.appender.split(',').map((appender) => {
    if (!appenders[appender]) return consoleAppender;

    return appenders[appender];
  });
};

export { getAppenders };
