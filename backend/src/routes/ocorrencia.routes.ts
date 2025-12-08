import { Router } from 'express';
import {
  listarOcorrencias,
  buscarOcorrencia,
  criarOcorrencia,
  atualizarOcorrencia,
  deletarOcorrencia,
} from '../controllers/ocorrencia.controller';

const router = Router();

router.get('/', listarOcorrencias);
router.get('/:id', buscarOcorrencia);
router.post('/', criarOcorrencia);
router.put('/:id', atualizarOcorrencia);
router.delete('/:id', deletarOcorrencia);

export default router;
