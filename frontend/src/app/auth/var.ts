import { AuthActionType, InitialAuthType } from "./type";

export const InitialAuth: InitialAuthType = {
  type: "REGISTER",
  email: "",
  password: "",
  confirm: "",
};

export const AuthReducer: (
  state: InitialAuthType,
  action: AuthActionType,
) => InitialAuthType = (state, action) => {
  switch (action.type) {
    case "SWITCH":
      return {
        ...state,
        type: state.type === "REGISTER" ? "LOGIN" : "REGISTER",
      };

    case "EMAIL":
      return { ...state, email: action.payload };

    case "PASSWORD":
      return { ...state, password: action.payload };

    case "CONFIRM_PASSWORD":
      return { ...state, confirm: action.payload };

    default:
      return state;
  }
};
