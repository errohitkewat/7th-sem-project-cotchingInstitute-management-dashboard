import { Router } from "express";
import { overview } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

export const dashboardRouter = Router();

dashboardRouter.get("/overview", authenticate, overview);
