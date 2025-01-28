import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
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

export default config;
 