const userStorage = new Map();

export default class UserRepository {
  _loggedUser = null;

  save(user) {
    userStorage.set(user.userId, user);
  }

  getUserByName(name) {
    for (let user of userStorage.values()) {
      if (user.name === name) {
        return user;
      }
    }

    return null;
  }

  getAll() {
    return userStorage.values();
  }

  set loggedUser(user) {
    this._loggedUser = user;
  }

  get loggedUser() {
    return this._loggedUser;
  }
}
