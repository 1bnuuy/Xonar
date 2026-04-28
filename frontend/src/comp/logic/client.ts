import { API_URL } from "./key";
import { ClientReloadType } from "./type";

export const clientReload = async ({ url, options = {} }: ClientReloadType) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401 || res.status === 403) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    const { accessToken: newToken, message } = await refreshRes.json();
    console.log(message);

    if (refreshRes.ok) {
      localStorage.setItem("token", newToken);

      return await fetch(url, {
        ...options,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
      });
    } else {
      localStorage.clear();
      
      throw new Error(message);
    }
  }

  return res;
};
