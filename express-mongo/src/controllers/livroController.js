import { autores, livros } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
      let [campoOrdenacao, ordem] = ordenacao.split(":");
      
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);

      if (limite > 0 && pagina > 0) {
        const livrosEncontrados = await livros.find()
          .sort({ [campoOrdenacao]: ordem })
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();

        res.status(200).json(livrosEncontrados);
      }
      else
        next(new RequisicaoIncorreta());

    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroEncontrado = await livros.findById(id).populate("autor").exec();

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

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosPorEditora = await livros.find(busca).populate("autor").exec();
        res.status(200).json(livrosPorEditora);
      }
      else
        res.status(200).send([]);

    } catch (error) {
      next(error);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  //gte = Maior ou igual que
  if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
  //lte = Menor ou igual
  if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null)
      busca.autor = autor._id;
    else
      busca = null;

  }

  return busca;
}

export default LivroController;
