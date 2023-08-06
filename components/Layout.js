import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Verify from "@/ldavis/Componentes/Verify";
import ProfileService from "./profileService";
import HttpService from "./httpService";

export default function Layout({ children, pagina, time = 10 }) 
{
  const router = useRouter();
  const [username, setUsername] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Go Forth (Aquí inicia)
  // Efecto secundario para obtener el perfil del usuario al montar el componente.
  useEffect(() => {
    loadProfile();
  }, []);
  // Go Forth (Termina Aquí)

  const loadProfile = async () => {
    // Obtenemos el perfil del usuario utilizando ProfileService
    const username = await ProfileService.getProfile();
    setUsername(username);
  };

  const logout = async () => {
    try {
      // Hacemos una solicitud POST a la API para cerrar la sesión del usuario.
      const res = await HttpService.post("api/auth/logout"); // Utilizamos HttpService en lugar de axios
      router.push("/"); // Redirigimos a la página de inicio después de cerrar sesión exitosamente.
    } 
    catch (err) 
    {
      console.log(err);
      router.push("/"); // En caso de error, también redirigimos a la página de inicio.
    }
  };

  return (
    <div>
      <h1>Header</h1>
      <Head>
        <title>{pagina}</title>
      </Head>
      <div>
        <div>{username}</div>
      </div>
      <Verify
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={logout}
        text={"Estas seguro de cerrar sesión?"}
      />
      <button onClick={() => setIsOpen(true)}>Logout</button>
      {children}
      <h1>FOOOOOTEER</h1>
    </div>
  );
}
