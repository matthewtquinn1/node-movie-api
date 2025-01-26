import type { Knex } from "knex";

export const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'password',
      database: 'moviesdb'
    },
    migrations: {
      directory: './migrations'
    }
  }
};
