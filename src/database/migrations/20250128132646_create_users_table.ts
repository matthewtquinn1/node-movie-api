import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true); // Adds created_at and updated_at
      });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
