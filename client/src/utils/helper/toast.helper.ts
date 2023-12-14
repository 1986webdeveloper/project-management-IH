import { toast } from "react-toastify";

export const successToastHelper = (message: string) => {
  toast(message ? message : "Success", {
    type: "success",
    position: "top-center",
  });
};

export const errorToastHelper = (error: string) => {
  toast(error ? error : "Request not processed", {
    type: "error",
    position: "top-center",
  });
};
