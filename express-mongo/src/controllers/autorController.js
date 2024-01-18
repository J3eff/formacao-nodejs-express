import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find({});
      res.status(200).json(autoresResultado);
    } catch (error) {
      next(error);
    }

  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorEncontrado = await autores.findById(id);

      if (autorEncontrado !== null)
        res.status(200).json(autorEncontrado);
      else
        next(new NaoEncontrado("Id do Autor não localizado."));

    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).json({ message: "Criado com sucesso", autor: autorResultado });
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      var autorEncontrado = await autores.findByIdAndUpdate(id, req.body);

      if (autorEncontrado != null)
        res.status(200).json({ message: "Autor atualizado!" });
      else
        next(new NaoEncontrado("Id do Autor não localizado."));

    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;      
      
      const autorEncontrado = await autores.findByIdAndDelete(id);
      
      if (autorEncontrado != null)
        res.status(200).json({ message: "Autor excluido com sucesso!" });
      else
        next(new NaoEncontrado("Id do Autor não localizado."));

    } catch (error) {
      next(error);
    }
  };

}

export default AutorController;