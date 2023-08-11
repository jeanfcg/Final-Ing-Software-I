import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from "next/link";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/authentication/login", credentials);
      console.log(res)

      if (res.status === 200) {
        if (res.data.userType === 1) {
          router.push("/votacion");
        } else if (res.data.userType === 2) {
          router.push("/resultado");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            onChange={handleChange}
            value={credentials.username}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
