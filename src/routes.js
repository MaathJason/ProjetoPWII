import express from "express";
import userController from "./controllers/userController.js";
import authorController from "./controllers/authorController.js";
import editoraController from "./controllers/publisherController.js"
import categoriaController from "./controllers/categoriaController.js";
import livroController from "./controllers/bookController.js";
import loginController from "./controllers/loginController.js"


const route = express();

route.use("/user", userController);
route.use("/autor", authorController);
route.use("/editora", editoraController)
route.use("/categoria", categoriaController);
route.use("/livro", livroController);
route.use("/login", loginController)



export default route;