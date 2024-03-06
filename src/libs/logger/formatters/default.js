import { Transform } from 'stream';

export const formatMessage = new Transform({
  transform(
    { date, level, category, message, fileName, delimiter = '\n' },
    encoding,
    callback,
  ) {
    this.push(
      `date: ${date}, category: ${category}, fileName: ${fileName}, level: ${level}, message: ${JSON.stringify(message)}${delimiter}`,
    );

    callback();
  },
  objectMode: true,
});

export default { formatMessage };
