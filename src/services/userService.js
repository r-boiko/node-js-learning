const userStorage = new Map();

export let loggedUser = null;

export const create = (id, payload) => {
  userStorage.set(id, payload);
  loggedUser = id;
};

export const getAll = () => {
  return userStorage.values();
};

export const isEmpty = () => {
  return userStorage.size === 0;
};
