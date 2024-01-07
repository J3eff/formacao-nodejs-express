import express from 'express';
import conectDataBase from './config/dbConnect.js'
import routes from './routes/index.js'

const connect = await conectDataBase();
connect.on("error", (erro) => { console.error("Erro de conexão: ", erro); });
connect.once("open", () => { console.log("Conexão com o banco feita com sucesso!") })

const app = express();
routes(app);

export default app;