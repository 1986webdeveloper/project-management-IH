/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "./token.helper";

export const RequestHelper = (
  method: "GET" | "POST" | "PUT",
  url: string,
  options?: { payload?: any; token?: string },
) => {
  const obj: any = {
    method: method,
    url: url,
    headers: {},
  };

  if (method === "POST" || method === "PUT") {
    obj.data = options?.payload;
  }

  if (method === "GET" || method === "PUT" || method === "POST") {
    obj.headers.Authorization = `Bearer ${options?.token ?? getToken()}`;
  }

  return obj;
};
