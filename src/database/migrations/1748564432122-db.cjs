const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Db1748564432122 {
    name = 'Db1748564432122'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`editora\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`cnpj\` varchar(45) NOT NULL, \`email\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`livroAutor\` (\`autorId\` int NOT NULL, \`bookId\` int NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, \`livroId\` int NOT NULL, PRIMARY KEY (\`autorId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`livro\` (\`id\` int NOT NULL AUTO_INCREMENT, \`book_name\` varchar(45) NOT NULL, \`publication\` date NOT NULL, \`pages\` int NOT NULL, \`price\` decimal(6,2) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, \`categoryId\` int NOT NULL, \`editorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome_categoria\` varchar(45) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`autor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`nasc_autor\` datetime NOT NULL, \`nacionalidade\` varchar(45) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` ADD CONSTRAINT \`FK_c1dc3e1646eeb4903e5246fb24f\` FOREIGN KEY (\`autorId\`) REFERENCES \`autor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` ADD CONSTRAINT \`FK_3f13e69bcbab2a2fe13f02df036\` FOREIGN KEY (\`livroId\`) REFERENCES \`livro\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`livro\` ADD CONSTRAINT \`FK_e8dceb6448031b3898f3166090d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`livro\` ADD CONSTRAINT \`FK_27f4fb8a38e7c8152f32126918c\` FOREIGN KEY (\`editorId\`) REFERENCES \`editora\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`livro\` DROP FOREIGN KEY \`FK_27f4fb8a38e7c8152f32126918c\``);
        await queryRunner.query(`ALTER TABLE \`livro\` DROP FOREIGN KEY \`FK_e8dceb6448031b3898f3166090d\``);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` DROP FOREIGN KEY \`FK_3f13e69bcbab2a2fe13f02df036\``);
        await queryRunner.query(`ALTER TABLE \`livroAutor\` DROP FOREIGN KEY \`FK_c1dc3e1646eeb4903e5246fb24f\``);
        await queryRunner.query(`DROP TABLE \`autor\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
        await queryRunner.query(`DROP TABLE \`livro\``);
        await queryRunner.query(`DROP TABLE \`livroAutor\``);
        await queryRunner.query(`DROP TABLE \`editora\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
