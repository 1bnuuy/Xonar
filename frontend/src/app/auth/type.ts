export type InitialAuthType = {
  type: "REGISTER" | "LOGIN";
  email: string;
  password: string;
  confirm: string;
};

export type AuthType = {
  auth: InitialAuthType
  disAuth: React.Dispatch<AuthActionType>
}

export type AuthActionType =
  | { type: "SWITCH" }
  | { type: "EMAIL"; payload: string }
  | { type: "PASSWORD"; payload: string }
  | { type: "CONFIRM_PASSWORD"; payload: string };

export type AuthInputType = {
  auth: InitialAuthType
  disAuth: React.Dispatch<AuthActionType>
  type: "EMAIL" | "PASSWORD"
}
