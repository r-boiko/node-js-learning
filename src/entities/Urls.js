import { Model } from 'objection';

export default class Urls extends Model {
  static get tableName() {
    return 'urls';
  }
}
