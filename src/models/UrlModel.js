import { generateHash } from '../utils.js';

export default class UrlModel {
  code = generateHash();
  visits = 0;
  created_time = Date.now();

  constructor(name, url, user) {
    this.name = name;
    this.url = url;
    this.user = user;
  }
}
