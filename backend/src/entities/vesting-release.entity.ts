import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Allocation } from './allocation.entity';

@Entity('vesting_releases')
export class VestingRelease {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  allocation_id: string;

  @ManyToOne(() => Allocation)
  @JoinColumn({ name: 'allocation_id' })
  allocation: Allocation;

  @Column({ type: 'timestamptz' })
  scheduled_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  executed_at: Date | null;

  @Column({ type: 'numeric', precision: 20, scale: 7 })
  amount: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  tx_hash: string | null;

  @Column({ type: 'varchar', length: 20, default: 'scheduled' })
  status: string;

  @Column({ type: 'smallint', default: 0 })
  retry_count: number;
}
