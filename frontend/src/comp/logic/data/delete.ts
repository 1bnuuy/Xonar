import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, QUERY_KEYS, TOAST_DELAY } from "../key";
import { clientReload } from "../client";
import { DataType, DeleteType } from "../type";

import { useToast } from "@/comp/toast/main";

export const useDelete = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.DELETE,
    mutationFn: async ({
      id: { id: trackId },
      fS,
    }: {
      id: DeleteType;
      fS: DataType;
    }) => {
      const res = await clientReload({
        url: `${API_URL}/data/${trackId}`,
        options: { method: "DELETE" },
      });

      if (!res.ok) {
        const errorBody = await res.json();

        throw new Error(errorBody.message);
      }

      return res.status === 204 ? null : await res.json();
    },

    onMutate: (vars) => {
      const { fS } = vars;

      TOAST({
        state: "INFO",
        message: `Removing ${fS.title.length > 12 ? `${fS.title.substring(0, 12)}...` : fS.title} from your collection...`,
      });
    },

    onSuccess: (_res, vars) => {
      // _id is returned from server, vars is the argument sent in
      const { fS } = vars;

      setTimeout(() => {
        TOAST({
          state: "SUCCESS",
          message: `Removed ${fS.title.length > 15 ? `${fS.title.substring(0, 15)}...` : fS.title} from your collection`,
        });
      }, TOAST_DELAY);

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH });
    },

    onError: (err) => {
      setTimeout(() => {
        TOAST({
          state: "ERROR",
          message:
            err instanceof Error
              ? err.message
              : "Encountered an error while trying to delete",
        });
      }, TOAST_DELAY);
    },
  });
};
