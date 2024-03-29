import knex from 'knex';

export const knexClient = knex({
  client: 'pg',
  connection: {
    database: 'node-js-learning',
  },
});
