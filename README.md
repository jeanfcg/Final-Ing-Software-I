This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Trabajo encargado:
```bash
- pages/
      -api/voteElector/politicalParty.js
      -api/voteElector/vote.js
      -votacion.js
- services/VoteElector.js
- domain/services/ElectorService.js
```
## Estilos de programación

### 1. Tantrum (pages/api/voteElector/politicalParty.js)
Estilo de programacion para el manejo de errores a traves de excepciones:

Ejemplo
```javascript
export default async function handlePartidoPolitico(req, res) {
  try {
    // Obtenemos los datos del partido político desde el servicio VoteElector
    const datosPartidoPolitico = await VoteElector.getPoliticalParty();

    // Devolvemos los datos en la respuesta con estado 200 (éxito)
    return res.status(200).json(datosPartidoPolitico);
  } catch (err) {
    // Manejamos los errores y proporcionamos un mensaje de error claro
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
```
### 2. Letterbox (pages/api/services/voto.js)

Los datos de entrada del problema se modelan como entidades con relaciones entre ellas
Los datos se colocan en tablas, con columnas que potencialmente hacen referencia cruzada a datos en otras tablas
Existencia de un motor de consulta relacional
El problema se resuelve emitiendo consultas sobre los datos tabulares.

Ejemplo: 
```javascript
export default async function handleVoto(req, res) {
  // Desestructurar los valores recibidos desde el cuerpo de la solicitud
  const { id_elector, id_partido, fecha } = req.body;
  
  try {
    // Buscar si el usuario ya ha votado previamente
    const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?", [id_elector]);
    
    // Si se encuentra algún voto registrado, devolver un mensaje de error
    if (find.length > 0) {
      return res.status(401).json({ message: "Usuario ya votó" });
    }
    
    // Insertar el voto en la base de datos
    const resp = await pool.query("INSERT INTO votos VALUES (?, ?, ?);", [id_elector, id_partido, fecha]);
    // Devolver una respuesta con un código de estado 200 y el resultado de la inserción
    return res.status(200).json(resp);
  } catch (error) {
    // Si ocurre un error en la consulta a la base de datos, se captura aquí
    console.error("Error al insertar el voto en la base de datos:", error);
    // Devolver una respuesta con un código de estado 500 y un mensaje de error genérico para el cliente
    res.status(500).json({ error: "Error en el servidor" });
  }
}
```
### 3. code-golf (pages/votacion.js)

Tan pocas líneas de código como sea posible.

Las funciones de flecha proporcionan una forma concisa de escribir funciones en JavaScript.

Ejemplo:
```javascript
// Obtiene el perfil del usuario desde el backend
  const getProfile = async () => {
    const res = await axios.get("/api/profile");
    setVote({
      ...vote,
      idElector: res.data.id,
    });
  };
```
## Convenciones de programación aplicados:
### Names rules 
Uso de camelCase: (pages/votacion.js)
```javascript

  // Estados
  const [partidos, setPartidos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vote, setVote] = useState({
    idElector: 0,
    idPoliticalParty: 0,
    date: new Date(),
  });
```
### Manejo de Errores 
Manejo de excepeciones a través de try y catch : (services/VoteElector.js)
```javascript
  
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
```
### Limit Line Length
Linea de codigo menor que 80 caracteres (pages/votacion.js)
```javascript
     <Success show={isSuccess} handleClose={logout} isSuccess={success} />
     <Verify
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          onConfirm={handleSubmit}
          text={"Estas seguro de tu voto?"}
     />
     <button onClick={(e) => { e.preventDefault(); setIsOpen(true); }}>
          Votar
     </button>
```
### Comments rules
Comentarios (pages/api/voteElector/vote.js)
```javascript
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
```
### Capitalize SQL Special Words
En mayusculas las palabras reservadas del SQL
```javascript
export default async function handleVoto(req, res) {
  // Desestructurar los valores recibidos desde el cuerpo de la solicitud
  const { id_elector, id_partido, fecha } = req.body;
  
  try {
    // Buscar si el usuario ya ha votado previamente
    const [find] = await pool.query("SELECT * FROM votos WHERE id_elector = ?", [id_elector]);
    
    // Si se encuentra algún voto registrado, devolver un mensaje de error
    if (find.length > 0) {
      return res.status(401).json({ message: "Usuario ya votó" });
    }
    
    // Insertar el voto en la base de datos
    const resp = await pool.query("INSERT INTO votos VALUES (?, ?, ?);", [id_elector, id_partido, fecha]);
    // Devolver una respuesta con un código de estado 200 y el resultado de la inserción
    return res.status(200).json(resp);
  } catch (error) {
    // Si ocurre un error en la consulta a la base de datos, se captura aquí
    console.error("Error al insertar el voto en la base de datos:", error);
    // Devolver una respuesta con un código de estado 500 y un mensaje de error genérico para el cliente
    res.status(500).json({ error: "Error en el servidor" });
  }
}
```
