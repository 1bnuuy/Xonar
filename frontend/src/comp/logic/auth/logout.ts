import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, HREF_DELAY, QUERY_KEYS, TOAST_DELAY } from "../key";
import { clientReload } from "../client";

import { useToast } from "@/comp/toast/main";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.LOGOUT,
    mutationFn: async () => {
      const res = await clientReload({
        url: `${API_URL}/auth/logout`,
        options: {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        },
      });

      if (!res.ok) {
        const errorBody = await res.json();

        throw new Error(errorBody.message);
      }

      return;
    },

    onMutate: () => {
      TOAST({
        state: "INFO",
        message: "Logging out...",
      });
    },

    onSuccess: () => {
      setTimeout(() => {
        TOAST({
          state: "SUCCESS",
          message: "Logged out successfully, you are free to go!",
        });
      }, TOAST_DELAY);
    },

    onError: (err) => {
      setTimeout(() => {
        TOAST({
          state: "ERROR",
          message:
            err instanceof Error
              ? err.message
              : "Encountered an error while logging out",
        });
      }, TOAST_DELAY);
    },

    onSettled: () => {
      localStorage.clear();
      queryClient.clear();

      setTimeout(() => {
        window.location.href = "/auth";
      }, HREF_DELAY);
    },
  });
};
