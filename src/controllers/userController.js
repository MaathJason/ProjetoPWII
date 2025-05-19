import express, { request, response } from "express";
import user from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { Like, IsNull } from "typeorm";

const routes = express.Router();
const userRepository = AppDataSource.getRepository(user);


routes.get("/", async (request, response) => {    
    const users = await userRepository.findBy({deleteAt:IsNull()});
    return response.status(200).send({"response":users})
});


routes.get("/:nameFound", async (request, response) => {  
    const {nameFound} = request.params;  
    const userFound = await userRepository.findBy({name:Like(`%${nameFound}%`)})
    return response.status(200).send({"response":userFound})
});

routes.post("/", async (request,response) =>{

    const {name, email, password,typeUser} = request.body;

    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }
    if(!email.includes("@") || !email.includes(".") || email.length < 5){
        return response.status(400).send({"response":"Formato de email invalido"});
    }
    if(password.length < 6){
        return response.status(400).send({"response":"Senha deve ter no mínimo 6 caracteres"});
    }
    if(typeUser !== "admin" && typeUser !== "comum"){
        return response.status(400).send({"response":"O campo deve ser preenchido como 'admin' ou 'comum'"});
    }

    try {
        const newUser = userRepository.create({name, email, password, typeUser});
        await userRepository.save(newUser);
    }
    catch(error) {
        return response.status(500).send({"erro": error})
    }
        

    return response.status(201).send({"response":"Usuario cadastrado com sucesso"});

    
});

routes.put("/", async (request,response) => {
    const {id,name,email,password,typeUser} = request.body;

    if(typeof id !== "number"){
        return response.status(400).send({"response":"o campo id deve ser numérico"})
    }

    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }
    if(!email.includes("@") || !email.includes(".") || email.length < 5){
        return response.status(400).send({"response":"Formato de email invalido"});
    }
    if(password.length < 6){
        return response.status(400).send({"response":"Senha deve ter no mínimo 6 caracteres"});
    }   
    if(typeUser !== "admin" && typeUser !== "comum"){
        return response.status(400).send({"response":"O campo deve ser preenchido como 'admin' ou 'comum'"});
    }
    try{
        await userRepository.update({id}, {name, email, password, typeUser});
        return response.status(200).send({"response":"Usuario atualizado com sucesso"}); 
    }
    catch(err){
        return response.status(500).send({"error":err})
    }

})

routes.delete("/:id", async (request,response)=>{
    const {id} = request.params;

    if(isNaN(id)){
        return response.status(400).send({"response":"o id precisa ser um dado numérico"});
    }

    await userRepository.update({id},{deleteAt: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({"response":"usuário excluído com sucesso"});
});

export default routes;