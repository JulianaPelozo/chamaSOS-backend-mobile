import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Ocorrencia } from "../entity/Ocorrencia";

const repo = AppDataSource.getRepository(Ocorrencia);

export const listarOcorrencias = async (_req: Request, res: Response) => {
  try {
    const list = await repo.find({ order: { createdAt: 'DESC' } });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro interno' });
  }
};

export const buscarOcorrencia = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const ocorrencia = await repo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: 'Não encontrada' });
  return res.json(ocorrencia);
};

export const criarOcorrencia = async (req: Request, res: Response) => {
  const { tipo, bairro, prioridade, status, numVitimas, custo, batalhao, descricao } = req.body;
  if (!tipo || !bairro) return res.status(400).json({ message: 'Campos obrigatórios: tipo, bairro' });

  const oc = repo.create({
    tipo,
    bairro,
    prioridade: prioridade ?? 'Baixa',
    status: status ?? 'Ativa',
    numVitimas: Number(numVitimas) || 0,
    custo: Number(custo) || 0,
    batalhao,
    descricao,
  });

  await repo.save(oc);
  return res.status(201).json(oc);
};

export const atualizarOcorrencia = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const ocorrencia = await repo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: 'Não encontrada' });

  const { tipo, bairro, prioridade, status, numVitimas, custo, batalhao, descricao } = req.body;

  ocorrencia.tipo = tipo ?? ocorrencia.tipo;
  ocorrencia.bairro = bairro ?? ocorrencia.bairro;
  ocorrencia.prioridade = prioridade ?? ocorrencia.prioridade;
  ocorrencia.status = status ?? ocorrencia.status;
  ocorrencia.numVitimas = numVitimas !== undefined ? Number(numVitimas) : ocorrencia.numVitimas;
  ocorrencia.custo = custo !== undefined ? Number(custo) : ocorrencia.custo;
  ocorrencia.batalhao = batalhao ?? ocorrencia.batalhao;
  ocorrencia.descricao = descricao ?? ocorrencia.descricao;

  await repo.save(ocorrencia);
  return res.json(ocorrencia);
};

export const deletarOcorrencia = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const ocorrencia = await repo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: 'Não encontrada' });

  await repo.remove(ocorrencia);
  return res.status(204).send();
};
