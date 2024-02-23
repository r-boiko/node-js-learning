import { LEVEL, SCORE_LEVEL, APPENDER } from './constants.js';

const defaultConfig = {
  logLevel: LEVEL.INFO,
  scoreLevel: SCORE_LEVEL[LEVEL.INFO],
  appender: APPENDER.CONSOLE,
};

const enrichConfig = (config) => {
  config.scoreLevel = SCORE_LEVEL[config.logLevel];
};

const initConfig = () => {
  const config = defaultConfig;

  const logLevel = process.env.LOG_LEVEL?.toUpperCase();
  const appender = process.env.LOG_APPENDER?.toUpperCase();

  if (logLevel) {
    //TODO check for ifExist
    config.logLevel = logLevel;
  }

  if (appender) {
    //TODO check for ifExist
    config.appender = appender;
  }

  enrichConfig(config);

  return config;
};

const config = initConfig();

export default config;
