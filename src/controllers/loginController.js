import express, { request, response } from "express";
import user from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { IsNull } from "typeorm";

const routes = express.Router();
const userRepository = AppDataSource.getRepository(user);

routes.post("/", async (request,response)=>{

    const {email,password} = request.body;

    if(!email.includes("@")){
        return response.status(400).send({"response":"O email é inválido"})
    }

    if(password.length < 6){
        return response.status(400).send({"response":"a senha deve conter no minino 6 caracteres"})
    }

    const user = await userRepository.findOneBy({
        email,password
    });

    if(!user){
        return response.status(401).send({"response":"Usuário ou senha inválidos"})
    }
    
    return response.status(200).send({"response":"Usuário logado com sucesso"});

    
});

export default routes;