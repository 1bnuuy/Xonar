"use client";

import { useData } from "@/comp/logic/get";

export default function Profile() {
  const { username } = useData();

  return <div>{`Hi, ${username}!`}</div>;
}
