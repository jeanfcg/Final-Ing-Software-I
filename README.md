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
### 2. Persistent-tables (pages/api/services/voto.js)

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
Uso de camelCase:(Page/Votacion.js)
```javascript

  const [partidos, setPartidos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
```
### Manejo de Errores 
//Manejo de excepeciones a través de try y catch : (Data/Repositorio/PartidosPoliticos.js)
```javascript
  static async getPartidos() {
    try {
      const response = await axios.get('/api/services/partido_politico');
      return response;
    } catch (error) {
      console.error('Error al obtener resultados de la base de datos:', error);
      throw error;
    }
  }
```
### Limit Line Length
Linea de codigo menor que 80 caracteres (Page/Votacion.js)
```javascript
    <Success show={isSuccess} handleClose={logout} isSuccess={success} />
    <Verify
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      onConfirm={handleSubmit}
      text={"Estas seguro de tu voto?"}
    />
```
### Comments rules
Comentarios (page/api/services/PartidoPolitico.js
```javascript
export default async function handlePartidoPolitico(req, res) {
  try {
    // Realiza una consulta a la base de datos para obtener los datos de partido_politico
    const [result] = await pool.query("SELECT * FROM partido_politico;");
    // Devuelve la respuesta con el resultado de la consulta como un objeto JSON
    return res.status(200).json(result);
  } catch (error) {
    // Si ocurre un error en la consulta a la base de datos, se captura aquí
    console.error("Error al obtener los datos de partido_politico:", error);
    // Devuelve una respuesta con un código de estado 500 y un mensaje de error genérico para el cliente
    res.status(500).json({ error: "Error en el servidor" });
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
