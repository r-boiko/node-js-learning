export const formatMessage = ({
  date,
  level,
  category,
  message,
  delimiter = '\n',
}) => {
  return `date: ${date}, category: ${category}, level: ${level}, message: ${JSON.stringify(message)}${delimiter}`;
};

export default { formatMessage };
