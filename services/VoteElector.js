import ElectorService from "../../domain/services/ElectorService"; // Ruta relativa para ElectorService

class VoteElector {
  // Función para enviar un voto
  static async sendVote(vote) {
    try {
      // Llamada al servicio ElectorService para guardar el voto
      return await ElectorService.saveVote(vote);
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al servicio
    }
  }

  // Función para obtener los partidos políticos
  static async getPoliticalParty() {
    try {
      // Llamada al servicio ElectorService para obtener los partidos políticos
      return await ElectorService.getPoliticalParty();
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al servicio
    }
  }
}

export default VoteElector;
