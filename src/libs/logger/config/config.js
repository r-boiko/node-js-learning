import fs from 'fs';
import { LEVEL, SCORE_LEVEL, APPENDER, FORMATTER } from '../constants.js';
import { validateEnvProperties, validateEnvProperty } from './validator.js';

const defaultConfig = {
  logLevel: LEVEL.INFO,
  scoreLevel: SCORE_LEVEL[LEVEL.INFO],
  appender: APPENDER.CONSOLE,
  formatter: FORMATTER.DEFAULT,
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
  const formatter = process.env.LOG_FORMATTER?.toUpperCase();

  if (validateEnvProperty({ property: logLevel, constant: LEVEL })) {
    config.logLevel = logLevel;
  }

  if (validateEnvProperties({ properties: appender, constant: APPENDER })) {
    config.appender = appender;
  }

  if (validateEnvProperty({ property: formatter, constant: FORMATTER })) {
    config.formatter = formatter;
  }

  enrichConfig(config);

  return config;
};

const config = initConfig();

export default config;
