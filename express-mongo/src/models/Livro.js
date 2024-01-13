import mongoose from "mongoose";

// Modelo é um objeto que representa uma coleção na base de dados
const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    require: [true, "O título do livro é obrigatório"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    require: [true, "O(a) autor é obrigatório"]
  },
  editora: {
    type: String,
    require: [true, "A editora é obrigatoria"]
  },
  numeroPaginas: { type: Number },
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;