import express, {request,response} from 'express';
import publisher from "../entities/publisher.js";
import { AppDataSource } from '../database/data-source.js';
import {Like} from 'typeorm';


const routes = express.Router()

const editoraRepository = AppDataSource.getRepository(publisher)

routes.get("/", async (request, response)=> {
    const editoras = await editoraRepository.find();
    return response.status(200).send({"response":editoras});
});

routes.get("/:nameFound", async (request, response) => {  
    const {nameFound} = request.params;  
    const editoraFound = await editoraRepository.findBy({name:Like(`%${nameFound}%`)})
    return response.status(200).send({"response":editoraFound})
});

routes.post("/", async (request,response)=>{
    const {name,cnpj,email} = request.body;
    try {
        const newEditora = editoraRepository.create({name,cnpj,email});
        await editoraRepository.save(newEditora);
    }
    catch(error){
        return response.status(500).send({"erro":error})
    }
    return response.status(201).send({"response":"editora cadastrada com sucesso"})
});

routes.put("/",async(request,response)=>{
    const {id,name,cnpj,email} = request.body;

    if(typeof id !== "number"){
        return response.status(400).send({"response":"o campo id deve ser numérico"})
    }

    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }
    if(!email.includes("@") || !email.includes(".") || email.length < 5){
        return response.status(400).send({"response":"Formato de email invalido"});
    }

    try{
        await editoraRepository.update({id},{name,cnpj,email});
        return response.status(200).send({"response":"editora atualizada com sucesso"});
    } catch(err){
        return response.status(500).send({"error":err})
    }
});

routes.delete("/:id", async (request,response)=>{
    const {id} = request.params;

    if(isNaN(id)){
        return response.status(400).send({"response":"o id precisa ser um dado numérico"});
    }

    await editoraRepository.delete({id})

    return response.status(200).send({"response":"usuário excluído com sucesso"});
});

export default routes;