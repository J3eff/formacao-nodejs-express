import express from "express";
import db from "./config/dbConnect.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

// Configuração de conexão ao banco com mongoose
const connect = await db();
connect.on("error", console.log.bind(console, "Erro de conexão"));
connect.once("open", () => { console.log("Conexão com o banco feita com sucesso!"); });

const app = express();

//Rotas do projeto
routes(app);

// Middleware - Função para tratativa de erro
app.use(manipuladorDeErros);

export default app;