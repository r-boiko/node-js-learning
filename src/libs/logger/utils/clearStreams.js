export const clearStreams = (stream) => {
  process.on('beforeExit', () => {
    stream.push(null);
  });
  process.on('SIGINT', () => {
    stream.push(null);
  });
};
