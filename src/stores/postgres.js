import pkg from 'pg';

export const postgresClient = new pkg.Client({
  database: 'node-js-learning',
});

await postgresClient.connect();
