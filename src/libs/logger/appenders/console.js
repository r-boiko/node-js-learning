const log = (date, level, category, message) => {
  console.log(formatMessage(date, level, category, message));
};

const formatMessage = (date, level, category, message) => {
  return `date: ${date}, category: ${category}, level: ${level}, message: ${JSON.stringify(message)}`;
};

export default { log };
