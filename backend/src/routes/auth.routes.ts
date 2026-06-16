import { Router } from "express";
import { forgotPassword, login, me, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { forgotPasswordSchema, loginSchema, registerSchema } from "../validators/auth.validators.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
authRouter.get("/me", authenticate, me);
