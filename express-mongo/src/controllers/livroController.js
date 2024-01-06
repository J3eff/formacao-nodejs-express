import livro from '../models/Livro.js';

class LivroController {
    static async listarLivros(req, res) {
        const livros = await livro.find({});
        res.status(200).json(livros);
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);

            res.status(201).json({ message: "Criado com sucesso", livro: novoLivro });

        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar livro`})
        }
    }

};

export default LivroController;