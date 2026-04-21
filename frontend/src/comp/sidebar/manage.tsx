import MP3Tag from "mp3tag.js";

import { CancelHandlerType, UploadHandlerType } from "../../app/_/type";

export const UploadHandler = async ({
  file,
  disUtility,
}: UploadHandlerType) => {
  const buffer = await file.arrayBuffer();

  const tag = new MP3Tag(buffer);
  tag.read();

  const title = tag.tags.title || file.name.replace(/\.[^/.]+$/, "");
  const artist = tag.tags.artist || "Unknown";

  let imageBase64 = null;
  const apic = tag.tags.v2?.APIC;

  if (apic && apic.length > 0) {
    const imageData = apic[0].data; // Front cover
    const format = apic[0].format; // Either image/jpeg or image/png

    const uint8Data = new Uint8Array(imageData);

    const blob = new Blob([uint8Data], { type: format });

    imageBase64 = URL.createObjectURL(blob);
  }

  disUtility({
    type: "UPLOAD",
    payload: {
      cover: imageBase64 || "/Pee.webp",
      title: title,
      artist: artist,
    },
  });
};

export const CancelHandler = ({ disUtility, input }: CancelHandlerType) => {
  disUtility({ type: "RESET" });

  if (input.current) {
    input.current.value = "";
  }
};
