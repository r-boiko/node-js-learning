export const validateEnvProperty = ({ property, constant }) => {
  return property && constant[property];
};

export const validateEnvProperties = ({ properties, constant }) => {
  if (!properties) return;

  return properties.split(',').every((property) => constant[property]);
};
