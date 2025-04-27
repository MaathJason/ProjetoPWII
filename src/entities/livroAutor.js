import { EntitySchema } from "typeorm";

const livroAutor = new EntitySchema({
    name: "livroAutor",
    tableName: "livroAutor",
    columns:{
        autorId: {primary: true, type: "int", nullable: false},
        bookId:{primary: true, type: "int", nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deleteAt: {type: "datetime", nullable: true},
    },
    relations:{
        autor:{type:"many-to-one", target:"autor", nullable:false},
        livro:{type:"many-to-one", target:"livro", nullable:false},
    }
})

export default livroAutor;