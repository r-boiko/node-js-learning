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

    const createdUrl = await this.urlRepository.save(newUrl);

    return this.validateUrls([createdUrl])[0];
  }

  async deleteUrlById(id) {
    return await this.urlRepository.deleteUrlById(id);
  }

  async getUrlByCode(code) {
    return await this.urlRepository.getByCode(code);
  }

  async getUrlById(id) {
    return await this.urlRepository.getById(id);
  }

  async getUrlsByUser(user) {
    if (!user) return [];

    const urls = await this.urlRepository.getUrlsByUser(user);

    return this.validateUrls(urls);
  }

  async updateVisitsByCode(code) {
    return await this.urlRepository.updateVisits(code);
  }

  async updateUrl(data) {
    return await this.urlRepository.updateUrl(data);
  }

  validateUrls(urls) {
    return urls.map((url) => {
      const isOneTime = url.one_time && url.visits > 0;
      const isExpiredTime = url.expired_time
        ? new Date(url.expired_time).getTime() <= new Date().getTime()
        : false;

      return {
        ...url,
        disabled: !url.enabled || isOneTime || isExpiredTime,
      };
    });
  }
}
