// to-api/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  role: "PARENT" | "CLINIC_ADMIN" | "THERAPIST";
  clinicId?: string | null;
  patientId?: string | null;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  const [, token] = header.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "12345678") as any;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
      clinicId: decoded.clinicId,
      patientId: decoded.patientId,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
