import { Transform } from 'stream';

export const formatMessage = new Transform({
  transform(
    { date, level, category, message, fileName, delimiter = '\n' },
    encoding,
    callback,
  ) {
    this.push(
      `${JSON.stringify({ date, category, fileName, level, message })}${delimiter}`,
    );

    callback();
  },
  objectMode: true,
});

export default { formatMessage };
