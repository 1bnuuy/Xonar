import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, HREF_DELAY, QUERY_KEYS, TOAST_DELAY } from "../key";
import { RegisterType } from "../type";

import { useToast } from "@/comp/toast/main";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.REGISTER,
    mutationFn: async ({ email, password }: RegisterType) => {
      const res = await fetch(`${API_URL}/auth/register`, {
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

      return await res.json();
    },

    onMutate: () => {
      TOAST({
        state: "INFO",
        message: "Creating a new account for you...",
      });
    },

    onSuccess: (_res, vars) => {
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
              : "Encountered an error while signing in",
        });
      }, TOAST_DELAY);
    },
  });
};
