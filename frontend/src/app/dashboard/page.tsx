"use client";

import { useLogout } from "@/comp/logic/auth/logout";
import { useData } from "@/comp/logic/get";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const { email } = useData();
  const { mutate } = useLogout();

  const Logout = () => {
    mutate(undefined);
  };

  return (
    <section className="content relative flex h-dvh w-full flex-col items-center gap-y-10 overflow-hidden">
      <div className="bg-tertiary flex w-full items-center justify-around gap-x-4 rounded-md px-6 py-8">
        <div className="flex w-full shrink-0 basis-[calc(50%-8px)] flex-col gap-y-2">
          <p className="text-subtext">Your most listened song</p>
          <h4 className="text-2xl font-semibold md:text-3xl">Blazing Soul</h4>
          <p className="md:text-lg">Pee and Poo</p>
          <button className="bg-accent text-contrast-II flex w-fit cursor-pointer items-center justify-center gap-x-2 rounded-md px-6 py-2 text-lg font-semibold">
            <FontAwesomeIcon icon={faPlay} />
            <span>Play Again</span>
          </button>
        </div>

        <div className="bg-muted shrink-0 basis-[calc(50%-8px)]">
          <p>Your most listened song</p>
        </div>
      </div>

      <span>{`Hi, ${email}!`}</span>
      <button
        onClick={Logout}
        className="bg-accent text-contrast-II cursor-pointer rounded-md px-4 py-1"
      >
        Logout
      </button>
    </section>
  );
}
