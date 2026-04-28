"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye } from "@fortawesome/free-regular-svg-icons";

import { AuthInputType, AuthType } from "./type";

import { useLogin } from "@/comp/logic/auth/login";
import { LoginType } from "@/comp/logic/type";

export default function Login({ auth, disAuth }: AuthType) {
  const { mutate } = useLogin();

  const email = auth.email;
  const password = auth.password;

  const Login = ({ email, password }: LoginType) => {
    mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-6">
      <h2 className="text-3xl font-semibold text-nowrap sm:text-4xl">
        Welcome{" "}
        <span className="text-accent relative z-20 px-2">
          back
          <span className="bg-tertiary absolute -bottom-1 left-1/2 -z-10 h-1/2 w-full -translate-x-1/2 -rotate-2" />
        </span>
      </h2>

      <form
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();

          Login({ email: email.trim(), password: password.trim() });
        }}
        className="flex w-11/12 max-w-125 min-w-75 flex-col items-center justify-center gap-y-4"
      >
        <Input auth={auth} disAuth={disAuth} type="EMAIL" />
        <Input auth={auth} disAuth={disAuth} type="PASSWORD" />

        <button
          type="submit"
          className="bg-accent text-contrast-II w-full cursor-pointer rounded-md py-2 text-lg font-semibold"
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
    <div className="bg-tertiary relative flex h-11.25 w-full items-center gap-x-4 overflow-hidden rounded-md px-3">
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
