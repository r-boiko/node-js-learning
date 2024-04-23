import { generateHash } from '../utils.js';

export default class UrlModel {
  visits = 0;
  created_time = new Date().toISOString();

  constructor({
    name,
    url,
    code,
    loggedUser,
    type,
    expiredTime,
    oneTime,
    enabled,
  }) {
    this.name = name;
    this.url = url;
    this.user = loggedUser;
    this.type = type;
    this.expired_time = expiredTime
      ? new Date(expiredTime).toISOString()
      : null;
    this.one_time = oneTime;
    this.enabled = enabled;
    this.code = code || generateHash();
  }
}
