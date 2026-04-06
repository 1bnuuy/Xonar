import MP3Tag from "mp3tag.js";
import { CancelHandlerType, UploadHandlerType } from "./type";

export const UploadHandler = async ({
  file,
  disUtility,
}: UploadHandlerType) => {
  const buffer = await file.arrayBuffer();

  const tag = new MP3Tag(buffer);
  tag.read();

  const title = tag.tags.title || file.name.replace(/\.[^/.]+$/, "");

  disUtility({
    type: "UPLOAD",
    payload: { title: title, artist: tag.tags.artist },
  });
};

export const CancelHandler = ({ disUtility, input }: CancelHandlerType) => {
  disUtility({ type: "RESET" });

  if (input.current) {
    input.current.value = "";
  }
};
