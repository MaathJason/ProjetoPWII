import { EntitySchema } from "typeorm";

const Editora = new EntitySchema({
    name:"editora",
    tableName:"editora",
    columns: {
        id: {primary:true,type:"int",generated:"increment"},
        name:{type:"varchar",length:50,nullable:false},
        cnpj:{type:"varchar",length:45,nullable:false},
        email:{type:"varchar",length:100,nullable:false},
    }
})

export default Editora;