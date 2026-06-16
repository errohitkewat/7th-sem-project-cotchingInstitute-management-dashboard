import bcrypt from "bcrypt";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/http.js";
import { signToken } from "../utils/jwt.js";

export const authService = {
  async register(input: { name: string; email: string; password: string; role: any; phone?: string }) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) throw new AppError(409, "Email is already registered");

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role,
        phone: input.phone
      },
      select: { id: true, name: true, email: true, role: true, phone: true }
    });
    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return { user, token };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new AppError(401, "Invalid email or password");

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid email or password");

    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone }
    };
  },

  async forgotPassword(email: string) {
    await prisma.activityLog.create({
      data: { action: "PASSWORD_RESET_REQUESTED", entity: "User", metadata: { email } }
    });
    return {
      message: "If the email exists, reset instructions will be available through the institute admin."
    };
  }
};
