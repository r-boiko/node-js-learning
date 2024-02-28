import { FORMATTER } from '../constants.js';
import config from '../config.js';
import defaultFormatter from './default.js';
import jsonFormatter from './json.js';

const formatters = {
  [FORMATTER.DEFAULT]: defaultFormatter,
  [FORMATTER.JSON]: jsonFormatter,
};

const getFormatter = () => {
  if (!formatters[config.formatter]) return defaultFormatter;

  return formatters[config.formatter];
};

export { getFormatter };
