import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('movies', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.double('rating');
        table.timestamps(true, true); // Adds created_at and updated_at
      });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('movies');
}
