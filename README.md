# MENÚ A SEGUIR:
* 1ERA PARTE: LAB 9 - Estilos de Programación.
* 2DA PARTE: LAB 10 -  Prácticas de Codificación Legible.
* 3RA PARTE: LAB 11 -  Principios SOLID


# **------------------------- LAB 9: ESTILOS DE PROGRAMACIÓN -------------------------------**
> Alumno: Nelzon Jorge Apaza Apaza
> Curso Ingeniería de software

Implementación de estilos de programación:

## **En resultado.js**

* Sliding Window: Implementado en la declaración del estado resultado (línea 6) utilizando el Hook useState, estableciendo su valor inicial como un array vacío.
```bash
    // Sliding Window (iniciando)
    const [resultado, setResultado] = useState([]);
    // Sliding Window (terminando)
```

* Quarantine: Aplicamos este estilo en la función getResultados (líneas 15 a 25) al usar try-catch para capturar posibles errores al obtener los resultados. Si ocurre un error, establecemos el estado resultado como un array vacío para evitar problemas en la representación de la tabla.

```bash
  // Quarantine (iniciando)
  const getResultados = async () => {
    try {
      const res = await resultadoEleccion.getResultados();
      console.log(res.data);
      setResultado(res.data[0]);
    } catch (error) {
      console.error("Error al obtener resultados:", error);
      // Aquí aplicamos el Quarantine al encapsular el manejo del error.
      setResultado([]);
    }
  };
  // Quarantine (terminando)
```

* Map Reduce:
Lo implementamos en el bloque de retorno, en la línea 44 , utilizando el método map para generar dinámicamente las filas de la tabla basándonos en los datos del array resultado.
```bash
    <tbody>
            {resultado.map((e, index) => { // Map-Reduce (iniciando)
              return (
                <tr key={e.id_partido}>
                  <td>{e.id_partido}</td>
                  <td>{e.nombre_partido}</td>
                  <td>{e.nombre + " " + e.apellido}</td>
                  <td>{e.nro_votos}</td>
                  <td>
                    <img
                      src={"/partidos/" + e.nombre_partido + ".png"}
                      alt={"Cargando"}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                </tr>
              );
              // Map-Reduce (terminando)
            })} 
    </tbody>
```

* Cookbook: Lo aplicamos en el bloque de retorno, entre las líneas 29 y 70, al generar la estructura de la tabla y sus elementos siguiendo un patrón predefinido y común en este tipo de componentes.

```bash
  return (
    // Cookbook (iniciando)
    <Layout pagina="Resultado">
      {resultado.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Partido</th>
              <th>Presidente</th>
              <th>Nro_Votos</th>
              <th>Logo</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map((e, index) => {
              return (
                <tr key={e.id_partido}>
                  <td>{e.id_partido}</td>
                  <td>{e.nombre_partido}</td>
                  <td>{e.nombre + " " + e.apellido}</td>
                  <td>{e.nro_votos}</td>
                  <td>
                    <img
                      src={"/partidos/" + e.nombre_partido + ".png"}
                      alt={"Cargando"}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                </tr>
              );
            })} 
          </tbody>
        </table>
      ) : (
        <div>Vacio</div>
      )}
    </Layout>
    // Cookbook (terminando)
  );
```

## **En resultadoEleccion.js**

* RESTful: Este estilo se aplica en las funciones getResultados y getUserById. La implementación del estilo es en cómo las funciones están diseñadas para realizar operaciones de acceso a recursos a través de una API RESTful. La función getResultados realiza una solicitud HTTP GET a la ruta `/api/services/resultado`, mientras que getUserById realiza una solicitud HTTP GET a la ruta `/api/users/${id}`.

```bash
// RESTful (Inicia Aquí)
import axios from 'axios';
class resultadoEleccion {
    static async getResultados() {
        try {
            // RESTful (continuando)
            const response = await axios.get('/api/services/resultado');
            return response;
        } catch (error) {
            console.error('Error al obtener resultados base de datos:', error);
            throw error;
        }
    }
    static async getUserById(id) {
        try {
            // RESTful (continuando)
            const response = await axios.get(`/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener el usuario con ID ${id}:`, error);
            throw error;
        }
    }
}

export default resultadoEleccion;
```
## **En layout.js**

