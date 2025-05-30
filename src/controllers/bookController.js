import express from "express";
import Livro from "../entities/livro.js";
import Categoria from "../entities/categoria.js";
import Editora from "../entities/publisher.js";
import { AppDataSource } from "../database/data-source.js";
import {Like,IsNull} from "typeorm";
import livro from "../entities/livro.js";

const route = express.Router();

const livroRepository = AppDataSource.getRepository(Livro);
const categoriaRepository = AppDataSource.getRepository(Categoria);
const editoraRepository = AppDataSource.getRepository(Editora);

route.get("/",async(request,response)=>{
    const livros = await livroRepository.find();
    return response.status(200).send({"response":livros});
})

route.get("/:nameFound", async (request, response) => {  
    const {nameFound} = request.params;  
    const livroFound = await livroRepository.findBy({name:Like(`%${nameFound}%`)})
    return response.status(200).send({"response":livroFound})
});

route.post("/", async(request,response)=>{
    const {book_name,publication,pages,price,editorId,categoryId} = request.body;

    if(book_name < 1){
        return response.status(400).send({"response":"Campo 'book_name' deve ter pelo menos um caractere"});
    }

    try{
        const editora = await editoraRepository.findOneBy({
            id:editorId,
        });
        if(!editora){
            return response.status(400).send({"response":"editora informada não encontrada"});
        }
        const category = await categoriaRepository.findOneBy({
            id:categoryId,
        });

        if(!category){
            return response.status(400).send({"response":"categoria informada não encontrada"});
        }

        const novoLivro = livroRepository.create({book_name,publication,pages,price,editor,category});
        await livroRepository.save(novoLivro);
        return response.status(201).send({"response":"Livro cadastrado com sucesso."});
    } catch(err){
        return response.status(500).send({"response":err});
    }
})

export default route;