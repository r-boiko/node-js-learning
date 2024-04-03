export const up = (knex) => {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id');
      table.string('user_id', 255).notNullable().unique();
      table.string('name', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.timestamp('created_time').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('urls', (table) => {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.string('url', 255).notNullable();
      table.string('user', 255).notNullable();
      table.string('code', 255).notNullable();
      table.integer('visits').notNullable().defaultTo(0);
      table.timestamp('created_time').notNullable().defaultTo(knex.fn.now());
    });
};

export const down = (knex) => {
  return knex.schema.dropTable('users').dropTable('urls');
};
