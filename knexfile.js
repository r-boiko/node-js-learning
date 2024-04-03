/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = {
  client: 'pg',
  connection: {
    database: 'node-js-learning',
  },
};

export default {
  development: config,
  production: config,
};
