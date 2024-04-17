import Urls from '../entities/Urls.js';

export default class UrlRepository {
  async save(url) {
    return await Urls.query().insert(url);
  }

  async getByCode(code) {
    const data = await Urls.query().where('code', '=', code);

    return data[0];
  }

  async getById(id) {
    const data = await Urls.query().where('id', '=', id);

    return data[0];
  }

  async getAll() {
    const data = await Urls.query();

    return data;
  }

  async getUrlsByUser(user) {
    const data = await Urls.query()
      .where('user', '=', user)
      .orderBy('id', 'asc');

    return data;
  }

  async updateVisits(code) {
    await Urls.query().increment('visits', 1).where('code', '=', code);
  }

  async updateUrl(data) {
    return await Urls.query().update(data).where('id', data.id);
  }
}
