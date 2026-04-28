import MP3Tag from "mp3tag.js";

import { CancelHandlerType, UploadHandlerType } from "../../app/_/type";

export const UploadHandler = async ({
  file,
  disUtility,
}: UploadHandlerType) => {
  if (file.size > 10 * 1024 * 1024) {
    console.warn("Max file size limit is 10MB");

    return;
  }

  const buffer = await file.arrayBuffer();

  const tag = new MP3Tag(buffer);
  tag.read();

  const title = tag.tags.title || file.name.replace(/\.[^/.]+$/, "");
  const artist = tag.tags.artist || "Unknown";

  disUtility({
    type: "UPLOAD",
    payload: {
      coverURL: "/Pee.webp",
      title: title,
      artist: artist,
    },
  });

  disUtility({
    type: "SELECT_FILE",
    payload: file,
  });
};

export const CancelHandler = ({ disUtility, input }: CancelHandlerType) => {
  disUtility({ type: "RESET" });

  if (input.current) {
    input.current.value = "";
  }
};
