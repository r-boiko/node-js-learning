export const generateFilePath = ({ fileName, fileFormat = 'txt' }) => {
  return `./logs/${fileName}.${fileFormat}`;
};
