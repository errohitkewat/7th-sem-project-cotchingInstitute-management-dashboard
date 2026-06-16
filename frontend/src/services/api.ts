import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("edumanage_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const unwrap = <T>(promise: Promise<{ data: { data: T } }>) => promise.then((response) => response.data.data);
