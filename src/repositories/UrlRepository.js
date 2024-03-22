import { postgresClient } from '../stores/postgres.js';

export default class UrlRepository {
  async save(url) {
    await postgresClient.query(
      'insert into urls (name, url, "user", code) values ($1, $2, $3, $4)',
      [url.name, url.url, url.user, url.code],
    );
  }

  async get(code) {
    const data = await postgresClient.query(
      'select * from urls where code = $1',
      [code],
    );

    return data.rows[0];
  }

  async getAll() {
    const data = await postgresClient.query('select * from urls');

    return data.rows;
  }

  async getUrlsByUser(user) {
    const data = await postgresClient.query(
      'select * from urls where "user" = $1',
      [user],
    );

    return data.rows;
  }

  async updateVisits(code) {
    await postgresClient.query(
      'update urls set visits = visits + 1 where code = $1',
      [code],
    );
  }
}
