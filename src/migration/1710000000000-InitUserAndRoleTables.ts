import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUserAndRoleTables1710000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR NOT NULL UNIQUE,
                "email" VARCHAR NOT NULL UNIQUE,
                "password_hash" VARCHAR NOT NULL,
                "is_active" BOOLEAN DEFAULT TRUE,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now()
            );
            CREATE TABLE "roles" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR NOT NULL UNIQUE,
                "description" VARCHAR
            );
            CREATE TABLE "user_roles" (
                "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
                "role_id" INTEGER NOT NULL REFERENCES "roles"("id") ON DELETE CASCADE,
                PRIMARY KEY ("user_id", "role_id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "user_roles";
            DROP TABLE IF EXISTS "roles";
            DROP TABLE IF EXISTS "users";
        `);
    }
}