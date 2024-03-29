import { Model } from 'objection';

export default class Urls extends Model {
  static get tableName() {
    return 'urls';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'url', 'user', 'code'],

      properties: {
        code: { type: 'string' },
        visits: { type: 'integer' },
        name: { type: 'string' },
        url: { type: 'string' },
        user: { type: 'string' },
        created_time: { type: 'string', format: 'date-time' },
      },
    };
  }
}
