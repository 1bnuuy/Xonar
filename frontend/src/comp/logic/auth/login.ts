import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, HREF_DELAY, QUERY_KEYS, TOAST_DELAY } from "../key";
import { LoginType } from "../type";
import { useToast } from "@/comp/toast/main";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.LOGIN,
    mutationFn: async ({ email, password }: LoginType) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorBody = await res.json();

        throw new Error(errorBody.message);
      }

      const result = await res.json();

      if (result && result.accessToken)
        localStorage.setItem("token", result.accessToken);
      else console.warn("No token");

      return result;
    },

    onSuccess: (_res, vars) => {
      const { email } = vars;

      setTimeout(() => {
        TOAST({
          state: "SUCCESS",
          message: `Yo ${email.split("@")[0]}`,
        });
      }, TOAST_DELAY);

      setTimeout(() => {
        window.location.href = "/";
      }, HREF_DELAY);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH });
    },
    
    onError: (err) => {
      setTimeout(() => {
        TOAST({
          state: "ERROR",
          message:
            err instanceof Error
              ? err.message
              : "Authentication encountered an error",
        });
      }, TOAST_DELAY);
    },
  });
};
