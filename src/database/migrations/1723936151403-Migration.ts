import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723936151403 implements MigrationInterface {
    name = 'Migration1723936151403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`operator_auth\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`identification\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`operator_id\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_a369ea702bcacb2c4c9c1e92dc\` (\`operator_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`operator\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`operator_auth\` ADD CONSTRAINT \`FK_a369ea702bcacb2c4c9c1e92dc3\` FOREIGN KEY (\`operator_id\`) REFERENCES \`operator\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`operator_auth\` DROP FOREIGN KEY \`FK_a369ea702bcacb2c4c9c1e92dc3\``);
        await queryRunner.query(`DROP TABLE \`operator\``);
        await queryRunner.query(`DROP INDEX \`REL_a369ea702bcacb2c4c9c1e92dc\` ON \`operator_auth\``);
        await queryRunner.query(`DROP TABLE \`operator_auth\``);
    }

}
