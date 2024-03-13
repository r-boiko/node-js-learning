import { generateHash } from '../utils.js';

export default class UserModel {
  userId = generateHash();
  name;
  password;
  created_time = Date.now();

  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}