* Go Forth: He implementado este estilo utilizando el efecto de lado (useEffect). En la línea 12, el efecto está configurado para llamar a la función getProfile cuando el componente se monta (porque el arreglo de dependencias está vacío). De esta manera, el código avanza y ejecuta la obtención del perfil del usuario en el momento adecuado.

```bash
    // Go Forth (Aquí inicia)
    useEffect(() => {
        getProfile();
    }, []);
    // Go Forth (Termina Aquí)
```


* Map-Reduce: He aplicado este estilo dentro de la función getProfile. El bloque de código que realiza la solicitud HTTP utilizando Axios representa el enfoque Map-Reduce. Primero, intentamos obtener el perfil del usuario mediante una solicitud HTTP (Map), y luego, en caso de éxito, actualizamos el estado username con los datos obtenidos (Reduce).

```bash
    const getProfile = async () => {
        // Map-Reduce (Aquí inicia)
        try {
            const res = await axios.get("/api/profile");
            setUsername(res.data.username);
        } catch (error) {
            console.error("Error al obtener el perfil del usuario:", error);
            setUsername(0);
        }
        // Map-Reduce (Termina Aquí)
    };
```

## **En verify.js**
* Actors: Hemos aplicado este estilo en el componente verify. El enfoque de estilo de actores involucra la comunicación y cooperación entre componentes independientes (actores) para lograr una tarea común. En este caso, el componente verify es un actor que funciona de manera independiente y recibe mensajes (propiedades) desde otros componentes.

```bash
const verify = ({ isOpen, onRequestClose, onConfirm, text }) => {
    return (
        // Estilo 29: Actors (iniciando)
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmación"
            ariaHideApp={false}
            className="modal-dialog"
        >
            <div className="modal-content container ">
                <div className="modal-header">
                    <h5 className="modal-title">{text}</h5>
                    <button type="button" className="close" onClick={onRequestClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>
                        Sí
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
                        No
                    </button>
                </div>
            </div>
        </Modal>
        // Estilo 29: Actors (terminando)
    );
};
```

# **------------------------------- LAB 10:  Prácticas de Codificación Legible -------------------------------**
> Alumno: Nelzon Jorge Apaza Apaza
> Curso Ingeniería de software

Implementación de prácticas de codificación legible:

## **En resultado.js**

* Uso de importaciones Claras y ordenadas:
```bash
// Uso de importaciones Claras y ordenadas
import React, { useEffect, useState } from "react";
import Layout from "../componentes/layout";
import resultadoEleccion from "../data/repositorio/resultadoEleccion";
```

* Comentarios para explicar bloques de código importantes:
```bash
  // useEffect para obtener los resultados al montar el componente
  useEffect(() => {
    getResultados();
  }, []);

  // Función getResultados  asincrónica para obtener resultados
  const getResultados = async () => {
    try {
      const res = await resultadoEleccion.getResultados();
      console.log(res.data);
      setResultado(res.data[0]);
    } catch (error) {
      console.error("Error al obtener resultados:", error);
      // Aquí aplicamos el Quarantine al encapsular el manejo del error.
      setResultado([]);
    }
  };

```
* No se puso comentarios no necesarios
* Consistent Indentation Estilo 2
```bash
  const getResultados = async () => 
  {
    try 
    {
      const res = await resultadoEleccion.getResultados();
      console.log(res.data);
      setResultado(res.data[0]);
    } catch (error) 
    {
      console.error("Error al obtener resultados de la base de datos:", error);
      // Aquí aplicamos el Quarantine al encapsular el manejo del error.
      setResultado([]);
    }
  };
```

## **En resultadoEleccion.js**

* Comentarios descriptivos
```bash
// Clase para manejar las operaciones relacionadas con los resultados de la elección
class resultadoEleccion {
    // Obtiene todos los resultados de la elección
    static async getResultados() {
        try {...
```
* Comandos con mensajes claros de entender.
```bash
console.error("Error al obtener resultados de la base de datos:", error);
```
* No se puso comentarios no necesarios
* Consistent Indentation Estilo 2
```bash
class resultadoEleccion 
{
    // Obtiene todos los resultados de la elección
    static async getResultados() 
    {
        try 
        {
            // RESTful (continuando)
            const response = await axios.get('/api/services/resultado');
            return response;
        } 
        catch (error) 
        {
            console.error('Error al obtener resultados base de datos:', error);
            throw error;
        }
    }....
```

