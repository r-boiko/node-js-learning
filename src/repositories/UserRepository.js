import { postgresClient } from '../stores/postgres.js';

export default class UserRepository {
  async save(user) {
    await postgresClient.query(
      'insert into users (user_id, name, password) values ($1, $2, $3)',
      [user.userId, user.name, user.password],
    );
  }

  async getUserByName(name) {
    const data = await postgresClient.query(
      'select * from users where name=$1',
      [name],
    );

    return data.rows[0];
  }

  async getAll() {
    const data = await postgresClient.query('select * from users');

    return data.rows;
  }
}
