import { api, unwrap } from "./api";
import type { Paginated } from "../types";

export const listResource = <T>(resource: string, search = "", page = 1) =>
  unwrap<Paginated<T>>(api.get(`/api/${resource}`, { params: { search, page, limit: 10 } }));

export const getResource = <T>(resource: string, id: string) => unwrap<T>(api.get(`/api/${resource}/${id}`));

export const createResource = <T>(resource: string, payload: unknown) => unwrap<T>(api.post(`/api/${resource}`, payload));

export const updateResource = <T>(resource: string, id: string, payload: unknown) =>
  unwrap<T>(api.put(`/api/${resource}/${id}`, payload));

export const deleteResource = (resource: string, id: string) => unwrap<{ success: boolean }>(api.delete(`/api/${resource}/${id}`));
