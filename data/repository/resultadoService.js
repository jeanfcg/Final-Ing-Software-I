import axios from 'axios';

class resultadoService {
  static async getResultados() {
    try {
      const response = await axios.get('/api/services/resultado');
      return response;
    } catch (error) {
      console.error('Error al obtener resultados de la base de datos:', error);
      throw error;
    }
  }
}

export default resultadoService;
