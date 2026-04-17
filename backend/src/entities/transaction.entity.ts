import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  token_id: string;

  @ManyToOne(() => Token)
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @Column({ type: 'varchar', length: 64, unique: true, nullable: true })
  tx_hash: string | null;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @Column({ type: 'numeric', precision: 20, scale: 7, nullable: true })
  amount: string | null;

  @Column({ type: 'varchar', length: 56, nullable: true })
  sender: string | null;

  @Column({ type: 'varchar', length: 56, nullable: true })
  recipient: string | null;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
