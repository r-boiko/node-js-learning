const userStorage = new Map();

export default class UserRepository {
  _loggedUser = null;

  save(user) {
    userStorage.set(user.userId, user);
    this.loggedUser = user.userId;
  }

  get(userId) {
    return userStorage.get(userId);
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
