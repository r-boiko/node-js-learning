import pkg from 'pg';

export const postgresClient = new pkg.Client({
  // user: 'postgres',
  // password: '1234',
  database: 'node-js-learning',
});

await postgresClient.connect();
