import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1700000000000 implements MigrationInterface {
  name = 'InitialSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" VARCHAR(255) UNIQUE,
        "wallet_address" VARCHAR(56) NOT NULL UNIQUE,
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "tokens" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID REFERENCES users(id),
        "name" VARCHAR(20) NOT NULL,
        "symbol" VARCHAR(12) NOT NULL,
        "total_supply" NUMERIC(20, 7) NOT NULL,
        "decimals" SMALLINT NOT NULL DEFAULT 7,
        "token_type" VARCHAR(20) NOT NULL,
        "template_id" VARCHAR(50),
        "issuer_public_key" VARCHAR(56) NOT NULL,
        "issuer_secret_encrypted" TEXT NOT NULL,
        "distribution_account_public_key" VARCHAR(56),
        "status" VARCHAR(20) DEFAULT 'pending',
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "compliance_rules" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "token_id" UUID REFERENCES tokens(id),
        "rule_type" VARCHAR(30) NOT NULL,
        "config_json" JSONB NOT NULL,
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "allocations" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "token_id" UUID REFERENCES tokens(id),
        "group_name" VARCHAR(100) NOT NULL,
        "wallet_address" VARCHAR(56) NOT NULL,
        "amount" NUMERIC(20, 7) NOT NULL,
        "released_amount" NUMERIC(20, 7) DEFAULT 0,
        "vesting_cliff_months" SMALLINT DEFAULT 0,
        "vesting_total_months" SMALLINT DEFAULT 0,
        "status" VARCHAR(20) DEFAULT 'pending',
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "vesting_releases" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "allocation_id" UUID REFERENCES allocations(id),
        "scheduled_at" TIMESTAMPTZ NOT NULL,
        "executed_at" TIMESTAMPTZ,
        "amount" NUMERIC(20, 7) NOT NULL,
        "tx_hash" VARCHAR(64),
        "status" VARCHAR(20) DEFAULT 'scheduled',
        "retry_count" SMALLINT DEFAULT 0
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "transactions" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "token_id" UUID REFERENCES tokens(id),
        "tx_hash" VARCHAR(64) UNIQUE,
        "type" VARCHAR(30) NOT NULL,
        "amount" NUMERIC(20, 7),
        "sender" VARCHAR(56),
        "recipient" VARCHAR(56),
        "status" VARCHAR(20) DEFAULT 'pending',
        "created_at" TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Indexes for common query patterns
    await queryRunner.query(`CREATE INDEX idx_tokens_user_id ON tokens(user_id)`);
    await queryRunner.query(`CREATE INDEX idx_allocations_token_id ON allocations(token_id)`);
    await queryRunner.query(`CREATE INDEX idx_vesting_releases_allocation_id ON vesting_releases(allocation_id)`);
    await queryRunner.query(`CREATE INDEX idx_vesting_releases_scheduled_at ON vesting_releases(scheduled_at) WHERE status = 'scheduled'`);
    await queryRunner.query(`CREATE INDEX idx_transactions_token_id ON transactions(token_id)`);
    await queryRunner.query(`CREATE INDEX idx_compliance_rules_token_id ON compliance_rules(token_id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "transactions"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vesting_releases"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "allocations"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "compliance_rules"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "tokens"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
  }
}
