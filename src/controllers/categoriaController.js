import express, { request, response } from "express";
import categoria from "../entities/categoria.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const routes = express.Router()

const categoriaRepository = AppDataSource.getRepository(categoria)

routes.get("/" , async (request, response) => {
    const categorias = await categoriaRepository.find();
    return response.status(200).send({"response": categorias});
})

routes.get("/:nameFound", async (request,response)=>{
    const {nameFound} = request.params;
    const categoriaFound = categoriaRepository.findBy({name:Like(`%${nameFound}`)})

    return response.status(200).send({"response":categoriaFound})
});

routes.post("/", async (request, response) => {
    const {id, nome_categoria} = request.body;
    try {
        const newCategoria = categoriaRepository.create({id, nome_categoria});
        await categoriaRepository.save(newCategoria);
    } 
    catch(error) {
        return response.status(500).send({"erro": error})
    }
    return response.status(201).send({"response":"Categoria cadastrada com sucesso"});
});

routes.put("/",async(request,response)=>{
    const {id,nome_categoria} = request.body;

    if(typeof id !=="number"){
        return response.status(400).send({"response":"o campo id deve ser numérico"})
    }

    if(nome_categoria.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }

    try{
        await categoriaRepository.update({id},{nome_categoria});
        return response.status(200).send({"response":"categoria atualizada"});
    } catch(err){
        return response.status(500).send({"error":err})
    }
});

routes.delete("/:id",async (request,response)=>{
    const {id} = request.params;

    if(isNaN(id)){
        return response.status(400).send({"response":"o id precisa ser um dado numérico"});
    }

    await categoriaRepository.delete({id})

    return response.status(200).send({"response":"categoria excluída com sucesso"});
})



export default routes;