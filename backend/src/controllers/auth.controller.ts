import type { RequestHandler } from "express";
import { authService } from "../services/auth.service.js";
import { send } from "../utils/http.js";

export const register: RequestHandler = async (req, res, next) => {
  try {
    send(res, await authService.register(req.body), 201);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    send(res, await authService.login(req.body));
  } catch (error) {
    next(error);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    send(res, await authService.forgotPassword(req.body.email));
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = (req, res) => {
  send(res, req.user);
};
