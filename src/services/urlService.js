const urlStorage = new Map();

export const add = (code, payload) => {
  urlStorage.set(code, payload);
};

export const get = (code) => {
  return urlStorage.get(code);
};

export const updateVisits = (code) => {
  const prevValue = get(code);

  urlStorage.set(code, { ...prevValue, visits: prevValue.visits + 1 });
};
