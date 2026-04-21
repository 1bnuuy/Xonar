"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";

import { REGISTER } from "@/comp/logic/register";

import { AuthInputType, AuthType } from "./type";

export default function Register({ auth, disAuth }: AuthType) {
  const email = auth.email.trim();
  const password = auth.password.trim();

  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      <h2 className="text-3xl font-semibold text-nowrap sm:text-4xl">
        Create an{" "}
        <span className="text-accent relative z-20 px-2">
          account
          <span className="bg-tertiary absolute -bottom-1 left-1/2 -z-10 h-1/2 w-full -translate-x-1/2 -rotate-2" />
        </span>
      </h2>

      <form
      autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();

          if (!email || !password) {
            console.error("Registeration fields can't be blank");
            return;
          }

          REGISTER({ username: email, password: password });
        }}
        className="flex w-11/12 max-w-[500px] min-w-75 flex-col items-center justify-center gap-y-4"
      >
        <Input auth={auth} disAuth={disAuth} type="EMAIL" />
        <Input auth={auth} disAuth={disAuth} type="PASSWORD" />

        <button
          type="submit"
          className="bg-accent text-contrast-II w-full rounded-md py-2 text-lg font-semibold"
        >
          Create
        </button>
      </form>

      <button
        type="button"
        onClick={() => console.log(localStorage.getItem("token"))}
      >
        Get token
      </button>
    </div>
  );
}

const Input = ({ auth, disAuth, type }: AuthInputType) => {
  return (
    <div className="bg-tertiary relative flex h-[45px] w-full items-center gap-x-4 overflow-hidden rounded-md px-3">
      <input
        autoComplete="off"
        required
        onChange={(e) =>
          disAuth({
            type: type,
            payload: e.target.value,
          })
        }
        type={type === "EMAIL" ? "email" : "password"}
        value={type === "EMAIL" ? auth.email : auth.password}
        placeholder={type === "EMAIL" ? "Email" : "Password"}
        className="placeholder:text-subtext size-full outline-none"
      />

      <FontAwesomeIcon
        icon={type === "EMAIL" ? faEnvelope : faEye}
        className="text-subtext text-xl"
      />
    </div>
  );
};
