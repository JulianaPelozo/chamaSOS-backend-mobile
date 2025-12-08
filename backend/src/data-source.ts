import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Ocorrencia } from './entity/Ocorrencia';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASS ?? 'root',
  database: process.env.DB_NAME ?? 'chama_sos',
  synchronize: true, 
  logging: false,
  entities: [Ocorrencia],
});
