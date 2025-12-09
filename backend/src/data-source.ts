import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Ocorrencia } from './entity/Ocorrencia';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'chama_sos',
  synchronize: true,
  logging: false,
  entities: [Ocorrencia],
});
