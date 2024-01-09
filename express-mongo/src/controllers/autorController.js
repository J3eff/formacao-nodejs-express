import mongoose from "mongoose";
import { autor } from "../models/Autor.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const autoresResultado = await autor.find({});
      res.status(200).json(autoresResultado);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }

  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;

      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null)
        res.status(200).json(autorEncontrado);
      else
        res.status(404).json({ message: "Id do Autor não localizado." });

    } catch (error) {
      if (error instanceof mongoose.Error.CastError)
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
      else
        res.status(500).json({ message: `${error.message} - falha na requisição do autor` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao cadastrar do autor` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualização` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluido com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na exclusão` });
    }
  }

}

export default AutorController;