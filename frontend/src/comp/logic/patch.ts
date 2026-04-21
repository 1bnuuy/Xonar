import { API_URL } from "./api";
import { PatchType } from "./type";

//This destructure the id while collecting the rest as "updates" (title, artist,...)
export const PATCH = async ({ id, ...updates }: PatchType) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const res = await fetch(`${API_URL}/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status} - ${await res.text()}`);
    }

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
