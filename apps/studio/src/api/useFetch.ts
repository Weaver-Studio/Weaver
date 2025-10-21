import axios from "axios";

const baseURL = import.meta.env.VITE_CONVEX_SITE_URL;

type methodtypes = "GET" | "POST" | "PUT" | "DELETE";
type fetchOptions<T> = {
  token: string;
  method: methodtypes;
  path: string;
  body?: T;
};
export const customFetch = <T>(options: fetchOptions<T>) =>
  fetch(`${baseURL}/${options.path}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
