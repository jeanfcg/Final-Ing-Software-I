// Time.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Time({ time = 10 }) {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      logout();
      router.push("/");
    }
  }, [remainingTime]);

  const logout = async () => {
    try {
      await axios.post("api/authentication/logout");
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  // Format the time in HH:mm:ss format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return <div>{formatTime(remainingTime)}</div>;
}
