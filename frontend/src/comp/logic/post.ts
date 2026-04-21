import { API_URL } from "./api";
import { PostType } from "./type";

export const POST = async ({ cover, title, artist, fileURL }: PostType) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  try {
    const res = await fetch(`${API_URL}/data`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        cover,
        title,
        artist,
        fileURL,
      }),
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status} - ${await res.text()}`); //res.text is async
    }

    return await res.json();
    
  } catch (err) {
    console.error(err);
  }
};
