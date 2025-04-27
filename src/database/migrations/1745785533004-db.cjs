const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Db1745785533004 {
    name = 'Db1745785533004'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`livroAutor\` (\`autorId\` int NOT NULL, \`bookId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, \`livroId\` int NOT NULL, PRIMARY KEY (\`autorId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleteAt\` \`deleteAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`livro\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`livro\` CHANGE \`deleteAt\` \`deleteAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` ADD CONSTRAINT \`FK_c1dc3e1646eeb4903e5246fb24f\` FOREIGN KEY (\`autorId\`) REFERENCES \`autor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` ADD CONSTRAINT \`FK_3f13e69bcbab2a2fe13f02df036\` FOREIGN KEY (\`livroId\`) REFERENCES \`livro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`livroAutor\` DROP FOREIGN KEY \`FK_3f13e69bcbab2a2fe13f02df036\``);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` DROP FOREIGN KEY \`FK_c1dc3e1646eeb4903e5246fb24f\``);
        await queryRunner.query(`ALTER TABLE \`livro\` CHANGE \`deleteAt\` \`deleteAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`livro\` CHANGE \`createdAt\` \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleteAt\` \`deleteAt\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP TABLE \`livroAutor\``);
    }
}
