import UrlRepository from '../repositories/UrlRepository.js';
import UrlModel from '../models/UrlModel.js';
import Instance from '../helpers/Instance.js';

export default class UrlService extends Instance {
  constructor() {
    super();

    this.urlRepository = new UrlRepository();
  }

  async create(url) {
    const newUrl = new UrlModel(url);

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

  async updateUrl(data) {
    return await this.urlRepository.updateUrl(data);
  }
}
