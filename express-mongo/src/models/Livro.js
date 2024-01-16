import mongoose from "mongoose";

// Modelo é um objeto que representa uma coleção na base de dados
const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
    },
    numeroPaginas: { type: Number },
  }, { versionKey: false }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;
