"use client";

import { useMemo, useReducer } from "react";

import { Card } from "./card";
import { InitialMusic, musicInfo, MusicReducer } from "./var";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const [state, dispatch] = useReducer(MusicReducer, InitialMusic);

  const filteredSongs = useMemo(() => {
    return state.song.filter((item) => {
      return item.name?.toLowerCase().includes(state.search.toLowerCase());
    });
  }, [state.song, state.search]);
  return (
    <section className="content flex justify-center items-center flex-col gap-[45px]">
      <div className="w-full">
        <div className="relative w-full">
          <input
            placeholder="Search..."
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SEARCH", payload: e.target.value })
            }
            type="text"
            className="placeholder:text-gray-500 bg-tertiary text-contrast w-full outline-none px-3"
          />

          <span className="border-2 border-r-0 h-full w-4 absolute left-0 border-contrast"/>
          <span className="border-2 border-l-0 h-full w-4 absolute right-0 border-contrast"/>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-1 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div>
        {musicInfo.map((a) => {
          return <Card key={a.id} id={a.id} name={a.name} author={a.author} />;
        })}
      </div>
    </section>
  );
}