## **En layout.js**

* Comentarios descriptivos
```bash
  // Efecto secundario para obtener el perfil del usuario al montar el componente.
  useEffect(() => {
    getProfile();
  }, []);

  try {
      // Hacemos una solicitud GET a la API para obtener el perfil del usuario.
      const res = await axios.get("/api/profile");
      ....

  const logout = async () => {
    try {
      // Hacemos una solicitud POST a la API para cerrar la sesión del usuario.
      const res = await axios.post("api/auth/logout");
      router.push("/"); // Redirigimos a la página de inicio después de cerrar sesión exitosamente.
    } catch (err) {
      console.log(err);
      router.push("/"); // En caso de error, también redirigimos a la página de inicio.
    }
  };

```
* No se puso comentarios no necesarios
* Consistent Indentation Estilo 2
```bash
const getProfile = async () => 
  {
    // Map-Reduce (Aquí inicia)
    try 
    {
      // Hacemos una solicitud GET a la API para obtener el perfil del usuario.
      const res = await axios.get("/api/profile");
      setUsername(res.data.username);
    } 
    catch (error) 
    {
      console.error("Error al obtener el perfil del usuario:", error);
      setUsername(0);
    }
    // Map-Reduce (Termina Aquí)
  };
```

## **En verify.js**

* Comentarios descriptivos
```bash
        // Componente Modal para confirmar acciones
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmación"
            ariaHideApp={false}
            className="modal-dialog"
        >
```
* No se puso comentarios no necesarios


# **------------------------------- LAB 11:  Principios SOLID -------------------------------**
> Alumno: Nelzon Jorge Apaza Apaza
> Curso Ingeniería de software

Implementación de principios SOLID:

## **En resultado.js**
He separado la representación de la tabla en un nuevo componente llamado ResultadoTable. De esta manera, el componente Resultado ahora se enfoca únicamente en obtener los resultados y manejar su visualización, mientras que la tabla se representa en un componente separado. Esto cumple con el principio de Responsabilidad Única.
```js
// Archivo Resultado.js
import React, { useEffect, useState } from "react";
import Layout from "../componentes/layout";
import resultadoEleccion from "../data/repositorio/resultadoEleccion";

// Nuevo componente para la tabla de resultados
function ResultadoTable({ resultado }) {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Id</th>
          <th>Partido</th>
          <th>Presidente</th>
          <th>Nro_Votos</th>
          <th>Logo</th>
        </tr>
      </thead>
      <tbody>
        {resultado.map((e, index) => (
          <tr key={e.id_partido}>
            <td>{e.id_partido}</td>
            <td>{e.nombre_partido}</td>
            <td>{e.nombre + " " + e.apellido}</td>
            <td>{e.nro_votos}</td>
            <td>
              <img
                src={"/partidos/" + e.nombre_partido + ".png"}
                alt={"Cargando"}
                style={{ width: "100px", height: "100px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Resultado() {
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    getResultados();
  }, []);

  const getResultados = async () => {
    try {
      const res = await resultadoEleccion.getResultados();
      console.log(res.data);
      setResultado(res.data[0]);
    } catch (error) {
      console.error("Error al obtener resultados de la base de datos:", error);
      setResultado([]);
    }
  };

  return (
    <Layout pagina="Resultado">
      {resultado.length > 0 ? (
        <ResultadoTable resultado={resultado} />
      ) : (
        <div>Vacio</div>
      )}
    </Layout>
  );
}

```

## **En resultadoEleccion.js**

* He separado las responsabilidades en dos clases diferentes: resultadoService se encarga de obtener los resultados de la elección, y userService se encarga de obtener información del usuario. Luego, la clase resultadoEleccion utiliza estas dos clases para manejar las operaciones relacionadas con los resultados de la elección y la obtención de información del usuario.

