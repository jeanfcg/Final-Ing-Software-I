// Archivo Resultado.js
import React, { useEffect, useState } from "react";
import Layout from "@/ldavis/Componentes/Layout";
import ResultadoEleccion from "@/ldavis/Data/Repositorio/ResultadoEleccion";

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
      const res = await ResultadoEleccion.getResultados();
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
