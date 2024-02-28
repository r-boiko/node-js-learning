export const formatMessage = ({
  date,
  level,
  category,
  message,
  delimiter = '\n',
}) => {
  return `${JSON.stringify({ date, category, level, message })}${delimiter}`;
};

export default { formatMessage };
