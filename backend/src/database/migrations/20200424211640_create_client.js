exports.up = function (knex) {
  return knex.schema.createTable('clients', (table) => {
    table.increments();
    table.string('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('tel').notNullable();
    table.string('whatsapp').notNullable();
    table.string('uf', 2).notNullable();
    table.string('city').notNullable();
    table.string('address').notNullable();
    table.string('cpf').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('clients');
};
