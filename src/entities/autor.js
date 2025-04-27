import { EntitySchema } from "typeorm";

const autor = new EntitySchema({
    name:"autor",
    tableName:"autor",
    columns: {
        id: {primary:true,type:"int",generated:"increment"},
        name:{type:"varchar",length:45,nullable:false},
        nasc_autor: {type:"datetime",nullable:false},
        nacionalidade:{type:"varchar",length:45}
    }
})

export default autor;