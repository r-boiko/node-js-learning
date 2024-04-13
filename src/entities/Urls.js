import { Model } from 'objection';

export default class Urls extends Model {
  static get tableName() {
    return 'urls';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'url', 'user', 'code', 'type', 'oneTime', 'enabled'],

      properties: {
        code: { type: 'string' },
        visits: { type: 'integer' },
        name: { type: 'string' },
        url: { type: 'string' },
        user: { type: 'string' },
        type: { type: 'string' },
        oneTime: { type: 'boolean' },
        enabled: { type: 'boolean' },
        created_time: { type: 'string', format: 'date-time' },
        expired_time: { type: ['string', 'null'], format: 'date-time' },
      },
    };
  }
}
