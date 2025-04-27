import {EntitySchema} from "typeorm";

const livro = new EntitySchema({
    name:"livro",
    tableName:"livro",
    columns:{
        id: {primary: true, type: "int", generated: "increment"},
        book_name: {type: "varchar", length: 45, nullable: false},
        publication: {type:"date",nullable: false},
        pages:{type:"int",nullable: false},
        price:{type:"decimal", precision: 6, scale: 2, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deleteAt: {type: "datetime", nullable: true},
    },
    relations:{
        category:{type:"many-to-one", target:"categoria", nullable:false},
        editor:{type:"many-to-one", target:"editora", nullable:false},
    },
})

export default livro;