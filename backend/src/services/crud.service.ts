import type { PrismaClient } from "@prisma/client";
import { prisma } from "../config/prisma.js";

type ModelName = keyof {
  [K in keyof PrismaClient as PrismaClient[K] extends { findMany: Function } ? K : never]: true;
};

export const createCrudService = (modelName: ModelName, include?: Record<string, unknown>) => {
  const model = prisma[modelName] as any;

  return {
    list: (args: Record<string, unknown> = {}) => model.findMany({ ...args, include, orderBy: { createdAt: "desc" } }),
    count: (where?: Record<string, unknown>) => model.count({ where }),
    get: (id: string) => model.findUnique({ where: { id }, include }),
    create: (data: Record<string, unknown>) => model.create({ data, include }),
    update: (id: string, data: Record<string, unknown>) => model.update({ where: { id }, data, include }),
    remove: (id: string) => model.delete({ where: { id } })
  };
};
