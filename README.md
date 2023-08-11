Alumno: Randú Jean Franco Cerpa García

## Estilos de Programación

### POO

Este código sigue un estilo de programación orientado a objetos, utilizando clases y métodos para crear objetos con atributos y comportamientos específicos.

```bash
class Person {
    constructor(id, name, lastName, username) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
    // Setters
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set username(value) {
        this._username = value;
    }
    // Getters
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get lastName() {
        return this._lastName;
    }

    get username() {
        return this._username;
    }
}
export default Person;
```
### Code-golf

En este código se está utilizando el estilo de programación code-golf, se utilizan tan pocas líneas como sean posibles sin modificar la funcionalidad del código.

```bash
import Person from "@/ldavis/domain/models/Person";
class Admin extends Person {
    constructor(id, name, lastName, username, job) {
        super(id, name, lastName, username, job);
        this.job = job;
    }
    // También podemos agregar getters y setters específicos para el atributo "email" si es necesario
    get job() {
        return this._job;
    }
    set job(value) {
        this._job = value;
    }
}
export default Admin;
```

### Programación modular

este código sigue un estilo de programación modular de JavaScript, utilizando el módulo mysql2/promise para crear una piscina de conexiones a una base de datos MySQL. La piscina de conexiones ayuda a administrar y reutilizar conexiones a la base de datos de manera eficiente. Luego, exportas la piscina de conexiones (pool) para que pueda ser utilizada en otros módulos de tu aplicación.

```bash
import { createPool } from "mysql2/promise";
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "bananas_corp",
});

export { pool };
```

## Prácticas Codificación legible

### Comment Rules
Código con Comentarios (public/bananas_corp.sql)

```bash
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `cargo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `cargo`) VALUES
(3, 'Gerente de Sistemas ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `candidato`
--

DROP TABLE IF EXISTS `candidato`;
CREATE TABLE `candidato` (
  `id` int(11) NOT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `id_partido` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `candidato`
--

INSERT INTO `candidato` (`id`, `cargo`, `id_partido`) VALUES
(1, 'Presidente', 1),
(4, 'Presidente', 2),
(5, 'vicePresidente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `electores`
--

DROP TABLE IF EXISTS `electores`;
CREATE TABLE `electores` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
### Limit Line Length y Uso de Identación

Límite de caracteres por línea y uso de sangría en el código (domains/models/Person.j)

```bash
class Person {
    constructor(id, name, lastName, username) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
    // Setters
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set lastName(value) {
        this._lastName = value;
    }
    set username(value) {
        this._username = value;
    }
```

### Names Rules

se utilizo el tipo de nomenclatura camelCase (domains/models/Person.j)

```bash
class ResultVote {
    constructor(id, politicalParty, president, numVotes) {
        this._id = id;
        this._politicalParty = politicalParty;
        this._president = president;
        this._numVotes = numVotes;
    }
```

## Principios Solid

### Interface Segregation Principle (ISP)

Este principio establece que los clientes no deberían verse forzados a depender de interfaces que no usan.

```bash
class Person {
    constructor(id, name, lastName, username) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
    }
```
toda persona se construye con estos 4 atributos.

```bash
import Person from "@/ldavis/domain/models/Person";

class Candidate extends Person{
    constructor(id, name, lastName, username, job , politicalParty) {
        super(id, name, lastName, username, job);
        this.job = job;
        this.politicalParty = politicalParty;
    }
```
pero no toda persona tiene estos 2 atributos, por lo cual no se ve forzado a implementar atributos que algunos personas no darán uso.

### Single Responsibility Principle (SRP)

La clase PoliticalParty tiene la única responsabilidad y tarea de representar los datos de un partido político, incluido su ID y nombre.

```bash
class PoliticalParty {
    constructor(id, politicalParty) {
        this._id = id;
        this._politicalParty = politicalParty;
    }
```

