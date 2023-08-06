Alumno: Aldo Raul Martinez Choque

Principios SOLID que fueron aplicados para pages/index.js:

- Principio de responsabilidad única (SRP): divida el componente en componentes más pequeños y enfocados para una mejor organización del código.
```bash
// Single Responsibility Principle: Create a CandidateRow component
const CandidateRow = ({ candidate }) => {
  const { nombre, apellido, cargo, nombre_partido } = candidate;
  return (...
```
- Principio abierto/cerrado (OCP): haga que el componente se abra para la extensión y se cierre para la modificación mediante el uso de accesorios para personalizar el comportamiento.
```bash
// Open/Closed Principle: The Table component can be extended and customized with props.
const Table = ({ data }) => {
  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cargo</th>
          <th>Partido</th>
          <th>Logo</th>
        </tr>
      </thead>
      <tbody>
        {data.map((candidate, index) => (
          <CandidateRow key={index} candidate={candidate} />
        ))}
      </tbody>
    </table>
  );
};
```
- Evitar el renderizado condicional: en lugar de verificar si candidatos.length > 0se decide renderizar la tabla o "Vacio", rendericemos condicionalmente un Tablecomponente separado si hay candidatos, y un mensaje "Vacio" si no hay ninguno.
- Manejo de errores: Maneje el caso de error al obtener candidatos de la API.
```bash
  const getCandidatos = async () => {
    try {
      const res = await axios.get(`/api/candidatos/?page=${page}&pageSize=${pageSize}`);
      const data = res.data[0].sort((a, b) => a.nombre_partido.localeCompare(b.nombre_partido));
      setCandidatos((prevCandidatos) => [...prevCandidatos, ...data]);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      // TODO: Handle the error state, show an error message, or retry the API call.
    }
  };
```

