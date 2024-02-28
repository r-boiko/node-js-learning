import fs from 'fs';
import { LEVEL, SCORE_LEVEL, APPENDER, FORMATTER } from './constants.js';

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

const validateEnvProperties = ({ properties, config }) => {
  for (const { key, value, constant } of properties) {
    if (value && constant[value]) {
      config[key] = value;
    }
  }
};

const initConfig = () => {
  const config = Object.assign(defaultConfig, getConfigFile());

  const logLevel = process.env.LOG_LEVEL?.toUpperCase();
  const appender = process.env.LOG_APPENDER?.toUpperCase();
  const formatter = process.env.LOG_FORMATTER?.toUpperCase();

  validateEnvProperties({
    properties: [
      { key: 'logLevel', value: logLevel, constant: LEVEL },
      { key: 'appender', value: appender, constant: APPENDER },
      { key: 'formatter', value: formatter, constant: FORMATTER },
    ],
    config,
  });

  enrichConfig(config);

  return config;
};

const config = initConfig();

export default config;
