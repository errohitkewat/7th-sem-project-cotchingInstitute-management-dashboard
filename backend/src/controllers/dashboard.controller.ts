import type { RequestHandler } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { send } from "../utils/http.js";

export const overview: RequestHandler = async (_req, res, next) => {
  try {
    send(res, await dashboardService.overview());
  } catch (error) {
    next(error);
  }
};
