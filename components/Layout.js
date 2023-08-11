import React, { useEffect, useState } from "react";
<<<<<<< LeonDavis
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Verify from "@/ldavis/components/Verify";
export default function Layout({ children, pageTitle, time = 10 }) {
  const router = useRouter();
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get("/api/profile");
      setUsername(res.data.username);
    } catch (error) {
      console.log(error);
    }
=======
import { useRouter } from "next/router";
import Head from "next/head";
import verify from "./verify";
import profileService from "./profileService";
import httpService from "./httpService";

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
    // Obtenemos el perfil del usuario utilizando profileService
    const username = await profileService.getProfile();
    setUsername(username);
>>>>>>> main
  };

  const logout = async () => {
    try {
<<<<<<< LeonDavis
      await axios.post("api/authentication/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-light">
      {username && (
        <div className="container p-4">
          <div className="bg-warning p-3 mb-3 rounded d-flex justify-content-between align-items-center">
            <div>
              <span className="home-link">
                <Link href="/">Home</Link>
              </span>
              <Head>
                <title>{pageTitle}</title>
              </Head>
              <div className="fs-4 text-secondary">{username}</div>
            </div>
            <div>
              <Verify
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                onConfirm={logout}
                text={"Estas seguro de cerrar sesión?"}
              />
              <button
                onClick={() => setIsOpen(true)}
                className="btn btn-danger ms-2"
              >
                Logout
              </button>
            </div>
          </div>
          {children}
          <div className="bg-warning p-3 mb-3 rounded d-flex justify-content-between align-items-center">
            <h1>Footer</h1>
          </div>
        </div>
      )}
=======
      // Hacemos una solicitud POST a la API para cerrar la sesión del usuario.
      const res = await httpService.post("api/auth/logout"); // Utilizamos httpService en lugar de axios
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
      <verify
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onConfirm={logout}
        text={"Estas seguro de cerrar sesión?"}
      />
      <button onClick={() => setIsOpen(true)}>Logout</button>
      {children}
      <h1>FOOOOOTEER</h1>
>>>>>>> main
    </div>
  );
}
