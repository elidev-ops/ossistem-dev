exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('uf', 2).notNullable();
    table.string('city').notNullable();
    table.string('address').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
