exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.int('client_id').notNullable();
    table
      .foreign('client_id')
      .references('id')
      .inTable('clients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('type').notNullable();
    table.string('brand').notNullable();
    table.string('model').notNullable();
    table.string('sn').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
