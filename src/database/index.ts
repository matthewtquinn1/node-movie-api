import Knex from 'knex';
import * as knexConfig from './knexfile';

export const db = Knex(knexConfig.default['development']);