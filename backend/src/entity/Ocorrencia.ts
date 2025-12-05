import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type Prioridade = 'Baixa' | 'Média' | 'Crítica';
export type Status = 'Ativa' | 'Encerrada';

@Entity()
export class Ocorrencia {
  @PrimaryGeneratedColumn()
  id!: number; // Use o "!" para garantir que será preenchido pelo TypeORM

  @Column()
  tipo!: string;

  @Column()
  bairro!: string;

  @Column({ type: 'enum', enum: ['Baixa', 'Média', 'Crítica'], default: 'Baixa' })
  prioridade!: Prioridade;

  @Column({ type: 'enum', enum: ['Ativa', 'Encerrada'], default: 'Ativa' })
  status!: Status;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
