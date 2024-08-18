import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1724014126524 implements MigrationInterface {
    name = 'Migration1724014126524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`external_id\` varchar(255) NULL, \`external_provider\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`director\` varchar(255) NOT NULL, \`producers\` varchar(255) NOT NULL, \`release_date\` date NOT NULL, \`created_by_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie\` ADD CONSTRAINT \`FK_e3269e250ba2762c0e5cb24dde1\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`operator\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie\` DROP FOREIGN KEY \`FK_e3269e250ba2762c0e5cb24dde1\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
    }

}
