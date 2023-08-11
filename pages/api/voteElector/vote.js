import { pool } from "../../data/config/db";
import VoteElector from "../../services/VoteElector";

// Función para manejar una solicitud de voto
export default async function handleVote(req, res) {
  const vote = req.body; // Datos del voto desde el cuerpo de la solicitud

  try {
    // Intentamos enviar el voto al servicio VoteElector para su procesamiento
    const result = await VoteElector.sendVote(vote);

    // Verificamos el estado de la respuesta para dar la respuesta adecuada
    if (result.status === 200) {
      return res.status(200).json({ message: "Voto correcto" });
    } else if (result.status === 401) {
      return res.status(401).json({ message: "Usuario ya votó" });
    }

    // Si no se cumplieron las condiciones anteriores, respondemos con un error 500
    return res.status(500).json({ message: "Ocurrió un error" });
  } catch (err) {
    // Si ocurre algún error durante el proceso, lo capturamos y respondemos con un error 500
    res.status(500).json({ error: err }); 
  }
}
