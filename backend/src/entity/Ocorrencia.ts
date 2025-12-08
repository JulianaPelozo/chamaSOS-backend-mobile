import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type Prioridade = 'Baixa' | 'Média' | 'Crítica';
export type Status = 'Ativa' | 'Encerrada';

@Entity({ name: 'ocorrencias' })
export class Ocorrencia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tipo!: string;

  @Column()
  bairro!: string;

  @Column({ type: 'enum', enum: ['Baixa', 'Média', 'Crítica'], default: 'Baixa' })
  prioridade!: Prioridade;

  @Column({ type: 'enum', enum: ['Ativa', 'Encerrada'], default: 'Ativa' })
  status!: Status;

  @Column({ type: 'int', default: 0 })
  numVitimas!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  custo!: number;

  @Column({ nullable: true })
  batalhao?: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
