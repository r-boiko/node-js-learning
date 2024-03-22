import UserRepository from '../repositories/UserRepository.js';
import UserModel from '../models/UserModel.js';
import Instance from '../helpers/Instance.js';

export default class UserService extends Instance {
  constructor() {
    super();

    this.userRepository = new UserRepository();
  }

  async create(name, password) {
    const newUser = new UserModel(name, password);

    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUsersPublicData() {
    const users = await this.userRepository.getAll();
    const result = [];

    for (const user of users) {
      result.push({
        id: user.user_id,
        name: user.name,
      });
    }

    return result;
  }

  async getUsersAuthData() {
    const users = await this.userRepository.getAll();

    const result = [];

    for (const user of users) {
      result.push({ [user.name]: user.password });
    }

    return result;
  }

  async getUserByName(name) {
    return await this.userRepository.getUserByName(name);
  }

  async isEmpty() {
    const users = await this.userRepository.getAll();

    return Array.from(users).length === 0;
  }

  async checkPassword(name, password) {
    if (!name || !password) return false;

    const user = await this.userRepository.getUserByName(name);

    return user?.password === password;
  }

  async isAlreadyExists(name) {
    if (!name) return false;

    const user = await this.userRepository.getUserByName(name);

    return !!user;
  }
}
