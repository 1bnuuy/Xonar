import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons";

export const links = [
  {
    icon: faCirclePlay,
    title: "My Music",
    path: "/",
  },

  {
    icon: faHeart,
    title: "Favorited",
    path: "/favorited",
  },

  {
    icon: faLayerGroup,
    title: "Playlist",
    path: "/playlist",
  },
];
