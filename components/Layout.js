import React, { useEffect, useState } from "react";
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
  };

  const logout = async () => {
    try {
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
    </div>
  );
}
