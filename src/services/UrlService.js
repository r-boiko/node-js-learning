import UrlRepository from '../repositories/UrlRepository.js';
import UrlModel from '../models/UrlModel.js';
import Instance from '../helpers/Instance.js';

export default class UrlService extends Instance {
  constructor() {
    super();

    this.urlRepository = new UrlRepository();
  }

  async create(name, url, user) {
    const newUrl = new UrlModel(name, url, user);

    await this.urlRepository.save(newUrl);

    return newUrl;
  }

  async getUrlByCode(code) {
    return await this.urlRepository.get(code);
  }

  async getUrlsByUser(user) {
    if (!user) return [];

    return await this.urlRepository.getUrlsByUser(user);
  }

  async updateVisitsByCode(code) {
    return await this.urlRepository.updateVisits(code);
  }
}
