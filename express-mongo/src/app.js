import express from 'express';
import conectDataBase from './config/dbConnect.js'
import routes from './routes/index.js'

const connect = await conectDataBase();
connect.on("error", (erro) => { console.error("Erro de conexão: ", erro); });
connect.once("open", () => { console.log("Conexão com o banco feita com sucesso!") })

const app = express();
routes(app);

app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);

    if (index != -1) {
        livros.splice(index, 1);
        res.status(200).send('Livro removido com sucesso')
    }
    else
        res.status(404).send('Livro não encontrado')
})


export default app;