import { API_URL } from "./api";
import { DeleteType } from "./type";

export const DELETE = async ({ id, ...updates }: DeleteType) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const res = await fetch(`${API_URL}/data/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status} - ${await res.text()}`);
    }

    if (res.status === 204) return null;

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
