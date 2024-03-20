import UrlRepository from '../repositories/UrlRepository.js';
import UrlModel from '../models/UrlModel.js';
import Instance from '../helpers/Instance.js';

export default class UrlService extends Instance {
  constructor() {
    super();

    this.urlRepository = new UrlRepository();
  }

  create(name, url, user) {
    const newUrl = new UrlModel(name, url, user);

    this.urlRepository.save(newUrl);

    return newUrl;
  }

  getUrlByCode(code) {
    return this.urlRepository.get(code);
  }

  getUrlsByUser(user) {
    if (!user) return [];

    return this.urlRepository.getUrlsByKey('user', user);
  }

  updateVisitsByCode(code) {
    return this.urlRepository.updateVisits(code);
  }
}
