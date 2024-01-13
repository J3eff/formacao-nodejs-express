import express from "express";
import conectDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";

const connect = await conectDataBase();
connect.on("error", console.log.bind(console, "Erro de conexão"));
connect.once("open", () => { console.log("Conexão com o banco feita com sucesso!"); });

const app = express();
routes(app);

// Midleware - Função para tratativa de erro
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
  if (erro instanceof mongoose.Error.CastError)
    res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
  else
    res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
});

export default app;