export type ToastContextType = {
  TOAST: (content: ToastContentType) => void;
};

export type ToastComponentType = (id: string) => React.ReactNode;

export type ToastType = {
  id: string;
  component: React.ReactNode;
  state: ToastStatusType
};

export type ToastContentType = {
  state: ToastStatusType
  message: string;
};

export type ToastStatusType = "SUCCESS" | "ERROR" | "INFO"