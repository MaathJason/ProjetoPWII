const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Db1743471205474 {
    name = 'Db1743471205474'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
