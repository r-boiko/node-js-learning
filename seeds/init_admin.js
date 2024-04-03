export const seed = async (knex) => {
  await knex('users').insert([
    { user_id: 'HjJuW', name: 'admin', password: 'admin' },
  ]);
};
