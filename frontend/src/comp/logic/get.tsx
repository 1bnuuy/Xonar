"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { DataContextType, DataType } from "./type";
import { API_URL } from "./api";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used inside DataProvider");

  return context;
};

export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const FETCH = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    const headers = {
      "Content-type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };

    try {
      const [resData, resAuth] = await Promise.all([
        fetch(`${API_URL}/data`, { headers: headers }),
        fetch(`${API_URL}/dashboard`, { headers: headers }),
      ]);

      if (resData.status === 401) {
        setAuthenticated(false);
        throw new Error("Unauthorized access");
      }

      if (!resData.ok || !resAuth.ok) {
        const dataErr = !resData.ok ? await resData.text() : "OK";
        const authErr = !resData.ok ? await resAuth.text() : "OK";

        console.error(`Data status: ${resData.status} - ${dataErr}`);
        console.error(`Auth status: ${resAuth.status} - ${authErr}`);

        throw new Error("Failed to fetch data or user details!");
      }

      const resultData = await resData.json();
      const resultAuth = await resAuth.json();

      setData(Array.isArray(resultData) ? resultData : [resultData]);
      setAuthenticated(true);
      setUsername(resultAuth.username);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FETCH();
  }, []);

  return (
    <DataContext.Provider
      value={{ data, FETCH, loading, authenticated, username }}
    >
      {children}
    </DataContext.Provider>
  );
}
