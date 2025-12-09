import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import ocorrenciaRoutes from './routes/ocorrencia.routes';

const app = express();

const PORT = Number(process.env.PORT ?? 3000);

app.use(
  cors({
    origin: process.env.FRONT_URL ?? '*',
  })
);

app.use(bodyParser.json());

app.use('/api/ocorrencias', ocorrenciaRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco MySQL');
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco', err);
  });
