import express  from "express";
import LivroController from "../controllers/livroController";


const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);