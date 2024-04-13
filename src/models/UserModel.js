import { generateHash } from '../utils.js';

export default class UserModel {
  user_id = generateHash();
  name;
  password;
  email;
  created_time = new Date().toISOString();

  constructor(name, password, email) {
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
