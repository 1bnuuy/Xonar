import { API_URL } from "./api";
import { RegisterType } from "./type";

export const REGISTER = async ({ username, password }: RegisterType) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error(`Status ${res.status} - ${await res.text()}`); //res.text is async
    }

    const result = await res.json();

    if (result && result.token) {
      localStorage.setItem("token", result.token);
      console.log(localStorage.getItem("token"));

      return result;
      
    } else {
      console.warn("No token");
      return result;
    }
    
  } catch (err) {
    console.error(err);
  }
};
