export const formatMessage = (date, level, category, message, indent = '') => {
  return `date: ${date}, category: ${category}, level: ${level}, message: ${JSON.stringify(message)}${indent}`;
};
