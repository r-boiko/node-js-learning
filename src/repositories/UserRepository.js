import Users from '../entities/Users.js';

export default class UserRepository {
  async save(user) {
    await Users.query().insert(user);
  }

  async getUserByName(name) {
    const data = await Users.query().where('name', '=', name);

    return data[0];
  }

  async getUserByEmail(email) {
    const data = await Users.query().where('email', '=', email);

    return data[0];
  }

  async getAll() {
    const data = await Users.query().orderBy('id', 'asc');

    return data;
  }
}
