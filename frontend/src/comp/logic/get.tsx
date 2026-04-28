"use client";

import { createContext, useContext, useMemo } from "react";

import { DataContextType } from "./type";
import { API_URL, QUERY_KEYS } from "./key";
import { clientReload } from "./client";

import { useQuery } from "@tanstack/react-query";

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
  // useQuery() hook executes its queryFn the moment the component mounts (no manual useEffect() uh huh)

  const {
    data: auth,
    isLoading: authLoading,
    refetch: authRefetch,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH,
    queryFn: async () => {
      const res = await clientReload({
        url: `${API_URL}/dashboard`,
        options: { credentials: "include" },
      });

      if (!res.ok) throw new Error("Unauthorized");

      return await res.json();
    },
    retry: false,
  });

  const isAuthenticated = !!auth;

  const {
    data: rawData,
    isLoading: dataLoading,
    refetch: dataRefetch,
  } = useQuery({
    queryKey: QUERY_KEYS.DATA,
    queryFn: async () => {
      const res = await clientReload({
        url: `${API_URL}/data`,
        options: { credentials: "include" },
      });

      if (!res.ok) throw new Error("Fetch failed");

      const json = await res.json();

      return Array.isArray(json) ? json : [json];
    },
    retry: false,
  });

  const FETCH = async () => {
    const authResult = await authRefetch();
    if (authResult.data) await dataRefetch();
  };

  const value = useMemo(
    () => ({
      data: rawData || [],
      FETCH,
      loading: authLoading || (isAuthenticated && dataLoading),
      authenticated: isAuthenticated,
      email: auth?.email || "",
    }),
    [auth, rawData, authLoading, dataLoading, isAuthenticated],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
