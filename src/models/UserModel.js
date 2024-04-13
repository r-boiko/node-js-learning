import { generateHash } from '../utils.js';

export default class UserModel {
  userId = generateHash();
  name;
  password;
  email;
  created_time = Date.now();

  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
