import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

// Single Responsibility Principle: Crear el componente CandidateRow
const CandidateRow = ({ candidate }) => {
  const { nombre, apellido, cargo, nombre_partido } = candidate;
  return (
    <tr>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{cargo}</td>
      <td>{nombre_partido}</td>
      <td>
        <img
          src={`/partidos/${nombre_partido}.png`}
          alt={'Cargando'}
          style={{ width: '100px', height: '100px' }}
        />
      </td>
    </tr>
  );
};

// Open/Closed Principle: El componente Table se puede ampliar y personalizar con accesorios.
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

export default function IndexPage() {
  const [candidatos, setCandidatos] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getCandidatos();
  }, [page]);

  const getCandidatos = async () => {
    try {
      const res = await axios.get(`/api/candidatos/?page=${page}&pageSize=${pageSize}`);
      const data = res.data[0].sort((a, b) => a.nombre_partido.localeCompare(b.nombre_partido));
      setCandidatos((prevCandidatos) => [...prevCandidatos, ...data]);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      // TODO: Maneje el estado de error, muestre un mensaje de error o vuelva a intentar la llamada a la API.
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container mt-5">
        <div>Bienvenido</div>
        {/* SOLID - Conditional Rendering */}
        {candidatos.length > 0 ? (
          <Table data={candidatos.filter((c) => c.nombre_partido !== 'Nulo' && c.cargo === 'Presidente')} />
        ) : (
          <div>Vacio</div>
        )}
        <div className="mt-3">
          <Link href="/login">Iniciar sesion</Link>
        </div>
        <div>
          <Link href="/new">Registrarse</Link>
        </div>
      </div>
    </>
  );
}
