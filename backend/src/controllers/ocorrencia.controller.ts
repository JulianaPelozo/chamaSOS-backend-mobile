import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Ocorrencia } from "../entity/Ocorrencia";

const ocorrenciaRepo = AppDataSource.getRepository(Ocorrencia);

export const listarOcorrencias = async (_req: Request, res: Response) => {
  const ocorrencias = await ocorrenciaRepo.find();
  res.json(ocorrencias);
};

export const buscarOcorrencia = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const ocorrencia = await ocorrenciaRepo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: "Não encontrada" });
  res.json(ocorrencia);
};

export const criarOcorrencia = async (req: Request, res: Response) => {
  const { tipo, bairro, prioridade, status } = req.body;
  if (!tipo || !bairro) return res.status(400).json({ message: "Campos obrigatórios" });

  const ocorrencia = ocorrenciaRepo.create({ tipo, bairro, prioridade, status });
  await ocorrenciaRepo.save(ocorrencia);
  res.status(201).json(ocorrencia);
};

export const atualizarOcorrencia = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { tipo, bairro, prioridade, status } = req.body;

  const ocorrencia = await ocorrenciaRepo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: "Não encontrada" });

  ocorrencia.tipo = tipo ?? ocorrencia.tipo;
  ocorrencia.bairro = bairro ?? ocorrencia.bairro;
  ocorrencia.prioridade = prioridade ?? ocorrencia.prioridade;
  ocorrencia.status = status ?? ocorrencia.status;

  await ocorrenciaRepo.save(ocorrencia);
  res.json(ocorrencia);
};

export const deletarOcorrencia = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const ocorrencia = await ocorrenciaRepo.findOneBy({ id });
  if (!ocorrencia) return res.status(404).json({ message: "Não encontrada" });

  await ocorrenciaRepo.remove(ocorrencia);
  res.status(204).send();
};
