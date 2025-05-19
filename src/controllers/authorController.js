import express, { request, response } from "express";
import autor from "../entities/autor.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const routes = express.Router();

const authorRepository = AppDataSource.getRepository(autor);

routes.get("/", async (request, response) => {
    const autores = await authorRepository.find();
    return response.status(200).send({ "response": autores })
});

routes.get("/:nameFound", async (request, response) => {  
    const {nameFound} = request.params;  
    const authorFound = await authorRepository.findBy({name:Like(`%${nameFound}%`)})
    return response.status(200).send({"response":authorFound})
});

routes.post("/", async (request, response) => {
    const {name, nasc_autor, nacionalidade} = request.body;
    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }
    if(nasc_autor.length < 1){
        return response.status(400).send({"response":"Campo nascimento deve ter pelo menos 10 caracteres."});
    }
    if(nacionalidade.length < 1){
        return response.status(400).send({"response":"Campo nacionalidade deve ter pelo menos 1 caractere."});
    }
    try {
        const newAuthor = authorRepository.create({name, nasc_autor, nacionalidade});
        await authorRepository.save(newAuthor);
    }
    catch(error) {
        return response.status(500).send({"erro": error})
    }
    return response.status(201).send({"response":"Autor cadastrado com sucesso"});
});

routes.put("/", async (request, response) => {
    const {id,name,nasc_autor,nacionalidade} = request.body;

    if(typeof id !== "number"){
        return response.status(400).send({"response":"o campo id deve ser numérico"})
    }

    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }

    if(nasc_autor.length < 10){
        return response.status(400).send({"response":"Campo nascimento deve ter pelo menos 10 caracteres."});
    }

    if(nacionalidade.length < 1){
        return response.status(400).send({"response":"Campo nacionalidade deve ter pelo menos 1 caractere."});
    }
    try{
        await authorRepository.update({id},{name,nasc_autor,nacionalidade});
        return response.status(200).send({"response":"Usuário atualizado com sucesso"});
    } catch(err){
        return response.status(500).send({"error":err})
    }
});

routes.delete("/:id",async (request,response)=>{
    const {id} = request.params;

    if(isNaN(id)){
        return response.status(400).send({"response":"o id precisa ser um dado numérico"});
    }

    await authorRepository.delete({id})

    return response.status(200).send({"response":"Autor deletado com sucesso"});
})

export default routes;