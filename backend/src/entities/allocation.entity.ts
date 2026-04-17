import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Token } from './token.entity';

@Entity('allocations')
export class Allocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  token_id: string;

  @ManyToOne(() => Token)
  @JoinColumn({ name: 'token_id' })
  token: Token;

  @Column({ type: 'varchar', length: 100 })
  group_name: string;

  @Column({ type: 'varchar', length: 56 })
  wallet_address: string;

  @Column({ type: 'numeric', precision: 20, scale: 7 })
  amount: string;

  @Column({ type: 'numeric', precision: 20, scale: 7, default: '0' })
  released_amount: string;

  @Column({ type: 'smallint', default: 0 })
  vesting_cliff_months: number;

  @Column({ type: 'smallint', default: 0 })
  vesting_total_months: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
