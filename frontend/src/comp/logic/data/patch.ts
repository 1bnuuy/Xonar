import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, TOAST_DELAY, QUERY_KEYS } from "../key";
import { clientReload } from "../client";
import { DataType, PatchType } from "../type";

import { useToast } from "@/comp/toast/main";

export const usePatch = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.PATCH,
    mutationFn: async ({
      id: { id: trackId },
      fS,
    }: {
      id: PatchType;
      fS: DataType;
    }) => {
      const res = await clientReload({
        url: `${API_URL}/data/${trackId}`,
        options: { method: "PATCH" },
      });

      if (!res.ok) {
        const errorBody = await res.json();

        throw new Error(errorBody.message);
      }

      return await res.json();
    },

    onMutate: (vars) => {
      const { fS } = vars;

      TOAST({
        state: "INFO",
        message: `Adding ${fS.title.length > 12 ? `${fS.title.substring(0, 12)}...` : fS.title} to your favorites...`,
      });
    },

    onSuccess: (_res, vars) => {
      const { fS } = vars;

      TOAST({
        state: "SUCCESS",
        message: `Added ${fS.title.length > 15 ? `${fS.title.substring(0, 15)}...` : fS.title} to your favorites`,
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH });
    },

    onError: (err) => {
      setTimeout(() => {
        TOAST({
          state: "ERROR",
          message:
            err instanceof Error
              ? err.message
              : "Encountered an error while trying to alter data",
        });
      }, TOAST_DELAY);
    },
  });
};
