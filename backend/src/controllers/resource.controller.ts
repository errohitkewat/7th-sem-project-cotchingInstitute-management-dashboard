import type { RequestHandler } from "express";
import { prisma } from "../config/prisma.js";
import { createCrudService } from "../services/crud.service.js";
import { AppError, send } from "../utils/http.js";

const searchable = (fields: string[], search?: string) =>
  search
    ? {
        OR: fields.map((field) => ({ [field]: { contains: search, mode: "insensitive" } }))
      }
    : undefined;

export const makeResourceController = (
  modelName: Parameters<typeof createCrudService>[0],
  searchFields: string[],
  include?: Record<string, unknown>
) => {
  const service = createCrudService(modelName, include);

  const list: RequestHandler = async (req, res, next) => {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);
      const where = searchable(searchFields, req.query.search?.toString());
      const [items, total] = await Promise.all([
        service.list({ where, skip: (page - 1) * limit, take: limit }),
        service.count(where)
      ]);
      send(res, { items, total, page, limit });
    } catch (error) {
      next(error);
    }
  };

  const get: RequestHandler = async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const item = await service.get(id);
      if (!item) throw new AppError(404, "Resource not found");
      send(res, item);
    } catch (error) {
      next(error);
    }
  };

  const create: RequestHandler = async (req, res, next) => {
    try {
      const item = await service.create(req.body);
      await prisma.activityLog.create({
        data: { userId: req.user?.id, action: "CREATED", entity: String(modelName), entityId: item.id }
      });
      send(res, item, 201);
    } catch (error) {
      next(error);
    }
  };

  const update: RequestHandler = async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const item = await service.update(id, req.body);
      await prisma.activityLog.create({
        data: { userId: req.user?.id, action: "UPDATED", entity: String(modelName), entityId: item.id }
      });
      send(res, item);
    } catch (error) {
      next(error);
    }
  };

  const remove: RequestHandler = async (req, res, next) => {
    try {
      const id = String(req.params.id);
      await service.remove(id);
      await prisma.activityLog.create({
        data: { userId: req.user?.id, action: "DELETED", entity: String(modelName), entityId: id }
      });
      send(res, { success: true });
    } catch (error) {
      next(error);
    }
  };

  return { list, get, create, update, remove };
};
