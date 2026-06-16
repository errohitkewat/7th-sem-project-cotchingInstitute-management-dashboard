import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { authRouter } from "./routes/auth.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { resourceRouter } from "./routes/resource.routes.js";

export const app = express();

app.use(helmet());
const allowedOrigins = new Set([
  env.CLIENT_URL,
  env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined,
  "http://localhost:5173"
].filter(Boolean));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(null, false);
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok", name: "EduManage Pro API" }));
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", resourceRouter);
app.use(errorMiddleware);
