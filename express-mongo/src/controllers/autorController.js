import { autor } from '../models/Autor.js';

class AutorController {
    static async listarAutores(req, res) {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição` })
        }

    }

    static async listarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na requisição do autor` })
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor= await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar do autor` })
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado!" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na atualização` })
        }
    }
    
    static async excluirAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor excluido com sucesso!" })
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na exclusão` })
        }
    }

};

export default AutorController;