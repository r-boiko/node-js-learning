const urlStorage = new Map();

export const add = (code, payload) => {
  urlStorage.set(code, payload);
};

export const get = (code) => {
  return urlStorage.get(code);
};
