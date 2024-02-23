import fs from 'fs';
import { LEVEL, SCORE_LEVEL, APPENDER } from './constants.js';

const defaultConfig = {
  logLevel: LEVEL.INFO,
  scoreLevel: SCORE_LEVEL[LEVEL.INFO],
  appender: APPENDER.CONSOLE,
};

const getConfigFile = () => {
  const logConfigFilePath = process.env.LOG_CONFIG_FILE;

  if (!logConfigFilePath) return {};

  try {
    const file = fs.readFileSync(logConfigFilePath, 'utf-8');
    return JSON.parse(file);
  } catch (e) {
    console.error('Error! Cannot read file. Used default configuration');
    return {};
  }
};

const enrichConfig = (config) => {
  config.scoreLevel = SCORE_LEVEL[config.logLevel];
};

const initConfig = () => {
  const config = Object.assign(defaultConfig, getConfigFile());

  const logLevel = process.env.LOG_LEVEL?.toUpperCase();
  const appender = process.env.LOG_APPENDER?.toUpperCase();

  if (logLevel && LEVEL[logLevel]) {
    config.logLevel = logLevel;
  }

  if (appender && APPENDER[appender]) {
    config.appender = appender;
  }

  enrichConfig(config);

  return config;
};

const config = initConfig();

export default config;
