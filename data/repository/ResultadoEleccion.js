import ResultadoService from './resultadoService';
import UserService from './userService';

class ResultadoEleccion {
  static async getResultados() {
    return ResultadoService.getResultados();
  }

  static async getUserById(id) {
    return UserService.getUserById(id);
  }
}

export default ResultadoEleccion;