Con esta reestructuración, hemos aplicado el principio de Responsabilidad Única (SRP) al dividir las responsabilidades en clases diferentes y, como beneficio adicional, hemos mejorado la cohesión y la modularidad del código. Cada clase tiene una única responsabilidad y se puede modificar, extender o reutilizar de manera más sencilla. Además, si hay cambios en el manejo de resultados o usuarios, afectarán solo a sus respectivas clases sin afectar a las otras partes del código.

```js
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

```
### creación de "resultadoService.js":
```js
import axios from 'axios';

class resultadoService {
  static async getResultados() 
  {
    try 
    {
      const response = await axios.get('/api/services/resultado');
      return response;
    } 
    catch (error) 
    {
      console.error('Error al obtener resultados de la base de datos:', error);
      throw error;
    }
  }
}

export default resultadoService;

```
### creación de "userService.js":

```js
import axios from 'axios';

class userService {
  static async getUserById(id) 
  {
    try 
    {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    } 
    catch (error) 
    {
      console.error(`Error al obtener el usuario con ID ${id}:`, error);
      throw error;
    }
  }
}

export default userService;

```

## **En resultadoEleccion.js**  

### creación de "profileService.js":

* Aplicación del principio de Responsabilidad Única (SRP): La función getProfile se encargaba tanto de hacer una solicitud HTTP para obtener el perfil del usuario como de actualizar el estado del componente con el nombre de usuario. Para separar estas responsabilidades, realicé una nueva clase profileService que maneje la obtención del perfil del usuario.
```js
import axios from "axios";

class profileService {
  static async getProfile() {
    try 
    {
      // Hacemos una solicitud GET a la API para obtener el perfil del usuario.
      const res = await axios.get("/api/profile");
      return res.data.username;
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      return 0;
    }
  }
}

export default profileService;

```

### creación de "httpService.js":

* Aplicación del principio de Inversión de Dependencias (DIP): En el código anterior, el componente Layout dependía directamente de axios para hacer las solicitudes HTTP. Para aplicar el principio de Inversión de Dependencias, realicé una abstracción en forma de una interfaz httpService que definirá los métodos de solicitud.

```js
import axios from "axios";

class httpService {
  static async get(url) {
    return await axios.get(url);
  }

  static async post(url) {
    return await axios.post(url);
  }
}

export default httpService;

```
He aplicado los principios SOLID de Responsabilidad Única (SRP) e Inversión de Dependencias (DIP) al código. La clase profileService se encarga exclusivamente de obtener el perfil del usuario, mientras que la clase httpService proporciona una abstracción para realizar solicitudes HTTP. Esto mejora la cohesión y la modularidad del código y facilita su extensión y mantenimiento en el futuro.

## **En verify.js**  

* Principio de Responsabilidad Única (SRP): En el código anterior, el componente verify tiene la responsabilidad tanto de la presentación (mostrar el modal) como de la lógica de confirmación (manejar la acción cuando se confirma). Dividí estas responsabilidades en dos componentes diferentes: verifyModal para la presentación y confirmDialog para la lógica de confirmación.

### creación de "confirmDialog.js":

```js
import React from 'react';

const confirmDialog = ({ onConfirm, onCancel, text }) => {
  return (
    <div>
      <h5>{text}</h5>
      <button onClick={onConfirm}>Sí</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default confirmDialog;

```

### creación de "verifyModal.js":

```js
import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const verifyModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmación"
      ariaHideApp={false}
      className="modal-dialog"
    >
      <div className="modal-content container">
        {children}
      </div>
    </Modal>
  );
};

export default verifyModal;

```

### **En verify.js** 
* Ahora, el componente verify se compone de verifyModal y confirmDialog, lo que nos permite separar la presentación del modal y la lógica de confirmación en componentes diferentes. Esto mejora la cohesión y la modularidad del código y facilita la comprensión y el mantenimiento en el futuro. Además, también facilita la reutilización de estos componentes en otros lugares de la aplicación, lo que fomenta la eficiencia del desarrollo.
```js
import React, { useState } from 'react';
import verifyModal from './verifyModal';
import confirmDialog from './confirmDialog';

const verify = ({ isOpen, onRequestClose, onConfirm, text }) => {
  return (
    <verifyModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <confirmDialog onConfirm={onConfirm} onCancel={onRequestClose} text={text} />
    </verifyModal>
  );
};

export default verify;

```