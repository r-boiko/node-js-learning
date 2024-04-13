import { generateHash } from '../utils.js';

export default class UrlModel {
  code = generateHash();
  visits = 0;
  created_time = new Date().toISOString();

  constructor({ name, url, loggedUser, type, expiredTime, oneTime, enabled }) {
    this.name = name;
    this.url = url;
    this.user = loggedUser;
    this.type = type;
    this.expired_time = expiredTime
      ? new Date(expiredTime).toISOString()
      : null;
    this.oneTime = oneTime;
    this.enabled = enabled;
  }
}
