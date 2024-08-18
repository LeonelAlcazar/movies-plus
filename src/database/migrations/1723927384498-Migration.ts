import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723927384498 implements MigrationInterface {
    name = 'Migration1723927384498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_auth\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`identification\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_d887e2dcbfe0682c46c055f93d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_auth\` ADD CONSTRAINT \`FK_d887e2dcbfe0682c46c055f93d6\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_auth\` DROP FOREIGN KEY \`FK_d887e2dcbfe0682c46c055f93d6\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_d887e2dcbfe0682c46c055f93d\` ON \`user_auth\``);
        await queryRunner.query(`DROP TABLE \`user_auth\``);
    }

}
