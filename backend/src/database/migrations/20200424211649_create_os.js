exports.up = function (knex) {
  return knex.schema.createTable('os', (table) => {
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

    table.int('product_id').notNullable();
    table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('condition').notNullable();
    table.string('defects').notNullable();
    table.string('accessories').notNullable();
    table.string('solution').notNullable();
    table.string('report').notNullable();
    table.string('terms').notNullable();
    table.float('value').notNullable();
    table.boolean('status').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('os');
};
