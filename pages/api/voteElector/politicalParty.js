// Importar los módulos
import { pool } from "../../data/config/db";
import VoteElector from "../../services/VoteElector";

// Utilizamos async/await para manejar promesas y manejamos los errores adecuadamente
export default async function handlePartidoPolitico(req, res) {
  try {
    // Obtenemos los datos del partido político desde el servicio VoteElector
    const datosPartidoPolitico = await VoteElector.getPoliticalParty();

    // Devolvemos los datos en la respuesta con estado 200 (éxito)
    return res.status(200).json(datosPartidoPolitico);
  } catch (err) {
    // Manejamos los errores y proporcionamos un mensaje de error claro
    console.error("Error al obtener los datos del partido político:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
