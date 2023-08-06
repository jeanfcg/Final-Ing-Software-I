import resultadoService from './resultadoService';
import userService from './userService';

class resultadoEleccion {
  static async getResultados() {
    return resultadoService.getResultados();
  }

  static async getUserById(id) {
    return userService.getUserById(id);
  }
}

export default resultadoEleccion;
