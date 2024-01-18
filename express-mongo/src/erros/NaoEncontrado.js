import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  constructor(message = "Pagina não encontrada") {
    super(message, 404);
  }
}

export default NaoEncontrado;