"use client";

import { AuthType } from "./type";

export default function Login({ auth, disAuth }: AuthType) {
  return (
    <div
      className="flex items-center justify-center"
    >
      <div className="bg-accent h-150 w-full max-w-[500px] min-w-75">Login</div>
    </div>
  );
}
