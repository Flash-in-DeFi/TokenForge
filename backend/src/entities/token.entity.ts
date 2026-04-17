import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 12 })
  symbol: string;

  @Column({ type: 'numeric', precision: 20, scale: 7 })
  total_supply: string;

  @Column({ type: 'smallint', default: 7 })
  decimals: number;

  @Column({ type: 'varchar', length: 20 })
  token_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  template_id: string | null;

  @Column({ type: 'varchar', length: 56 })
  issuer_public_key: string;

  @Column({ type: 'text' })
  issuer_secret_encrypted: string;

  @Column({ type: 'varchar', length: 56, nullable: true })
  distribution_account_public_key: string | null;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
