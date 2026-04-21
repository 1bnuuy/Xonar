"use client";

import { useReducer } from "react";

import Login from "./login";
import Register from "./register";
import { AuthReducer, InitialAuth } from "./var";

export default function Auth() {
  const [auth, disAuth] = useReducer(AuthReducer, InitialAuth);

  return (
    <section className="bg-primary relative flex h-dvh w-full items-center justify-between max-sm:px-4">
      <div className="z-20 flex size-full items-center justify-center sm:pl-10">
        {auth.type === "REGISTER" ? (
          <Register auth={auth} disAuth={disAuth}/>
        ) : (
          <Login auth={auth} disAuth={disAuth}/>
        )}
      </div>

      <button
        className="bg-accent absolute -bottom-35 size-70! cursor-pointer rounded-full"
        onClick={() => disAuth({ type: "SWITCH" })}
      >
        {auth.type}
      </button>

      <Svg />
    </section>
  );
}

const Svg = () => {
  return (
    <svg viewBox="0 0 566 840" className="z-0 hidden h-full shrink-0 sm:block">
      <mask id="mask0" maskUnits="userSpaceOnUse">
        <path
          d="M420,0 
            C380,120 300,80 260,140
            C200,240 320,300 260,420
            C200,540 120,520 100,650
            C80,760 140,820 0,840
            L566,840 
            L566,0 
            Z"
          fill="white"
        />
      </mask>

      <g mask="url(#mask0)">
        <rect width="566" height="840" fill="black" />
        <image
          href="/riverr.jpg"
          width="566"
          height="840"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    </svg>
  );
};
