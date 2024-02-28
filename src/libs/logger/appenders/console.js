const log = ({ data, formatter }) => {
  console.log(formatter.formatMessage(data));
};

export default { log };
