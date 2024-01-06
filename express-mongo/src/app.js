import express from 'express';
import conectDataBase from './config/dbConnect.js'
import livro from './models/Livro.js';

const connect = await conectDataBase();
connect.on("error", (erro) => { console.error("Erro de conexão: ", erro); });
connect.once("open", () => { console.log("Conexão com o banco feita com sucesso!") })

const app = express();
app.use(express.json()); // Middleware


app.get('/', (req, res) => {
    res.status(200).send("Curso de Node.js")
});

app.get('/livros', async (req, res) => {
    const livros = await livro.find({});

    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id)

    if (index != -1)
        res.status(200).json(livros[index]);
    else
        res.status(404).send('Livro não encontrado.');
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
})

app.put('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);

    if (index != -1) {
        livros[index].titulo = req.body.titulo;

        res.status(200).json(livros);
    } else
        res.status(404).send('Livro não encontrado.');

})

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