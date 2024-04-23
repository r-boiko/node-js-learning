import { Model } from 'objection';

export default class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'name', 'email', 'password'],

      properties: {
        user_id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        created_time: { type: 'string', format: 'date-time' },
      },
    };
  }
}
