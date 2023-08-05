import ElectorRepository from "../../data/repository/ElectorRepository"; // Ruta relativa para ElectorRepository
import Vote from "../../domain/models/Vote"; // Ruta relativa para Vote model

class ElectorService {
  // Constructor de la clase ElectorService.
  // El constructor se ejecuta al crear una instancia de ElectorService.
  // Recibe un parámetro "repository" que representa el repositorio de datos a utilizar.
  constructor(repository) {
    // Asigna el repositorio recibido como parámetro a la propiedad "repository".
    this.repository = repository;
  }

  // Función para guardar un voto.
  // Recibe el voto a guardar como parámetro.
  async saveVote(vote) {
    // Creamos una instancia del modelo Vote con los datos recibidos.
    const instanceVote = new Vote(vote.idElector, vote.idPoliticalParty, vote.date);

    try {
      // Llamada al repositorio ElectorRepository para guardar el voto.
      // Utiliza el repositorio asignado en el constructor para realizar la operación.
      return await this.repository.saveVote(instanceVote);
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio.
    }
  }

  // Función para obtener los partidos políticos.
  async getPoliticalParty() {
    try {
      // Llamada al repositorio ElectorRepository para obtener los partidos políticos.
      // Utiliza el repositorio asignado en el constructor para realizar la operación.
      return await this.repository.getPoliticalParty();
    } catch (error) {
      return error; // Devuelve el error en caso de fallo en la llamada al repositorio.
    }
  }
}

export default ElectorService;
