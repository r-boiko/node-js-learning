import UserRepository from '../repositories/UserRepository.js';
import UserModel from '../models/UserModel.js';
import Instance from '../helpers/Instance.js';

export default class UserService extends Instance {
  constructor() {
    super();

    this.userRepository = new UserRepository();
  }

  create(name, password) {
    const newUser = new UserModel(name, password);

    this.userRepository.save(newUser);

    return newUser;
  }

  getUsersPublicData() {
    const users = this.userRepository.getAll();

    const result = [];

    for (const user of users) {
      result.push({
        id: user.userId,
        name: user.name,
      });
    }

    return result;
  }

  getUsersAuthData() {
    const users = this.userRepository.getAll();

    const result = [];

    for (const user of users) {
      result.push({ [user.name]: user.password });
    }

    return result;
  }

  isEmpty() {
    const users = this.userRepository.getAll();

    return Array.from(users).length === 0;
  }

  getLoggedUser() {
    return this.userRepository.loggedUser;
  }

  checkPassword(name, password) {
    if (!name || !password) return false;

    const user = this.userRepository.getUserByName(name);

    return user?.password === password;
  }

  isAlreadyExists(name) {
    if (!name) return false;

    const user = this.userRepository.getUserByName(name);

    return !!user;
  }
}
