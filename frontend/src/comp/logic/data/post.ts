import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_URL, TOAST_DELAY, QUERY_KEYS } from "../key";
import { clientReload } from "../client";
import { PostType } from "../type";
import { useToast } from "@/comp/toast/main";

export const usePost = () => {
  const queryClient = useQueryClient();
  const { TOAST } = useToast();

  return useMutation({
    mutationKey: QUERY_KEYS.POST,
    mutationFn: async ({ cover, title, artist, file }: PostType) => {
      const formData = new FormData();
      const track = { cover, title, artist };

      formData.append(
        "track",
        new Blob([JSON.stringify(track)], { type: "application/json" }),
      );
      formData.append("image", cover);
      formData.append("file", file);

      const res = await clientReload({
        url: `${API_URL}/data`,
        options: {
          method: "POST",
          body: formData,
        },
      });

      if (!res.ok) {
        const errorBody = await res.json();

        throw new Error(errorBody.message);
      }

      return await res.json();
    },
    onMutate: (vars) => {
      const { title } = vars;

      TOAST({
        state: "INFO",
        message: `Creating track ${title.length > 15 ? `${title.substring(0, 15)}...` : title}...`,
      });
    },

    onSuccess: (_res, vars) => {
      const { title } = vars;

      TOAST({
        state: "SUCCESS",
        message: `Track ${title.length > 15 ? `${title.substring(0, 15)}...` : title} has been created`,
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
              : "Encountered an error while creating tracks",
        });
      }, TOAST_DELAY);
    },
  });
};
