import express from "express";
import userController from "./controllers/userController.js";
import authorController from "./controllers/authorController.js";
import editoraController from "./controllers/publisherController.js"
import categoriaController from "./controllers/categoriaController.js";




const route = express();

route.use("/user", userController);
route.use("/autor", authorController);
route.use("/editora", editoraController)
route.use("/categoria", categoriaController);



export default route;