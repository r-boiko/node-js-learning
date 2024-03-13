const userStorage = new Map();

export default class UserRepository {
  loggedUser = null;

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
}
