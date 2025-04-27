import { EntitySchema } from "typeorm";

const categoria = new EntitySchema({
    name:"categoria",
    tableName:"categoria",
    columns: {
        id: {primary:true,type:"int",generated:"increment"},
        nome_categoria:{type:"varchar",length:45,nullable:false}
    }
})

export default categoria;