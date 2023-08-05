import ElectorRepository from "../../data/repository/ElectorRepository"; // Ruta relativa para ElectorRepository
import Vote from "../../domain/models/Vote"; // Ruta relativa para Vote model

class ElectorService {
  // Función para guardar un voto
  static async saveVote(vote) {
    // Creamos una instancia del modelo Vote con los datos recibidos
    const instanceVote = new Vote(vote.idElector, vote.idPoliticalParty, vote.date);

    try {
      // Llamada al repositorio ElectorRepository para guardar el voto
      return await ElectorRepository.saveVote(instanceVote);
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio
    }
  }

  // Función para obtener los partidos políticos
  static async getPoliticalParty() {
    try {
      // Llamada al repositorio ElectorRepository para obtener los partidos políticos
      return await ElectorRepository.getPoliticalParty();
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio
    }
  }
}

export default ElectorService;
