import livros from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosEncontrados = await livros.find().populate("autor").exec();
      res.status(200).json(livrosEncontrados);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findById(id);

      if (livroEncontrado != null)
        res.status(200).json(livroEncontrado);
      else
        next(new NaoEncontrado("Id do Livro não localizado."));

    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findByIdAndUpdate(id, req.body);

      if (livroEncontrado != null)
        res.status(200).json({ message: "Livro atualizado!" });
      else
        next(new NaoEncontrado("Id do Livro não localizado."));

    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      var livroExcluido = await livros.findByIdAndDelete(id);

      if (livroExcluido != null)
        res.status(200).json({ message: "Livro excluido com sucesso!" });
      else
        next(new NaoEncontrado("Id do Livro não localizado."));

    } catch (error) {
      next(error);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livros.find({ editora: editora });

      if (livrosPorEditora != null)
        res.status(200).json(livrosPorEditora);
      else
        next(new NaoEncontrado("Id do Livro não localizado."));

    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
